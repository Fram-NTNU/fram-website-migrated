/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function HomeEventBar() {
  const [state, setState] = useState<{ show: boolean; label: string } | null>(
    null,
  );
  useEffect(() => {
    const start = new Date(2026, 7, 19);
    const end = new Date(2026, 7, 20, 23, 59, 59);
    const now = new Date();
    if (now > end) {
      setState({ show: false, label: "" });
      return;
    }
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((start.getTime() - today.getTime()) / 86400000);
    const label =
      now >= start
        ? "Pågår nå"
        : days <= 0
          ? "I dag!"
          : days === 1
            ? "I morgen"
            : `Om ${days} dager`;
    setState({ show: true, label });
  }, []);

  if (!state?.show) return null;

  return (
    <Link
      href="/innovasjonsdagene"
      className="group relative z-[60] flex items-center justify-center gap-2.5 bg-[var(--yellow)] px-4 py-2.5 text-center font-sans text-[13px] font-semibold text-[var(--charcoal)] no-underline [transition:background_.2s] hover:bg-[color-mix(in_oklab,var(--yellow)_88%,#000)] max-[520px]:text-[12px]"
    >
      <span aria-hidden="true" className="relative flex h-2 w-2 flex-none">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--charcoal)] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--charcoal)]" />
      </span>
      <span className="font-bold tracking-[.06em] uppercase">{state.label}</span>
      <span>
        Innovasjonsdagene&nbsp;&apos;26
        <span className="font-medium opacity-70 max-[520px]:hidden">
          {" "}
          · 19.–20. august · 10–14:30 · Gruva
        </span>
      </span>
      <span
        aria-hidden="true"
        className="[transition:transform_.2s] group-hover:[transform:translateX(3px)]"
      >
        →
      </span>
    </Link>
  );
}

export function HomeLaunchBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Vises i én uke etter lansering, deretter skjules baren automatisk.
    const end = new Date(2026, 7, 30, 23, 59, 59);
    setShow(new Date() <= end);
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/teknologihallen"
      className="group relative z-[60] flex items-center justify-center gap-2.5 bg-[#0D151B] px-4 py-2.5 text-center font-sans text-[13px] font-semibold text-[#ECF1F5] no-underline [transition:background_.2s] hover:bg-[#12202a] max-[520px]:text-[12px]"
    >
      <span aria-hidden="true" className="relative flex h-2 w-2 flex-none">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5CC8DE] opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5CC8DE]" />
      </span>
      <span className="font-bold tracking-[.06em] text-[#5CC8DE] uppercase">
        Nyhet
      </span>
      <span>
        Les mer om Teknologihallen
        <span className="font-medium opacity-70 max-[520px]:hidden">
          {" "}
          · hjemmet til NTNUs tekniske studentorganisasjoner
        </span>
      </span>
      <span
        aria-hidden="true"
        className="[transition:transform_.2s] group-hover:[transform:translateX(3px)]"
      >
        →
      </span>
    </Link>
  );
}

export function YouTubeFacade() {
  const [playing, setPlaying] = useState(false);
  if (playing)
    return (
      <iframe
        className="absolute -inset-px block h-[calc(100%+2px)] w-[calc(100%+2px)] border-0"
        src="https://www.youtube-nocookie.com/embed/GqTyq88uULs?autoplay=1&rel=0"
        title="Fram NTNU — Åpent for alle"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Spill av video: Fram NTNU — Åpent for alle"
      className="group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-black bg-[url('https://i.ytimg.com/vi/GqTyq88uULs/maxresdefault.jpg')] bg-cover bg-center p-0 after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.25))] after:[transition:background_.2s] hover:after:bg-black/15"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-[1] h-12 w-[68px] rounded-[14px] bg-black/72 [transform:translate(-50%,-50%)] [transition:background_.2s] before:absolute before:top-1/2 before:left-1/2 before:border-y-[11px] before:border-l-[19px] before:border-y-transparent before:border-l-white before:[transform:translate(-40%,-50%)] before:content-[''] group-hover:bg-[#f00]"
      />
    </button>
  );
}

type Room = {
  id: number;
  name: string;
  accent: "blue" | "teal" | "red" | "yellow";
  image?: string;
  pill?: string;
  description: React.ReactNode;
  primary: string;
  primaryHref?: string;
  note?: string;
  ribbon?: string;
};
const rooms: Room[] = [
  {
    id: 1,
    name: "Fellesrommet",
    accent: "teal",
    image: "/assets/fram-fellesrom.webp",
    ribbon: "Gratis kaffe",
    description: (
      <>
        Fellesrommet på FRAM er åpent for alle studenter, enten du vil jobbe med
        studier, ta en pause mellom forelesninger eller spise lunsj.
      </>
    ),
    primary: "Utforsk Fellesrommet →",
    primaryHref: "/booking#fellesrommet",
  },
  {
    id: 0,
    name: "Gruva",
    accent: "blue",
    image: "/assets/gruva.webp",
    description: (
      <>
        <span className="max-[600px]:hidden">
          Hjertet av FRAM og den største møteplassen for innovasjonsmiljøet ved
          NTNU.{" "}
        </span>
        Her arrangeres alt fra workshops og foredrag til pitchekvelder,
        konkurranser og sosiale samlinger.
      </>
    ),
    primary: "Utforsk Gruva →",
    primaryHref: "https://www.gruvantnu.no/",
  },
  {
    id: 4,
    name: "Scenerommet",
    accent: "blue",
    image: "/assets/scenerommet.avif",
    description: (
      <>
        I scenerommet arrangeres det workshops, foredrag, pitchekvelder,
        releasefester, og mye mer, men til dagligdags er både fellesrommet og
        scenerommet et åpent arbeidslokale.
      </>
    ),
    primary: "Utforsk Scenerommet →",
    primaryHref: "/booking#scenerommet",
  },
  {
    id: 3,
    name: "Idégarasjen",
    accent: "yellow",
    image: "/assets/Idegarasjen1.webp",
    description: (
      <>
        Fullt utstyrt makerspace for å bygge prototyper og få ideer ut i
        virkeligheten.
      </>
    ),
    primary: "Utforsk Idégarasjen →",
    primaryHref: "/idegarasjen",
  },
  {
    id: 2,
    name: "Møterom",
    accent: "red",
    image: "/assets/collage.webp",
    description: <>Tre rom for møter, veiledning og fokusert gruppearbeid.</>,
    primary: "Utforsk Møterom →",
    primaryHref: "/booking#moterom",
  },
  {
    id: 6,
    name: "Podcastrommet",
    accent: "red",
    image: "/assets/Podcastrommet.webp",
    description: (
      <>
        Podcastrommet på FRAM gir studenter muligheten til å spille inn sine
        egne podkaster, intervjuer og annet lydinnhold.
      </>
    ),
    primary: "Utforsk Podcastrommet →",
    primaryHref: "/booking#podcastrommet",
  },
  {
    id: 5,
    name: "Mediarom",
    accent: "teal",
    pill: "Kommer snart",
    description: (
      <>
        Et eget rom for podcast-, video- og innholdsproduksjon — kommer i det
        nye Økonomi- og innovasjonsbygget i Hesthagen.
      </>
    ),
    primary: "Kommer snart",
    note: "Åpner med det nye bygget i Hesthagen, 2027/28.",
  },
];
const colors = {
  blue: "var(--blue)",
  teal: "var(--teal)",
  red: "var(--red)",
  yellow: "var(--yellow)",
};

export function RoomExplorer() {
  const [selected, setSelected] = useState(1);
  return (
    <div className="grid grid-cols-[330px_1fr] items-stretch gap-[18px] max-[900px]:grid-cols-1">
      <div className="flex flex-col gap-2 max-[900px]:static max-[900px]:flex-row max-[900px]:flex-wrap">
        {rooms.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`flex w-full cursor-pointer items-center gap-3.5 rounded-[14px] border px-[18px] py-4 text-left font-sans text-[var(--ink)] [transition:background_.25s,border-color_.25s,transform_.25s] hover:[transform:translateX(3px)] max-[900px]:min-w-[140px] max-[900px]:flex-[1_1_calc(50%-4px)] ${selected === item.id ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--line)] bg-[var(--card)]"}`}
            style={
              { "--room-color": colors[item.accent] } as React.CSSProperties
            }
            onMouseEnter={(event) => {
              if (selected !== item.id)
                event.currentTarget.style.borderColor = colors[item.accent];
            }}
            onMouseLeave={(event) => {
              if (selected !== item.id)
                event.currentTarget.style.borderColor = "var(--line)";
            }}
          >
            <span className="min-w-0 flex-1">
              <span
                className={`mt-0.5 block text-lg leading-[normal] font-bold tracking-[-.015em] ${selected === item.id ? "text-[var(--bg)]" : "text-[var(--ink)]"}`}
              >
                {item.name}
              </span>
            </span>
            {item.id !== 5 && (
              <span
                aria-hidden="true"
                className={`flex-none text-lg text-[var(--bg)] [transition:opacity_.25s,transform_.25s] max-[900px]:hidden ${selected === item.id ? "[transform:none] opacity-100" : "[transform:translateX(-4px)] opacity-0"}`}
              >
                →
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="relative min-w-0">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`${selected === room.id ? "flex animate-[home-expfade_.42s_cubic-bezier(.4,0,.2,1)] flex-col" : "hidden"} h-full`}
          >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] shadow-[0_30px_70px_-44px_rgba(0,0,0,.4)]">
              <div
                className={`relative min-h-[300px] flex-[1_1_auto] overflow-hidden bg-[var(--room-color)] max-[600px]:h-[280px]`}
                style={
                  { "--room-color": colors[room.accent] } as React.CSSProperties
                }
              >
                {room.image && (
                  <div
                    className={`absolute inset-0 bg-cover bg-center [transition:transform_6s_ease] ${selected === room.id ? "[transform:scale(1.06)]" : "[transform:none]"}`}
                    style={{ backgroundImage: `url('${room.image}')` }}
                  />
                )}
                {!room.image && (
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_1.5px_1.5px,rgba(255,255,255,.22)_1.5px,transparent_0)] bg-[length:26px_26px] opacity-50" />
                )}
                <span
                  className={`absolute inset-0 ${room.image ? "bg-[linear-gradient(180deg,rgba(10,14,22,.05)_0%,rgba(10,14,22,.30)_45%,rgba(10,14,22,.78)_100%)]" : "bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,.5)_100%)]"}`}
                />
                {room.pill && (
                  <div className="absolute top-[22px] right-6 left-6 z-[2] flex justify-end">
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/18 px-3.5 py-2 font-mono text-[11px] font-bold tracking-[.08em] text-white uppercase backdrop-blur-lg">
                      {room.pill}
                    </span>
                  </div>
                )}
                {room.ribbon && (
                  <div className="pointer-events-none absolute top-0 right-0 z-[3] h-[150px] w-[150px] overflow-hidden">
                    <span className="absolute top-[30px] right-[-46px] w-[220px] rotate-45 bg-[var(--teal)] py-2 text-center font-mono text-[12px] font-bold tracking-[.14em] text-[#08312a] uppercase shadow-[0_6px_16px_rgba(0,0,0,.25)]">
                      {room.ribbon}
                    </span>
                  </div>
                )}
                <div className="absolute right-[26px] bottom-6 left-[26px] z-[2] text-white">
                  <h3 className="m-0 text-[clamp(38px,4vw,56px)] leading-none font-bold tracking-[-.03em]">
                    {room.name}
                  </h3>
                  <p className="mt-3 mb-0 max-w-[520px] text-base leading-[1.5] text-white/92">
                    {room.description}
                  </p>
                </div>
              </div>
              <div className="px-[30px] pt-[26px] pb-[30px] max-[600px]:px-[18px] max-[600px]:pt-[22px] max-[600px]:pb-6">
                <div className="flex flex-wrap items-center gap-[18px]">
                  {room.primaryHref ? (
                    <a
                      href={room.primaryHref}
                      target={
                        room.primaryHref.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        room.primaryHref.startsWith("http")
                          ? "noopener"
                          : undefined
                      }
                      className="inline-flex cursor-pointer items-center gap-2.5 rounded-[14px] border-2 border-transparent bg-[var(--ink)] px-6 py-[15px] text-[15px] font-semibold text-[var(--bg)] no-underline [transition:transform_.2s,background_.2s,border-color_.2s,color_.2s] hover:[transform:translateY(-2px)]"
                    >
                      {room.primary}
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-[14px] border-2 border-transparent bg-[var(--ink)] px-6 py-[15px] text-[15px] font-semibold text-[var(--bg)] opacity-45">
                      {room.primary}
                    </span>
                  )}
                  {room.note && (
                    <span className="font-mono text-[11px] tracking-[.06em] text-[var(--muted)]">
                      {room.note}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const members = [
  ["ascend-ntnu.png", "https://www.ascendntnu.no", true],
  ["brain-ntnu.png", "https://www.brainntnu.no", false],
  ["designhjelpen.png", "https://www.designhjelpen.no", true],
  ["driv-ntnu.png", "https://www.instagram.com/drivntnu", false],
  ["fuel-fighter.png", "https://fuelfighter.no", false],
  [
    "ingeniorer-uten-grenser.png",
    "https://iug.no/om-oss/lokalavdelinger/iug-ntnu",
    false,
  ],
  ["make-ntnu.png", "https://makentnu.no", false],
  ["njord.png", "https://www.njordntnu.no", true],
  ["nordlys.png", "https://www.nordlysntnu.no", false],
  ["norstec.png", "https://www.norstec.no", false],
  ["propulse-ntnu.webp", "https://www.propulse.no", true],
  [
    "solanlinjeforeninglogo.webp",
    "https://www.instagram.com/solanlinjeforening",
    true,
  ],
  ["studio-beta.png", "https://www.instagram.com/studiobeta/", false],
] as const;

export function RotatingMemberLogo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let swap: number | undefined;
    const interval = window.setInterval(() => {
      setVisible(false);
      swap = window.setTimeout(() => {
        setIndex((value) => (value + 1) % members.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => {
      clearInterval(interval);
      if (swap) clearTimeout(swap);
    };
  }, []);
  const [file, href, big] = members[index];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex h-[60px] w-[148px] flex-[0_0_148px] items-center justify-center overflow-hidden border-r border-[var(--line)] pr-[18px] no-underline [transition:opacity_.2s_ease] hover:opacity-70 max-[760px]:w-[92px] max-[760px]:flex-[0_0_92px] max-[760px]:pr-3"
    >
      <img
        src={`/assets/logoer/${file}`}
        alt="Medlemsorganisasjon"
        width="469"
        height="590"
        className={`h-auto w-auto object-contain object-center [transition:opacity_.35s_ease] ${visible ? "opacity-100" : "opacity-0"} ${big ? "max-h-[54px] max-w-[126px]" : "max-h-10 max-w-[104px]"} max-[760px]:max-w-20`}
      />
    </a>
  );
}
