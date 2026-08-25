"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export type Organization = {
  accent: "yellow" | "blue" | "red" | "teal";
  href: string;
  media?: "dark" | "dark-navy" | "deeper";
  logo: string;
  logoAlt: string;
  logoSize?: "tall" | "big" | "big-tall" | "xl";
  photo: string;
  photoAlt: string;
  photoPosition?: string;
  photoContain?: boolean;
  /** Roterer bildet med en avtagende spinn når kortet scrolles inn i view. */
  spin?: boolean;
  category: string;
  name: string;
  description: string;
};

type Suggestion = { navn: string; grunn?: string };
type GoatCounterWindow = Window & {
  goatcounter?: {
    count?: (event: { path: string; title: string; event: boolean }) => void;
  };
};

function trackGoatCounter(path: string, title: string) {
  (window as GoatCounterWindow).goatcounter?.count?.({
    path,
    title,
    event: true,
  });
}

const cachedSuggestions: Record<string, Suggestion[]> = {
  "romfart og raketter": [
    {
      navn: "Orbit NTNU",
      grunn:
        "Bygger CubeSat-satellitter – første student-satellitt i bane fra NTNU.",
    },
    {
      navn: "Propulse NTNU",
      grunn: "Designer, bygger og skyter opp væskedrevne forskningsraketter.",
    },
    {
      navn: "Ascend NTNU",
      grunn:
        "Konkurrerer i internasjonale drone-konkurranser med autonome systemer.",
    },
  ],
  "bærekraft og energi": [
    {
      navn: "Gridville",
      grunn:
        "Studentprosjekter på fornybar energi, mikronett og smart strømforsyning.",
    },
    {
      navn: "Fuel Fighter",
      grunn: "Bygger ultra-energieffektive kjøretøy til Shell Eco-marathon.",
    },
    {
      navn: "Ingeniører uten grenser",
      grunn:
        "Teknisk bistand i utviklingsland – rent vann, skoler og energiprosjekter.",
    },
  ],
  "kunstig intelligens": [
    {
      navn: "Cogito",
      grunn:
        "Utvikler AI-løsninger og bygger erfaring gjennom semesterprosjekter.",
    },
    {
      navn: "Relu",
      grunn: "Utvikler AI-løsninger i samarbeid med næringslivet.",
    },
    {
      navn: "BRAIN NTNU",
      grunn:
        "Arrangerer hackathons, foredrag og møteplasser innen kunstig intelligens.",
    },
  ],
  "design og arkitektur": [
    {
      navn: "Designhjelpen",
      grunn:
        "Designstudenter hjelper andre orgs og oppstarter med visuell identitet, web og UX.",
    },
    {
      navn: "Studio Beta",
      grunn:
        "Studentdrevet arkitektur- og designstudio. Byggeprosjekter i full skala og prototyper.",
    },
    {
      navn: "Make NTNU",
      grunn:
        "Gir studenter tilgang til verktøy, utstyr og kompetanse for å bygge egne prosjekter.",
    },
  ],
  entreprenørskap: [
    {
      navn: "Start NTNU",
      grunn:
        "Norges største studentorganisasjon for entreprenørskap – Startup Weekend og pitch-kvelder.",
    },
    {
      navn: "Entreprenørskolen",
      grunn:
        "NTNUs master i entreprenørskap der du bygger et reelt selskap som eksamen.",
    },
    {
      navn: "DRIV NTNU",
      grunn:
        "Studentorganisasjon for de som vil starte og drive egne prosjekter og selskaper.",
    },
  ],
};

const stopWords = new Set(
  "jeg meg min mitt vi oss vår vårt du deg din ditt han hun den det de dem som og eller men for med uten til fra over under mot etter før har hadde være er var blir ble vil ville kan kunne skal skulle må liker like glad interessert interesse interesser noe noen ting litt veldig mye masse også samt der her hvor når hva hvem slik sånn jobbe holde drive lære lage bli inn ut opp ned gjerne hjelpe hjelper andre gjøre rundt mer mest".split(
    " ",
  ),
);
const synonyms: Record<string, string[]> = {
  rom: ["rom"],
  romfart: ["rom"],
  rakett: ["rakett", "rom"],
  raketter: ["rakett", "rom"],
  satellitt: ["satellitt", "rom"],
  satellitter: ["satellitt", "rom"],
  drone: ["drone", "luft"],
  droner: ["drone", "luft"],
  fly: ["luft"],
  ai: ["ai"],
  kunstig: ["ai"],
  intelligens: ["ai"],
  maskinlæring: ["ai"],
  bygge: ["makerspace"],
  verksted: ["makerspace"],
  hendene: ["makerspace"],
  elektronikk: ["makerspace", "ai"],
  lodde: ["makerspace"],
  energi: ["energi"],
  bærekraft: ["energi"],
  miljø: ["energi"],
  bil: ["bil", "motorsport"],
  biler: ["bil", "motorsport"],
  motorsport: ["motorsport"],
  hav: ["hav"],
  undervann: ["undervann", "hav"],
  båt: ["hav"],
  design: ["design"],
  arkitektur: ["arkitektur"],
  kreativ: ["design", "arkitektur"],
  helse: ["helse"],
  medisin: ["helse"],
  entreprenør: ["entreprenør", "master"],
  entreprenørskap: ["entreprenør", "master"],
  startup: ["entreprenør"],
  gründer: ["coworking", "entreprenør"],
  kvinne: ["kvinnenettverk"],
  kvinner: ["kvinnenettverk"],
  jente: ["kvinnenettverk"],
  humanitær: ["humanitær"],
  humanitært: ["humanitær"],
  frivillig: ["humanitær"],
  bistand: ["humanitær"],
  konsulent: ["konsulent"],
  organisasjon: ["konsulent", "organisasjon"],
  arrangement: ["arrangør"],
  arrangere: ["arrangør"],
  event: ["arrangør"],
};

const accentColors = {
  yellow: "var(--yellow)",
  blue: "var(--blue)",
  red: "var(--red)",
  teal: "var(--teal)",
};
const panelColors = {
  yellow: "color-mix(in srgb,var(--yellow) 17%,#fff)",
  blue: "color-mix(in srgb,var(--blue) 14%,#fff)",
  red: "color-mix(in srgb,var(--red) 14%,#fff)",
  teal: "color-mix(in srgb,var(--teal) 16%,#fff)",
};

function localMatch(text: string, organizations: Organization[]) {
  const terms = new Set(
    text
      .toLowerCase()
      .split(/[^a-zæøå]+/)
      .filter((word) => word.length > 2 && !stopWords.has(word))
      .flatMap((word) => synonyms[word] || [word]),
  );
  return organizations
    .map((organization) => {
      const haystack =
        `${organization.name} ${organization.category} ${organization.description}`.toLowerCase();
      return {
        organization,
        score: [...terms].filter((term) =>
          new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(
            haystack,
          ),
        ).length,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ organization }) => ({
      navn: organization.name,
      grunn: organization.description,
    }));
}

export function OrgCard({
  organization,
  logoMode,
}: {
  organization: Organization;
  logoMode: boolean;
}) {
  const dark =
    organization.media === "dark"
      ? "#16181D"
      : organization.media === "dark-navy"
        ? "#022641"
        : organization.media === "deeper"
          ? "#20232A"
          : panelColors[organization.accent];
  const photoRef = useRef<HTMLImageElement | null>(null);
  const [spun, setSpun] = useState(false);
  useEffect(() => {
    if (!organization.spin) return;
    const el = photoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSpun(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [organization.spin]);
  const logoSize =
    organization.logoSize === "tall"
      ? "max-h-[106px] max-w-[54%]"
      : organization.logoSize === "big"
        ? "max-h-[90px] max-w-[76%]"
        : organization.logoSize === "big-tall"
          ? "max-h-[120px] max-w-[60%]"
          : organization.logoSize === "xl"
            ? "max-h-[134px] max-w-[72%]"
            : "max-h-[74px] max-w-[74%]";
  return (
    <a
      href={organization.href}
      target="_blank"
      rel="noopener"
      data-accent={organization.accent}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] no-underline [transition:transform_.25s_ease,border-color_.25s_ease,box-shadow_.25s_ease] hover:border-[var(--ink)] hover:shadow-[0_24px_46px_-26px_rgba(0,0,0,.28)] hover:[transform:translateY(-5px)]"
    >
      <div
        className="relative grid h-[140px] place-items-center overflow-hidden border-b border-[var(--line)]"
        style={{ background: dark }}
      >
        {/* Plain img is retained deliberately during visual-parity migration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={organization.logo}
          alt={organization.logoAlt}
          className={`relative z-[2] h-auto w-auto object-contain [transition:opacity_.35s_ease,transform_.45s_ease] ${logoSize} ${logoMode ? "opacity-100 [transform:scale(1)] group-hover:opacity-0 group-hover:[transform:scale(.96)]" : "opacity-0 [transform:scale(.88)] group-hover:opacity-100 group-hover:[transform:scale(1)]"}`}
        />
        <span
          className={`pointer-events-none absolute inset-0 z-[1] [transition:opacity_.35s_ease] ${logoMode ? "opacity-[.97] group-hover:opacity-0" : "opacity-0 group-hover:opacity-[.97]"}`}
          style={{ background: dark }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {organization.spin ? (
          // Transparent turbofan plassert med navet i bunn-senter, slik at kun
          // øvre halvdel vises. Spinner rundt navet når kortet scrolles inn.
          <img
            ref={photoRef}
            src={organization.photo}
            alt={organization.photoAlt}
            className={`pointer-events-none absolute top-0 left-1/2 z-0 w-[min(300px,112%)] [transform-origin:50%_50%] [transition:opacity_.4s_ease] ${logoMode ? "opacity-0 group-hover:opacity-100" : "opacity-100"} ${spun ? "[animation:jet-spin_1.6s_cubic-bezier(.16,.84,.28,1)_both]" : "[transform:translate(-50%,0)]"}`}
          />
        ) : (
          <img
            src={organization.photo}
            alt={organization.photoAlt}
            className={`absolute inset-0 z-0 h-full w-full [transition:transform_.7s_ease,opacity_.4s_ease] ${organization.photoContain ? "object-contain" : "object-cover"} ${logoMode ? "opacity-0 [transform:scale(1.001)] group-hover:opacity-100 group-hover:[transform:scale(1.05)]" : "opacity-100 [transform:scale(1.001)] group-hover:[transform:scale(1.05)]"}`}
            style={{ objectPosition: organization.photoPosition }}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[7px] px-5 pt-[18px] pb-[22px]">
        <div className="flex items-center gap-[7px] font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">
          <span
            className="h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: accentColors[organization.accent] }}
          />
          {organization.category}
        </div>
        <h3 className="mt-px mb-0 text-[19px] leading-[1.12] font-bold tracking-[-.015em] [overflow-wrap:break-word]">
          {organization.name}
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.5] text-[var(--ink-soft)]">
          {organization.description}
        </p>
      </div>
    </a>
  );
}

function CompassEmblem() {
  return (
    <div className="relative z-[1] h-[86px] w-[86px] flex-none drop-shadow-[0_10px_14px_rgba(16,36,58,.3)] motion-safe:animate-[fk-float_6s_ease-in-out_infinite]">
      <svg
        className="block h-full w-full"
        viewBox="0 0 100 100"
        role="img"
        aria-label="Framkompasset – kompassrose med nål"
      >
        <defs>
          <radialGradient id="fkBadgeReact" cx="50%" cy="34%" r="74%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e8eef3" />
          </radialGradient>
          <linearGradient id="fkOriReact" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3FC4A3" />
            <stop offset="55%" stopColor="#2E86C1" />
            <stop offset="100%" stopColor="#1E5C86" />
          </linearGradient>
        </defs>
        <g className="motion-safe:animate-[fk-spin_26s_linear_infinite] [transform-box:view-box] [transform-origin:50px_50px]">
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#0c2236"
            strokeOpacity=".22"
            strokeWidth="3"
          />
          <g fill="#0c2236">
            <circle cx="50" cy="3" r="2.2" />
            <circle cx="97" cy="50" r="2.2" />
            <circle cx="50" cy="97" r="2.2" />
            <circle cx="3" cy="50" r="2.2" />
          </g>
        </g>
        <g
          stroke="#0c2236"
          strokeOpacity=".22"
          strokeWidth=".4"
          strokeLinejoin="round"
        >
          {[45, 135, 225, 315].map((rotation) => (
            <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
              <path d="M50,18 L47,44.5 L50,50 Z" fill="#D6DEE5" />
              <path d="M50,18 L53,44.5 L50,50 Z" fill="#AEB9C4" />
            </g>
          ))}
          {(
            [
              [0, "#F18F8D", "#E85A5A"],
              [90, "#69ACDA", "#2E86C1"],
              [180, "#7CD8C0", "#3FC4A3"],
              [270, "#FCD667", "#EBAE20"],
            ] as Array<[number, string, string]>
          ).map(([rotation, a, b]) => (
            <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
              <path d="M50,9 L45.5,44 L50,50 Z" fill={a} />
              <path d="M50,9 L54.5,44 L50,50 Z" fill={b} />
            </g>
          ))}
        </g>
        <circle cx="50" cy="50" r="16.5" fill="url(#fkBadgeReact)" />
        <g className="motion-safe:animate-[fk-rock_6s_ease-in-out_infinite] [transform-box:view-box] [transform-origin:50px_50px]">
          <g
            fill="url(#fkOriReact)"
            transform="translate(48 50.5) scale(0.028) translate(-500 -500)"
          >
            <polygon points="712.1,924.1 500.3,712.2 500.3,288.6 712.1,500.5" />
            <polygon points="76.5,288.6 288.4,500.5 712.1,500.5 500.2,288.6" />
            <polygon points="924,712.3 712.1,500.4 712.1,76.8 924,288.7" />
            <polygon points="288.4,76.8 500.3,288.7 924,288.7 712.1,76.8" />
            <polygon points="712.1,500.5 500.3,537.1 500.3,500.6" />
            <polygon points="924,288.6 712.1,325.2 712.1,288.7" />
          </g>
        </g>
        <circle
          cx="50"
          cy="50"
          r="16.5"
          fill="none"
          stroke="#0c2236"
          strokeOpacity=".22"
          strokeWidth="1.3"
        />
      </svg>
    </div>
  );
}

function FramCompass({
  organizations,
  onClose,
}: {
  organizations: Organization[];
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Suggestion[] | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") return onClose();
    if (event.key !== "Tab") return;
    const focusable = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        "button,[href],textarea,input,select",
      ),
    ];
    if (event.shiftKey && document.activeElement === focusable[0]) {
      event.preventDefault();
      focusable.at(-1)?.focus();
    } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
      event.preventDefault();
      focusable[0]?.focus();
    }
  }
  async function submit(text: string) {
    const clean = text.trim();
    if (!clean || loading) return inputRef.current?.focus();
    trackGoatCounter("framkompasset-run", "Framkompasset – kjørt søk");
    if (cachedSuggestions[clean]) return setResults(cachedSuggestions[clean]);
    const key = `fram_forslag_v2:${clean.toLowerCase().replace(/\s+/g, " ")}`;
    try {
      const cached = JSON.parse(localStorage.getItem(key) || "null");
      if (cached && Date.now() - cached.t <= 14 * 86400000)
        return setResults(cached.f);
    } catch {}
    setLoading(true);
    try {
      const response = await fetch("/api/forslag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interesser: clean }),
      });
      if (!response.ok) throw new Error("api");
      const data = await response.json();
      const suggestions = data.forslag || [];
      try {
        localStorage.setItem(
          key,
          JSON.stringify({ t: Date.now(), f: suggestions }),
        );
      } catch {}
      setResults(suggestions);
    } catch {
      setResults(localMatch(clean, organizations));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/55 px-5 pt-[6vh] pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fm-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      onKeyDown={trapFocus}
    >
      <div className="relative w-full max-w-[720px] animate-[fm-pop_.24s_ease] rounded-[28px] bg-[var(--card)] px-10 pt-[34px] pb-[30px] shadow-[0_20px_60px_rgba(0,0,0,.25)] max-[640px]:px-[22px] max-[640px]:pt-7 max-[640px]:pb-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer border-0 bg-transparent p-1 text-[1.7rem] leading-none text-[var(--ink-soft)] hover:text-[var(--ink)]"
          aria-label="Lukk"
        >
          ×
        </button>
        <div className="relative mb-5 flex items-center gap-5 overflow-hidden rounded-[18px] border border-[var(--line)] bg-[radial-gradient(110%_130%_at_8%_0%,color-mix(in_srgb,var(--blue)_9%,#fff)_0%,transparent_60%),linear-gradient(135deg,#fbfdfe_0%,#f2f7fb_100%)] px-[26px] py-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_16px_32px_-24px_rgba(16,36,58,.5)] max-[560px]:flex-col max-[560px]:gap-3 max-[560px]:p-[18px] max-[560px]:text-center">
          <CompassEmblem />
          <div className="relative z-[1] flex min-w-0 flex-col">
            <span className="mb-1.5 text-[11px] tracking-[.16em] text-[var(--ink-soft)]">
              FINN DITT MILJØ
            </span>
            <h2
              id="fm-title"
              className="m-0 bg-[linear-gradient(95deg,#2E86C1_0%,#3FC4A3_100%)] bg-clip-text text-[34px] leading-none font-extrabold tracking-[-.01em] text-transparent max-[560px]:text-[28px]"
            >
              Framkompasset
            </h2>
          </div>
        </div>
        <p className="mt-0 mb-[22px] max-w-[58ch] text-[15px] leading-[1.5] text-[var(--ink-soft)]">
          Skriv hva du interesserer deg for, så peiler{" "}
          <strong>Framkompasset</strong> deg mot miljøene som passer best.
        </p>
        <form
          className="flex items-stretch gap-3 max-[640px]:flex-col"
          autoComplete="off"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            void submit(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            maxLength={300}
            placeholder="F.eks. «Jeg liker å bygge ting med hendene og er fascinert av romfart og elektronikk»"
            className="flex-1 resize-none rounded-[18px] border-[1.5px] border-[var(--line)] bg-[var(--bg)] px-4 py-3.5 font-sans text-base leading-[1.45] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--blue)_18%,transparent)]"
          />
          <button
            disabled={loading}
            type="submit"
            className="inline-flex min-h-[54px] flex-none cursor-pointer items-center justify-center gap-2.5 rounded-[18px] border-0 bg-[var(--ink)] px-[26px] text-[15px] font-semibold text-white [transition:transform_.12s,background_.2s,opacity_.2s] hover:bg-black hover:[transform:translateY(-1px)] disabled:cursor-default disabled:opacity-60 disabled:transform-none"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
            )}
            {loading ? "Tenker…" : "Foreslå miljøer"}
          </button>
        </form>
        <div
          className="mt-3.5 flex flex-wrap gap-2"
          aria-label="Eksempler på interesser"
        >
          {Object.keys(cachedSuggestions).map((chip) => (
            <button
              type="button"
              key={chip}
              onClick={() => {
                setInput(chip);
                void submit(chip);
              }}
              className="cursor-pointer rounded-full border border-[var(--line)] bg-transparent px-[13px] py-[7px] font-sans text-[13px] text-[var(--ink-soft)] [transition:border-color_.18s,color_.18s] hover:border-[var(--ink)] hover:text-[var(--ink)]"
            >
              {chip}
            </button>
          ))}
        </div>
        {results && (
          <div className="mt-[26px] grid gap-3.5" aria-live="polite">
            {results.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">
                Fant ingen tydelige treff – prøv å beskrive interessene dine med
                litt andre ord.
              </p>
            ) : (
              <>
                <div className="text-xs font-semibold tracking-[.06em] text-[var(--muted)] uppercase">
                  Forslag til deg
                </div>
                {results.map((result) => {
                  const org =
                    organizations.find(
                      ({ name }) =>
                        name.toLowerCase() === result.navn.toLowerCase(),
                    ) ||
                    organizations.find(
                      ({ name }) =>
                        name
                          .toLowerCase()
                          .includes(result.navn.toLowerCase()) ||
                        result.navn.toLowerCase().includes(name.toLowerCase()),
                    );
                  return org ? (
                    <a
                      key={org.name}
                      href={org.href}
                      target="_blank"
                      rel="noopener"
                      className="block rounded-[18px] border border-l-4 border-[var(--line)] bg-[var(--bg)] px-5 py-[18px] text-inherit no-underline [transition:transform_.15s,box-shadow_.2s] hover:shadow-[0_10px_30px_rgba(0,0,0,.07)] hover:[transform:translateY(-2px)]"
                      style={{ borderLeftColor: accentColors[org.accent] }}
                    >
                      <div className="mb-[5px] font-mono text-[11px] tracking-[.04em] text-[var(--muted)]">
                        {org.category}
                      </div>
                      <h3 className="mt-0 mb-1.5 text-lg font-bold">
                        {org.name}
                      </h3>
                      <p className="mt-0 mb-2.5 text-sm leading-[1.5] text-[var(--ink-soft)]">
                        {result.grunn || org.description}
                      </p>
                      <span className="text-[13px] font-semibold text-[var(--blue)]">
                        Besøk nettsiden →
                      </span>
                    </a>
                  ) : null;
                })}
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Forslagene er veiledende. Bla gjennom alle miljøene under for
                  å se hele bildet.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function MiljoerExplorer({
  organizations,
}: {
  organizations: Organization[];
}) {
  const [logoMode, setLogoMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setLogoMode(localStorage.getItem("framOrgMode") === "logo"),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);
  function setMode(logos: boolean) {
    setLogoMode(logos);
    localStorage.setItem("framOrgMode", logos ? "logo" : "photo");
  }
  return (
    <section
      id="paraply"
      className="border-b border-[var(--line)] pt-12 pb-[110px]"
    >
      <div className="mx-auto max-w-[1360px] px-12 max-[900px]:px-5 max-[520px]:px-4">
        <div className="mb-7 flex flex-wrap items-center gap-x-3.5 gap-y-3">
          <span className="font-mono text-[11px] tracking-[.12em] text-[var(--muted)] uppercase">
            Vis først
          </span>
          <div
            className="inline-flex gap-1 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] p-1"
            role="group"
            aria-label="Vis først"
          >
            <button
              type="button"
              onClick={() => setMode(false)}
              className={`cursor-pointer rounded-full border-0 px-[18px] py-2 font-sans text-[13px] font-semibold [transition:background_.2s_ease,color_.2s_ease] hover:text-[var(--ink)] ${logoMode ? "bg-transparent text-[var(--ink-soft)]" : "bg-[var(--ink)] text-[var(--bg)] hover:text-[var(--bg)]"}`}
            >
              Bilder
            </button>
            <button
              type="button"
              onClick={() => setMode(true)}
              className={`cursor-pointer rounded-full border-0 px-[18px] py-2 font-sans text-[13px] font-semibold [transition:background_.2s_ease,color_.2s_ease] hover:text-[var(--ink)] ${logoMode ? "bg-[var(--ink)] text-[var(--bg)] hover:text-[var(--bg)]" : "bg-transparent text-[var(--ink-soft)]"}`}
            >
              Logoer
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
              trackGoatCounter("framkompasset-open", "Framkompasset – åpnet");
            }}
            className="ml-auto inline-flex cursor-pointer items-center gap-[7px] rounded-full border-0 bg-[var(--blue)] px-[18px] py-2.5 font-sans text-sm leading-[normal] font-semibold text-white shadow-[0_4px_14px_color-mix(in_srgb,var(--blue)_32%,transparent)] [transition:background_.2s_ease,box-shadow_.2s_ease,transform_.12s_ease] hover:bg-[color-mix(in_srgb,var(--blue)_90%,#000)] hover:shadow-[0_7px_20px_color-mix(in_srgb,var(--blue)_42%,transparent)] hover:[transform:translateY(-1px)] active:[transform:translateY(0)] max-[520px]:ml-0 max-[520px]:w-full max-[520px]:justify-center"
          >
            <span className="inline-block text-sm leading-none motion-safe:animate-[fm-twinkle_3.4s_ease-in-out_infinite]">
              ✨
            </span>
            Finn din match
          </button>
        </div>
        <div className="grid grid-cols-4 gap-[18px] max-[1180px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:gap-2.5">
          {organizations.map((organization) => (
            <OrgCard
              key={organization.name}
              organization={organization}
              logoMode={logoMode}
            />
          ))}
        </div>
        {modalOpen && (
          <FramCompass
            organizations={organizations}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
