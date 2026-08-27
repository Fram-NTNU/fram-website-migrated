"use client";

import { useState } from "react";
import { type MemberContact, roleSuggestions } from "@/lib/member-contacts";

/**
 * Legg til, rediger og fjern organisasjonens kontaktpersoner.
 *
 * MERK: kun UI. Endringer lever i komponenten og nullstilles ved refresh.
 * TODO(persist): lagre lista mot orgens oppføring.
 */
export function MemberContactsManager({ initial }: { initial: MemberContact[] }) {
  const [contacts, setContacts] = useState<MemberContact[]>(initial);
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function update(id: string, key: keyof MemberContact, value: string) {
    setContacts((list) => list.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
    setStatus("idle");
  }

  function add() {
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(contacts.length + 1);
    setContacts((list) => [...list, { id, name: "", role: "", email: "", phone: "" }]);
    setStatus("idle");
  }

  function remove(id: string) {
    setContacts((list) => list.filter((c) => c.id !== id));
    setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(persist): skriv lista til datalageret her.
    setStatus("saved");
  }

  const fieldClass =
    "w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 text-[14px] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(46,134,193,.15)]";
  const labelText = "text-[12px] font-semibold text-[var(--ink-soft)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <datalist id="rolle-forslag">
        {roleSuggestions.map((r) => (
          <option key={r} value={r} />
        ))}
      </datalist>

      {contacts.length === 0 && (
        <p className="rounded-[18px] border border-dashed border-[var(--line)] bg-[var(--bg-soft)] px-5 py-8 text-center text-[14px] text-[var(--ink-soft)]">
          Ingen kontaktpersoner ennå. Legg til den første nedenfor.
        </p>
      )}

      {contacts.map((c, i) => (
        <div key={c.id} className="rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,.04)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[.12em] text-[var(--muted)] uppercase">
              Kontaktperson {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(c.id)}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--nav-accent)]"
            >
              <i className="ph ph-trash" aria-hidden="true" />
              Fjern
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            <label className="flex flex-col gap-1.5">
              <span className={labelText}>Navn</span>
              <input className={fieldClass} value={c.name} onChange={(e) => update(c.id, "name", e.target.value)} placeholder="Fornavn Etternavn" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelText}>Rolle</span>
              <input
                className={fieldClass}
                value={c.role}
                onChange={(e) => update(c.id, "role", e.target.value)}
                list="rolle-forslag"
                placeholder="F.eks. Leder"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelText}>E-post</span>
              <input className={fieldClass} type="email" value={c.email} onChange={(e) => update(c.id, "email", e.target.value)} placeholder="navn@organisasjon.no" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelText}>Telefon <span className="font-normal text-[var(--muted)]">(valgfritt)</span></span>
              <input className={fieldClass} type="tel" value={c.phone} onChange={(e) => update(c.id, "phone", e.target.value)} placeholder="400 00 000" />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-dashed border-[var(--line)] px-5 py-3 text-[14px] font-semibold text-[var(--ink-soft)] [transition:border-color_.2s,color_.2s] hover:border-[var(--ink)] hover:text-[var(--ink)]"
      >
        <i className="ph ph-plus" aria-hidden="true" />
        Legg til kontaktperson
      </button>

      <div className="mt-2 flex items-center gap-4 border-t border-[var(--line)] pt-6">
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
  );
}
