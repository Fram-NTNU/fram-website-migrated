"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Login-skjema for medlemsorganisasjoner.
 *
 * MERK: Dette er foreløpig bare UI. Det er ingen ekte autentisering ennå —
 * `handleSubmit` viser bare en placeholder-melding. Når auth skal kobles på
 * (Auth.js/NextAuth, Clerk, eller egen backend) er det her, og i en
 * server action / API-route, den logikken skal inn. Ikke bygg videre på at
 * innsending gjør noe reelt før det er på plass.
 *
 * Tekst er norsk-only inntil videre. i18n-dictionary-modellen (src/i18n/,
 * *-content.tsx) ligger på feature/english-i18n og er ikke merget til main —
 * gjør siden tospråklig når den lander.
 */
export function MemberLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(auth): erstatt med ekte innlogging (server action / API-route som
    // verifiserer og oppretter en sesjon). Foreløpig hopper vi rett til
    // medlemsområdet så flyten er klikkbar ende-til-ende — ingen verifisering.
    setPending(true);
    router.push("/medlem/dashboard");
  }

  const fieldClass =
    "w-full rounded-xl border border-[var(--line)] bg-white px-[15px] py-3.5 text-[15px] text-[var(--ink)] outline-none [transition:border-color_.2s,box-shadow_.2s] placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(46,134,193,.15)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-[var(--ink-soft)]">E-post</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="din@organisasjon.no"
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-[var(--ink-soft)]">Passord</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={fieldClass}
        />
      </label>

      <div className="flex items-center justify-between text-[13px]">
        <label className="flex cursor-pointer items-center gap-2 text-[var(--ink-soft)]">
          <input type="checkbox" name="remember" className="accent-[var(--blue)]" />
          Husk meg
        </label>
        {/* TODO(auth): rute for glemt passord */}
        <a href="#" className="font-semibold text-[var(--blue)] no-underline hover:underline">
          Glemt passord?
        </a>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-[15px] font-semibold text-white [transition:transform_.2s,background_.2s] hover:[transform:translateY(-2px)] hover:bg-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:[transform:none]"
      >
        {pending ? "Logger inn …" : "Logg inn"}
      </button>
    </form>
  );
}
