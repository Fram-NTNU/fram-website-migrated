"use client";
// Flip-kort som avslører MazeMap-embed på baksiden.
import Link from "next/link";
import { useState } from "react";

type Feature = { icon: string; label: string };

function MapHint() {
  return (
    <div className="mt-auto flex items-center gap-2 border-t border-[var(--line)] pt-[15px] text-[13.5px] font-semibold text-[var(--ink-soft)] [transition:color_.2s] group-hover:text-[var(--ink)]">
      <i className="ph ph-map-pin text-[16px] text-[var(--muted)]" />Vis på kart
      <i className="ph ph-arrow-right ml-auto text-[14px] text-[var(--muted)] [transition:transform_.2s] group-hover:[transform:translateX(3px)]" />
    </div>
  );
}

function MapBack({ maze, roomName, radius, onClose, mounted, scale }: {
  maze: string; roomName: string; radius: string; onClose: () => void; mounted: boolean; scale?: number;
}) {
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden ${radius} border border-[var(--line)] bg-[var(--card)] [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[-.01em]"><i className="ph ph-map-pin text-[15px] text-[var(--muted)]" />{roomName}</span>
        <button type="button" onClick={onClose} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-solid border-[var(--line)] bg-[var(--bg-soft)] px-3 py-1.5 text-[12px] font-semibold text-[var(--ink)]">Tilbake <i className="ph ph-arrow-u-up-left text-[13px]" /></button>
      </div>
      {/* Only mount the (heavy) MazeMap iframe once the card has been flipped.
          On small cards, `scale` renders it in a larger viewport and scales it
          down so MazeMap's fixed-size toolbar takes up less of the card. */}
      <div className="relative flex-1 overflow-hidden bg-[var(--bg-soft)]">
        {mounted && (
          scale
            ? <iframe src={maze} className="absolute top-0 left-0 block border-0" style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "top left" }} loading="lazy" allow="geolocation" title={`Kart – ${roomName}`} />
            : <iframe src={maze} className="absolute inset-0 block h-full w-full border-0" loading="lazy" allow="geolocation" title={`Kart – ${roomName}`} />
        )}
      </div>
    </div>
  );
}

function flipGuard(e: React.MouseEvent) {
  // Don't flip when an inner link (e.g. a mailto) was clicked.
  return !(e.target as HTMLElement).closest("a");
}

function useFlip() {
  const [flipped, setFlipped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const open = () => { setLoaded(true); setFlipped(true); };
  const close = () => setFlipped(false);
  return { flipped, loaded, open, close };
}

export function LargeRoom({ id, image, alt, capacity, title, description, features, maze, roomName }: {
  id?: string; image: string; alt: string; capacity: string; title: React.ReactNode; description: string; features: Feature[]; maze: string; roomName: string;
}) {
  const { flipped, loaded, open, close } = useFlip();
  return (
    <div id={id} className="group h-full scroll-mt-[110px] [perspective:1600px]">
      <div className="relative h-full [transform-style:preserve-3d] [transition:transform_.7s_cubic-bezier(.4,0,.2,1)]" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <article onClick={(e) => flipGuard(e) && open()} className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] [backface-visibility:hidden] [transition:transform_.25s,box-shadow_.25s] group-hover:[transform:translateY(-4px)] group-hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,.18)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-soft)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="block h-full w-full object-cover" width="1920" height="1280" loading="lazy" decoding="async" src={image} alt={alt} />
          </div>
          <div className="flex flex-1 flex-col px-8 pt-7 pb-8">
            <h3 className="mt-0 mb-3.5 text-[30px] leading-[1.05] font-extrabold tracking-[-.02em]">{title}</h3>
            <p className="mt-0 mb-[18px] text-[15px] leading-[1.6] text-[var(--ink-soft)]">{description}</p>
            <div className="mb-6 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--bg-soft)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--ink-soft)]"><i className="ph ph-users text-[14px]" />{capacity} plasser</span>{features.map((feature) => <span key={feature.label} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--bg-soft)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--ink-soft)]"><i className={`${feature.icon} text-[14px]`} />{feature.label}</span>)}</div>
            <MapHint />
          </div>
        </article>
        <MapBack maze={maze} roomName={roomName} radius="rounded-[28px]" onClose={close} mounted={loaded} />
      </div>
    </div>
  );
}

export function MeetingRoom({ accent, image, alt, capacity, title, description, maze, roomName }: {
  accent: string; image: string; alt: string; capacity: string; title: React.ReactNode; description: string; maze: string; roomName: string;
}) {
  const { flipped, loaded, open, close } = useFlip();
  return (
    <div style={{ "--accent": accent } as React.CSSProperties} className="group h-full [perspective:1600px]">
      <div className="relative h-full [transform-style:preserve-3d] [transition:transform_.7s_cubic-bezier(.4,0,.2,1)]" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <article onClick={(e) => flipGuard(e) && open()} className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] [backface-visibility:hidden] [transition:transform_.25s,border-color_.2s] group-hover:[transform:translateY(-3px)] group-hover:border-[var(--accent)]">
          <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[color-mix(in_oklab,var(--accent)_14%,var(--bg-soft))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 block h-full w-full object-cover [transition:transform_.5s_ease] group-hover:[transform:scale(1.05)]" width="1920" height="1280" loading="lazy" decoding="async" src={image} alt={alt} />
          </div>
          <div className="flex flex-1 flex-col p-[22px]">
            <h3 className="mt-0 mb-1.5 text-[19px] font-bold tracking-[-.01em]">{title}</h3>
            <p className="mt-0 mb-3 text-[13.5px] leading-[1.5] text-[var(--ink-soft)]">{description}</p>
            <div className="mb-6 flex flex-wrap gap-1.5"><span className="rounded-md bg-[var(--bg-soft)] px-[9px] py-[5px] font-mono text-[10px] tracking-[.08em] text-[var(--ink-soft)] uppercase">{capacity} plasser</span>{["Flatskjerm", "Lydplanke", "Stoler & bord"].map((item) => <span key={item} className="rounded-md bg-[var(--bg-soft)] px-[9px] py-[5px] font-mono text-[10px] tracking-[.08em] text-[var(--ink-soft)] uppercase">{item}</span>)}</div>
            <MapHint />
          </div>
        </article>
        <MapBack maze={maze} roomName={roomName} radius="rounded-[22px]" onClose={close} mounted={loaded} scale={0.6} />
      </div>
    </div>
  );
}

export function SmallRoom({ id, image, alt, title, children, features, href, maze, logo }: {
  id?: string; image: string; alt: string; title: string; children: React.ReactNode; features: Feature[]; href?: string; maze?: string; logo?: string;
}) {
  const { flipped, loaded, open, close } = useFlip();
  const content = <>
    <div className="relative aspect-[16/11] overflow-hidden bg-[var(--bg-soft)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="block h-full w-full object-cover [transition:transform_.5s_ease] group-hover:[transform:scale(1.05)]" width="2200" height="1650" loading="lazy" decoding="async" src={image} alt={alt} />
      {logo && (
        <span className="absolute inset-0 z-[1] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(10,14,22,.5),rgba(10,14,22,.32))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-[74%] max-w-[312px] [filter:drop-shadow(0_2px_10px_rgba(0,0,0,.35))]" loading="lazy" decoding="async" src={logo} alt="" />
        </span>
      )}
      {href && <span aria-hidden="true" className="absolute top-3.5 right-3.5 z-[2] rounded-full bg-[var(--ink)] px-[15px] py-[9px] text-[12.5px] leading-none font-semibold whitespace-nowrap text-white">Utforsk</span>}
    </div>
    <div className="flex flex-1 flex-col gap-3 px-[26px] pt-6 pb-[26px]">
      <h3 className="m-0 text-[21px] font-bold tracking-[-.015em]">{title}</h3>
      <p className="m-0 text-[14.5px] leading-[1.58] text-[var(--ink-soft)]">{children}</p>
      <div className={`${maze ? "mb-3" : "mt-auto"} flex flex-wrap gap-[7px]`}>{features.map((feature) => <span key={feature.label} className="inline-flex items-center gap-1.5 rounded-[7px] border border-[var(--line)] bg-[var(--bg-soft)] px-2.5 py-[5px] text-[12px] text-[var(--ink-soft)]"><i className={`${feature.icon} text-[14px] text-[var(--muted)]`} />{feature.label}</span>)}</div>
      {maze && <MapHint />}
    </div>
  </>;
  const cardClasses = "group flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--card)] text-inherit no-underline [transition:transform_.25s,box-shadow_.25s,border-color_.2s]";

  if (href) {
    return <Link id={id} className={`${cardClasses} scroll-mt-[110px] hover:[transform:translateY(-4px)] hover:border-[var(--ink)] hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,.18)]`} href={href}>{content}</Link>;
  }

  return (
    <div id={id} className="group h-full scroll-mt-[110px] [perspective:1600px]">
      <div className="relative h-full [transform-style:preserve-3d] [transition:transform_.7s_cubic-bezier(.4,0,.2,1)]" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <article onClick={(e) => flipGuard(e) && open()} className={`${cardClasses} cursor-pointer [backface-visibility:hidden] group-hover:[transform:translateY(-4px)] group-hover:border-[var(--ink)] group-hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,.18)]`}>{content}</article>
        {maze && <MapBack maze={maze} roomName={title.replace(/\.$/, "")} radius="rounded-[22px]" onClose={close} mounted={loaded} />}
      </div>
    </div>
  );
}
