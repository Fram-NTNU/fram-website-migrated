"use client";

import { useEffect } from "react";

/**
 * Bygger mailto:-lenker ved runtime slik at e-postadressen aldri finnes som
 * plain-tekst i den serverrenderte HTML-en. Hindrer spam-høsting og fjerner
 * SEOptimer «email privacy»-flagget.
 *
 * Bruk: marker en <a> med `data-eml`. Er lenketeksten selve plassholderen
 * «framntnu (at) gmail (dot) com», byttes den ut med den ekte adressen.
 * `data-eml-subject` legger til et ?subject= i mailto-en.
 */
export function EmailDeobfuscator() {
  useEffect(() => {
    const addr =
      ["fram", "ntnu"].join("") +
      String.fromCharCode(64) +
      ["gmail", "com"].join(".");
    const placeholder = "framntnu (at) gmail (dot) com";
    const links = document.querySelectorAll<HTMLAnchorElement>("a[data-eml]");
    links.forEach((a) => {
      const subj = a.getAttribute("data-eml-subject");
      a.setAttribute("href", "mailto:" + addr + (subj ? "?subject=" + subj : ""));
      if (a.textContent && a.textContent.trim() === placeholder) {
        a.textContent = addr;
      }
      a.removeAttribute("data-eml");
      a.removeAttribute("data-eml-subject");
    });
  }, []);

  return null;
}
