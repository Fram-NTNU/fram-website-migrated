"use client";

import { useRef, useState } from "react";
import { OrgCard, type Organization } from "@/components/miljoer-explorer";
import { accentHex, type MemberAccent, type MemberProfile } from "@/lib/member-profile";

const accents: MemberAccent[] = ["yellow", "blue", "red", "teal"];
const DESC_MAX = 160;
const LONG_MAX = 800;

/**
 * Rediger organisasjonens offentlige profil, med live forhåndsvisning av
 * hvordan kortet ser ut på /miljoer.
 *
 * MERK: kun UI. Bilder vises lokalt (URL.createObjectURL) men lastes ikke opp,
 * og «Lagre» persisterer ingenting.
 * TODO(persist): lagre feltene mot orgens oppføring og kjør logo/hero gjennom
 * en webp-pipeline (f.eks. Vercel Blob) ved lagring.
 */
export function MemberProfileForm({ initial }: { initial: MemberProfile }) {
  const [profile, setProfile] = useState<MemberProfile>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  // Driver «søker medlemmer»-merket i forhåndsvisningen.
  // TODO(persist): del kilde med «Vi søker medlemmer»-bryteren på dashbordet.
  const [recruiting, setRecruiting] = useState(false);
  const logoInput = useRef<HTMLInputElement>(null);
  const heroInput = useRef<HTMLInputElement>(null);

  function set<K extends keyof MemberProfile>(key: K, value: MemberProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
    setStatus("idle");
  }

  function pickImage(key: "logo" | "hero", file: File | undefined) {
    if (!file) return;
    // TODO(persist): last opp + konverter til webp. Foreløpig bare lokal preview.
    const url = URL.createObjectURL(file);
    setProfile((p) => {
      if (p[key]) URL.revokeObjectURL(p[key]);
      return { ...p, [key]: url };
    });
    setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(persist): skriv til datalageret her.
    setStatus("saving");
    setStatus("saved");
  }

  // Bygger et Organization-objekt fra skjemaverdiene, så forhåndsvisningen kan
  // gjenbruke det EKTE OrgCard fra /miljoer — da blir den 100 % identisk.
  const orgForPreview: Organization = {
    accent: profile.accent,
    href: profile.website || "#",
    logo: profile.logo,
    logoAlt: profile.name,
    photo: profile.hero,
    photoAlt: profile.name,
    photoPosition: "center top",
    category: "",
    name: profile.name || "Organisasjonsnavn",
    description: profile.description || "Kort beskrivelse av organisasjonen …",
  };

  const fieldClass =
    "w-full rounded-xl border border-[var(--line)] bg-white px-[15px] py-3 text-[15px] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(46,134,193,.15)]";
  const labelText = "text-[13px] font-semibold text-[var(--ink-soft)]";

  return (
    <div className="grid grid-cols-[1.2fr_.8fr] gap-8 max-[880px]:grid-cols-1">
      {/* Skjema */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className={labelText}>Navn</span>
          <input className={fieldClass} value={profile.name} onChange={(e) => set("name", e.target.value)} required />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelText}>Kort beskrivelse</span>
          <textarea
            className={`${fieldClass} min-h-[80px] resize-y`}
            value={profile.description}
            onChange={(e) => set("description", e.target.value.slice(0, DESC_MAX))}
            maxLength={DESC_MAX}
            rows={2}
          />
          <div className="flex justify-between text-[12px] text-[var(--muted)]">
            <span>Vises på selve kortet.</span>
            <span>{profile.description.length}/{DESC_MAX}</span>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelText}>Lang beskrivelse</span>
          <textarea
            className={`${fieldClass} min-h-[150px] resize-y`}
            value={profile.longDescription}
            onChange={(e) => set("longDescription", e.target.value.slice(0, LONG_MAX))}
            maxLength={LONG_MAX}
            rows={6}
          />
          <div className="flex justify-between text-[12px] text-[var(--muted)]">
            <span>Vises i utvidet visning når noen klikker kortet på framntnu.no.</span>
            <span>{profile.longDescription.length}/{LONG_MAX}</span>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelText}>Nettside</span>
          <input
            className={fieldClass}
            type="url"
            value={profile.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="https://..."
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className={labelText}>Aksentfarge</span>
          <div className="flex gap-2.5">
            {accents.map((a) => (
              <button
                key={a}
                type="button"
                aria-label={a}
                aria-pressed={profile.accent === a}
                onClick={() => set("accent", a)}
                className={`h-9 w-9 rounded-full [transition:transform_.15s] hover:scale-105 ${profile.accent === a ? "ring-2 ring-[var(--ink)] ring-offset-2 ring-offset-[var(--bg)]" : ""}`}
                style={{ backgroundColor: accentHex[a] }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3.5">
          <div className="min-w-0">
            <p className="m-0 text-[13px] font-semibold text-[var(--ink)]">Søker medlemmer</p>
            <p className="m-0 mt-0.5 text-[12px] leading-[1.45] text-[var(--muted)]">
              Viser et «søker medlemmer»-merke på kortet deres.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={recruiting}
            aria-label="Søker medlemmer"
            onClick={() => {
              setRecruiting((v) => !v);
              setStatus("idle");
            }}
            className={`flex h-[30px] w-[54px] shrink-0 items-center rounded-full border-0 p-[3px] [transition:background_.25s] ${recruiting ? "bg-[#3CBFAB]" : "bg-[var(--line)]"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.3)] [transition:transform_.25s] ${recruiting ? "translate-x-[24px]" : "translate-x-0"}`}
            >
              {recruiting && <i className="ph ph-check text-[13px] font-bold text-[#2AA891]" aria-hidden="true" />}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
          <ImageField
            label="Logo"
            hint="PNG med gjennomsiktig bakgrunn"
            value={profile.logo}
            onPick={(f) => pickImage("logo", f)}
            onClear={() => set("logo", "")}
            inputRef={logoInput}
          />
          <ImageField
            label="Hero-bilde"
            hint="Bredt bilde — blir webp automatisk"
            value={profile.hero}
            onPick={(f) => pickImage("hero", f)}
            onClear={() => set("hero", "")}
            inputRef={heroInput}
          />
        </div>

        <div className="mt-2 flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-white [transition:transform_.2s,background_.2s] hover:-translate-y-px hover:bg-[var(--blue)]"
          >
            <i className="ph ph-check" aria-hidden="true" />
            Lagre endringer
          </button>
          {status === "saved" && (
            <span role="status" className="text-[13.5px] font-semibold text-[var(--ink-soft)]">
              Lagret lokalt — ikke publisert ennå.
            </span>
          )}
        </div>
      </form>

      {/* Live forhåndsvisning — det EKTE kortet fra /miljoer */}
      <div className="max-[880px]:order-first">
        <div className="sticky top-24">
          <p className="mb-3 font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">Forhåndsvisning</p>
          <div className="mx-auto max-w-[320px]">
            <OrgCard organization={orgForPreview} logoMode={false} recruiting={recruiting} />
          </div>

          <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[var(--bg-soft)] p-5">
            <p className="mb-2 font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">Utvidet visning</p>
            <h4 className="mt-0 mb-2 text-[15px] font-extrabold tracking-[-.01em]">{profile.name || "Organisasjonsnavn"}</h4>
            <p className="m-0 whitespace-pre-line text-[13px] leading-[1.6] text-[var(--ink-soft)]">
              {profile.longDescription || "Lengre tekst om organisasjonen …"}
            </p>
          </div>

          <p className="mt-3 text-[12px] leading-[1.5] text-[var(--muted)]">
            Nøyaktig slik kortet vises på framntnu.no (hold musepekeren over for logo). Endringer publiseres ikke automatisk ennå.
          </p>
        </div>
      </div>
    </div>
  );
}

function ImageField({
  label,
  hint,
  value,
  onPick,
  onClear,
  inputRef,
}: {
  label: string;
  hint: string;
  value: string;
  onPick: (file: File | undefined) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-[var(--ink-soft)]">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-[var(--line)] bg-[var(--bg-soft)] p-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--line)] bg-white">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <i className="ph ph-image text-[20px] text-[var(--muted)]" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-[13px] font-semibold text-[var(--blue)] hover:underline"
          >
            {value ? "Bytt bilde" : "Last opp"}
          </button>
          {value && (
            <button type="button" onClick={onClear} className="ml-3 text-[13px] text-[var(--muted)] hover:underline">
              Fjern
            </button>
          )}
          <p className="m-0 mt-0.5 truncate text-[11.5px] text-[var(--muted)]">{hint}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
