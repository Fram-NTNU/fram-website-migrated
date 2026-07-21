"use client";

import { useEffect } from "react";
import type { LegacyScript } from "@/lib/legacy-page";

export function LegacyScriptRunner({ scripts, bodyClass }: { scripts: LegacyScript[]; bodyClass: string }) {
  useEffect(() => {
    const addedBodyClasses = bodyClass.split(/\s+/).filter(Boolean);
    document.body.classList.add(...addedBodyClasses);
    const mountedScripts: HTMLScriptElement[] = [];
    let cancelled = false;

    async function mountScripts() {
      // Let React finish hydrating all raw server markup before legacy scripts
      // are allowed to mutate the navigation or page content.
      await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
      for (const descriptor of scripts) {
        if (cancelled) break;
        const script = document.createElement("script");
        if (descriptor.type) script.type = descriptor.type;
        script.async = descriptor.async;
        script.defer = descriptor.defer;
        if (descriptor.src) script.src = descriptor.src;
        else script.textContent = descriptor.content;
        mountedScripts.push(script);

        if (descriptor.src && !descriptor.async) {
          await new Promise<void>((resolve) => {
            script.addEventListener("load", () => resolve(), { once: true });
            script.addEventListener("error", () => resolve(), { once: true });
            document.body.appendChild(script);
          });
        } else {
          document.body.appendChild(script);
        }
      }
    }

    void mountScripts();
    return () => {
      cancelled = true;
      mountedScripts.forEach((script) => script.remove());
      document.body.classList.remove(...addedBodyClasses);
    };
  }, [bodyClass, scripts]);

  return null;
}
