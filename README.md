# FRAM NTNU – migrated website

Next.js/React/Tailwind-migrering av den eksisterende statiske nettsiden. Produksjonsrepoet er fasit under paritetsfasen og skal ikke endres.

## Lokal utvikling

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Kopier `.env.example` til `.env.local` og legg inn `ANTHROPIC_API_KEY` for å teste Framkompasset mot Anthropic. Lokal fallback kan testes uten nøkkel.

Arrangementer og forsidens arrangementsoversikt henter godkjent innhold fra portalens `/api/v1/events`. Integrasjonen bruker de samme servervariablene som booking: `FRAM_PORTAL_API_URL`, `FRAM_BOOKING_INTEGRATION_SECRET` lokalt og Vercel OIDC i produksjon. En konfigurert portal er den eneste kilden til arrangementer. Eksisterende program må overføres til portalen ved overgang; uten konfigurert integrasjon beholdes dagens program som reserve.

## Kvalitetssjekker

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm test
```

`ppnpm test:baseline` oppdaterer visuelle referansebilder fra den levende produksjonssiden. Kjør den bare når produksjonsversjonen som skal være fasit er bekreftet. `pnpm test` sammenligner den migrerte appen mot disse bildene.

## Migreringsstatus

Alle offentlige sider rendres nå som React-komponenter med JSX og Tailwind. Originalrepoet på baseline-committen brukes som fasit ved visuell og funksjonell sammenligning.

Nyheter hentes fra portalens `/api/v1/news` med samme serverintegrasjon som arrangementer. `/nyheter` viser nyeste publiserte artikler først; `/nyheter/<id>` viser bilder og brødtekst. Godkjent innhold vises mens endringer vurderes. Ingen eksempelnyheter legges på nettsiden uten publisering i portalen.

## Sikkerhetsgrenser for Framkompasset

AI-kall krever portalintegrasjon og reCAPTCHA. Portalen håndhever fem forespørsler per klient per femminuttersvindu og en felles dagsgrense (standard 500 genereringer, `FRAMKOMPASS_DAILY_LIMIT`, maks 1000). Alle serverinstanser bruker samme database. Manglende konfigurasjon eller feil i kontrollen gir lokal matching uten AI-kall. Produksjon på Vercel krever OIDC automatisk. reCAPTCHA-nøkkelen må tillate handlingen `framkompass_submit`; hemmelig nøkkel og tillatte vertsnavn konfigureres i portalen.

Kjør `pnpm test:security` for API-begrensningene. Nettlesertestene bruker isolert lokal server. `pnpm-lock.yaml` er autoritativ låsfil. `braces` har en låst dybdebegrensning i `patches/`; registeraudit vil fortsatt varsle om grunnversjonen til en korrigert upstream-versjon finnes.

Nettsidens CSP avgrenser eksterne script-/iframe-kilder og blokkerer objekter, base-endringer og fremmed innramming. Statiske Next.js-sider krever foreløpig inline-script; policyen er derfor ikke et komplett XSS-vern. Tekst rendres fortsatt uten rå HTML.
