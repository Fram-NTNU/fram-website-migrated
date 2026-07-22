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

## Migreringsstatus

Alle offentlige sider rendres nå som React-komponenter med JSX og Tailwind. Originalrepoet på baseline-committen brukes som fasit ved visuell og funksjonell sammenligning.
