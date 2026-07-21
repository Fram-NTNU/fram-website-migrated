# FRAM NTNU – migrated website

Next.js/React/Tailwind-migrering av den eksisterende statiske nettsiden. Produksjonsrepoet er fasit under paritetsfasen og skal ikke endres.

## Lokal utvikling

```bash
npm install
npm run dev
```

Kopier `.env.example` til `.env.local` og legg inn `ANTHROPIC_API_KEY` for å teste Framkompasset mot Anthropic. Lokal fallback kan testes uten nøkkel.

## Kvalitetssjekker

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

`npm run test:baseline` oppdaterer visuelle referansebilder fra den levende produksjonssiden. Kjør den bare når produksjonsversjonen som skal være fasit er bekreftet. `npm test` sammenligner den migrerte appen mot disse bildene.

## Migreringsstrategi

`legacy-pages/` er en frosset kopi av markupen på baseline-committen. Next server-renderer denne gjennom delte React-komponenter for header, innhold, footer og klientskript. Tailwind er satt opp uten preflight for å hindre utilsiktede designendringer. Legacy-seksjoner kan deretter erstattes med JSX og Tailwind én etter én, men gammel CSS skal først fjernes etter godkjent visuell regresjonstest.
