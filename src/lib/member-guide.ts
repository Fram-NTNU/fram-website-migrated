// Innhold til medlemsguiden ("Velkommen til FRAM").
//
// Dette er FRAMs egen offisielle info, vist til alle medlemsorganisasjoner —
// ikke noe den enkelte org redigerer. Vedlikeholdes sentralt her (senere gjerne
// via et CMS). Kilde: onboarding-PDF-en "Velkommen til FRAM".

export const guideIntro = {
  lead: "Som medlemsorganisasjon i FRAM blir dere en del av innovasjonsmiljøet på NTNU.",
  body: "FRAM samler studentorganisasjoner som driver med innovasjon, teknologi og entreprenørskap på NTNU. Vi er både en paraplyorganisasjon, en fysisk møteplass og en arrangør av aktiviteter som samler og utvikler innovasjonsmiljøet. Målet vårt er å gjøre det enklere for medlemsorganisasjonene å drive med det de allerede er gode på, samtidig som vi senker terskelen for at nye initiativer og organisasjoner kan vokse frem.",
  stats: [
    { value: "31", label: "medlemsorganisasjoner" },
    { value: "1300+", label: "medlemmer" },
    { value: "2016", label: "etablert" },
  ],
};

export const benefits = [
  "Tilgang til FRAMs lokaler og møterom",
  "Mulighet til å booke lokaler til møter og arrangementer",
  "Tilgang til relevante fasiliteter i og rundt FRAM og Gruva",
  "Tilgang til FRAMs leder-Slack, hvor ledere og representanter deler informasjon, muligheter og spørsmål",
  "Invitasjoner til interne arrangementer som Koble og Mini-Koble",
  "Mulighet til å delta på Innovasjonsdagene og andre felles initiativer",
  "Synlighet gjennom FRAMs nettside og kommunikasjonskanaler",
  "Et nettverk med andre studentorganisasjoner innen innovasjon, teknologi og entreprenørskap",
  "Mulighet til å bruke FRAM som kontaktpunkt inn mot resten av innovasjonsmiljøet på NTNU",
];

export const expectations = [
  "Holder kontaktinformasjon og styreinformasjon oppdatert",
  "Gir beskjed når dere får ny leder eller ny hovedkontakt",
  "Sørger for at minst én representant fra organisasjonen møter på FRAMs ledermøter",
  "Følger med på relevant informasjon som deles i FRAMs leder-Slack",
  "Følger regler for booking, lokaler og utstyr",
  "Tar vare på lokalene og rydder etter bruk",
  "Deler relevante arrangementer og muligheter med egne medlemmer",
  "Er åpne for samarbeid med andre organisasjoner i FRAM",
];

export const futureExpectations = [
  "Legger ut alle åpne arrangementer som arrangeres i FRAMs lokaler på arrangementsplattformen (kommer senere i 2026)",
  "Holder relevant informasjon om organisasjonen oppdatert i FRAMs medlemsportal",
];

// `href` gjør steget klikkbart rett til funksjonen i portalen.
export const gettingStarted = [
  { n: "01", title: "Send oss organisasjonsinformasjon", body: "Logo, kort beskrivelse, nettside, Instagram og annen relevant informasjon.", href: "/medlem/dashboard/profil" },
  { n: "02", title: "Registrer kontaktperson", body: "Send navn og kontaktinformasjon til leder og gjerne én ekstra FRAM-kontakt i organisasjonen.", href: "/medlem/dashboard/kontaktpersoner" },
  { n: "03", title: "Bli med i FRAMs leder-Slack", body: "Her foregår mye av den løpende kommunikasjonen mellom FRAM og medlemsorganisasjonene." },
  { n: "04", title: "Få bookingtilgang", body: "Sørg for at dere vet hvordan møterom og andre FRAM-lokaler bookes.", href: "/booking" },
  { n: "05", title: "Sjekk organisasjonen deres på framntnu.no", body: "Kontroller at logo, tekst og lenker er riktige.", href: "/miljoer" },
  { n: "06", title: "Bli kjent med lokalene", body: "Ta turen innom FRAM og Gruva og gjør dere kjent med møterom, fellesarealer og fasiliteter." },
  { n: "07", title: "Sett av datoer til fellesarrangementer", body: "Hold av relevante datoer for ledermøter, Koble, Mini-Koble og Innovasjonsdagene." },
  { n: "08", title: "Ta kontakt når dere trenger noe", body: "FRAM skal være et lavterskel kontaktpunkt. Har dere en idé, et problem eller trenger å komme i kontakt med noen i miljøet, ta kontakt." },
];

export const meetingPlaces = [
  { icon: "ph-users", title: "Ledermøter", body: "Faste møter gjennom året der vi deler viktig informasjon, diskuterer saker som angår miljøet og koordinerer aktiviteter på tvers av organisasjonene." },
  { icon: "ph-slack-logo", title: "Leder-Slack", body: "Den løpende kommunikasjonskanalen mellom FRAM og medlemsorganisasjonene: arrangementer, muligheter og ting som skjer i miljøet — og en enkel vei til hverandre." },
  { icon: "ph-handshake", title: "Koble", body: "Årets største interne samling for medlemsorganisasjonene. Målet er å bygge relasjoner, dele erfaringer og skape samarbeid på tvers av miljøene." },
  { icon: "ph-coffee", title: "Mini-Koble", body: "En mindre og mer uformell møteplass der organisasjonene blir bedre kjent og diskuterer felles utfordringer og muligheter." },
  { icon: "ph-sparkle", title: "Innovasjonsdagene", body: "En av årets viktigste arenaer for å vise frem innovasjonsmiljøet til nye studenter. Dere får presentere dere og møte potensielle nye medlemmer." },
];

export const breadNSpread = {
  lead: "Trenger dere flere medlemmer, vil dere vise frem organisasjonen eller har dere en idé dere ønsker å pitche? Da kan dere arrangere Bread n' Spread sammen med FRAM.",
  body: "Bread n' Spread er et av våre mest populære arrangementer. Vi fyller FRAM med gratis lunsj og studenter, og gir medlemsorganisasjoner en enkel arena for å nå ut til mange på kort tid. Dere får gratis synlighet på et fullsatt FRAM, mens vi står for lunsjen og hjelper til med gjennomføringen.",
  can: [
    "Stå på scenen i Scenerommet og pitche organisasjonen eller en idé",
    "Kjøre en konkurranse eller aktivitet",
    "Dele ut flyers og materiell",
    "Snakke direkte med studenter og rekruttere nye medlemmer",
    "Vise frem et prosjekt, produkt eller noe dere jobber med",
  ],
};
