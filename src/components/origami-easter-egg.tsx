"use client";

import { useEffect } from "react";

/* Easter egg: skriv «fram» hvor som helst på siden, så folder et papirfly seg ut
   og flyr «fram» over skjermen og tegner et lett flyspor. Harmløst, rydder opp etter
   seg, blokkerer ingen klikk (pointer-events:none) og respekterer reduced-motion.
   Portet fra den gamle statiske siden (assets/site.js); triggerord endret til «fram». */
export function OrigamiEasterEgg() {
  useEffect(() => {
    const WORD = "fram";
    let buf = "";
    let flying = false;

    const NS = "http://www.w3.org/2000/svg";
    const COLORS = ["#47B99F", "#1385B3", "#E36672", "#FFD130"]; // origami-logoens flater

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type Pt = { x: number; y: number };
    const cubic = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
      const u = 1 - t,
        a = u * u * u,
        b = 3 * u * u * t,
        c = 3 * u * t * t,
        d = t * t * t;
      return {
        x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
        y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
      };
    };

    // FRAM-logoens origami-emblem, sentrert om (0,0) så rotasjon/skala pivoterer i midten.
    const origamiSVG = () => {
      const g = document.createElementNS(NS, "g");
      g.innerHTML =
        '<g transform="translate(-500,-500)">' +
        '<polygon fill="#47B99F" points="712.1,924.1 500.3,712.2 500.3,288.6 712.1,500.5"/>' +
        '<polygon fill="#1385B3" points="76.5,288.6 288.4,500.5 712.1,500.5 500.2,288.6"/>' +
        '<polygon fill="#E36672" points="924,712.3 712.1,500.4 712.1,76.8 924,288.7"/>' +
        '<polygon fill="#FFD130" points="288.4,76.8 500.3,288.7 924,288.7 712.1,76.8"/>' +
        '<polygon fill="#3A7A67" points="712.1,500.5 500.3,537.1 500.3,500.6"/>' +
        '<polygon fill="#A8505F" points="924,288.6 712.1,325.2 712.1,288.7"/>' +
        "</g>";
      g.style.filter = "drop-shadow(0 40px 40px rgba(0,0,0,0.22))";
      return g;
    };

    const launch = () => {
      if (flying) return;
      flying = true;

      const W = window.innerWidth,
        H = window.innerHeight;
      const reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.style.cssText =
        "position:fixed;inset:0;width:100vw;height:100vh;" +
        "pointer-events:none;z-index:99999;overflow:visible";
      document.body.appendChild(svg);

      if (!svg.animate) {
        window.setTimeout(() => {
          svg.remove();
          flying = false;
        }, 100);
        return;
      }

      let pending = 0;
      const track = (anim: Animation) => {
        pending++;
        anim.onfinish = () => {
          if (--pending <= 0) {
            svg.remove();
            flying = false;
          }
        };
      };

      const origin = { x: W * 0.5, y: H + 60 }; // start: midt nederst, så tar flokken av
      const FLEET = reduce ? 2 : 11;

      // ---- Flåte: origami-logoer som vifter ut oppover og tumler i lufta ----
      for (let idx = 0; idx < FLEET; idx++) {
        const scale = rand(0.045, 0.095); // logoen er ~850 enheter → ~38–80 px
        const ex = W * ((idx + 0.5) / FLEET) + rand(-70, 70); // spres jevnt mot toppen
        const p0 = { x: origin.x + rand(-40, 40), y: origin.y };
        const p1 = {
          x: origin.x + (ex - origin.x) * 0.25 + rand(-140, 140),
          y: H * rand(0.5, 0.75),
        };
        const p2 = {
          x: origin.x + (ex - origin.x) * 0.75 + rand(-140, 140),
          y: H * rand(0.12, 0.4),
        };
        const p3 = { x: ex, y: rand(-200, -120) };

        const a0 = rand(0, 360),
          spin = rand(-720, 720); // tumler ulikt mye
        const N = 48;
        const frames: Keyframe[] = [];
        for (let s = 0; s <= N; s++) {
          const tt = s / N;
          const c = cubic(p0, p1, p2, p3, tt);
          frames.push({
            transform:
              "translate(" +
              c.x +
              "px," +
              c.y +
              "px) rotate(" +
              (a0 + spin * tt) +
              "deg) scale(" +
              scale +
              ")",
          });
        }

        const logo = origamiSVG();
        logo.style.opacity = "0";
        svg.appendChild(logo);

        const dur = reduce ? 1200 : rand(2200, 3400);
        const delay = reduce ? 0 : idx * rand(70, 130); // staggered takeoff = flokk-følelse
        logo.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 180,
          delay,
          fill: "both",
        });
        track(
          logo.animate(frames, {
            duration: dur,
            delay,
            easing: "ease-in-out",
            fill: "both",
          }),
        );
      }

      // ---- Konfetti: papirbiter som spruter opp fra takeoff og daler ned ----
      const PIECES = reduce ? 0 : 30;
      for (let j = 0; j < PIECES; j++) {
        const piece = document.createElementNS(NS, "g");
        const w = rand(5, 9),
          h = rand(7, 13);
        piece.innerHTML =
          '<rect x="' +
          -w / 2 +
          '" y="' +
          -h / 2 +
          '" width="' +
          w +
          '" height="' +
          h +
          '" rx="1" fill="' +
          COLORS[j % COLORS.length] +
          '"/>';
        svg.appendChild(piece);

        const a = (rand(-145, -35) * Math.PI) / 180,
          spd = rand(9, 17);
        const vx = Math.cos(a) * spd,
          vy = Math.sin(a) * spd,
          grav = 0.85,
          spin = rand(-540, 540);
        const kf: Keyframe[] = [];
        for (let s2 = 0; s2 <= 8; s2++) {
          const f = s2 / 8,
            tau = f * 30;
          const x = origin.x + vx * tau,
            y = origin.y + vy * tau + 0.5 * grav * tau * tau;
          kf.push({
            transform:
              "translate(" +
              x +
              "px," +
              y +
              "px) rotate(" +
              spin * f +
              "deg)",
            opacity: f < 0.6 ? 1 : Math.max(0, 1 - (f - 0.6) / 0.4),
          });
        }
        track(
          piece.animate(kf, {
            duration: rand(1300, 2000),
            easing: "cubic-bezier(.2,.6,.4,1)",
            fill: "forwards",
          }),
        );
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      const k = e.key || "";
      if (k.length !== 1) return; // ignorer Shift, piltaster o.l.
      buf = (buf + k.toLowerCase()).slice(-WORD.length);
      if (buf === WORD) {
        buf = "";
        launch();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
