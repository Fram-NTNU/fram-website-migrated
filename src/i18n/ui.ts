import type { Lang } from "./config";

// Delte grensesnitt-strenger som går igjen på tvers av sider (header, footer,
// språkvelger). Sidespesifikk tekst ligger co-lokalisert i hver *-content.tsx.

export const ui = {
  nb: {
    nav: {
      home: "Hjem",
      events: "Arrangementer",
      innovationDays: "Innovasjonsdagene",
      koble: "Koble",
      allEvents: "Alle arrangementer",
      communities: "Miljøene",
      booking: "Booking",
      spacesAndRooms: "Arealer & rom",
      gruva: "Gruva",
      ideaGarage: "Idégarasjen",
      about: "Om Fram",
      openMenu: "Åpne meny",
      closeMenu: "Lukk meny",
    },
    langSwitch: {
      label: "Språk",
      toEnglish: "English",
      toNorwegian: "Norsk",
      ariaToEnglish: "Switch to English",
      ariaToNorwegian: "Bytt til norsk",
    },
    footer: {
      partners: "Samarbeidspartnere",
      pages: "Sider",
      affiliatedWith: "Tilknyttet",
      rights: "© 2015–2026 Fram NTNU",
      slackTitle: "Kun for ledere",
      slackBody:
        "Slacken er for tiden bare for lederne av våre medlemsorganisasjoner. Ønsker du tilgang, ta kontakt med oss.",
      close: "Lukk",
      pageLinks: {
        communities: "Miljøene",
        events: "Arrangementer",
        booking: "Book lokalene",
        about: "Om Fram",
        innovationDays: "Innovasjonsdagene",
      },
    },
    back: "Tilbake",
    notFound: {
      title: "Fant ikke siden",
      body: "Siden du leter etter finnes ikke, eller har blitt flyttet.",
      cta: "Til forsiden",
    },
  },
  en: {
    nav: {
      home: "Home",
      events: "Events",
      innovationDays: "Innovasjonsdagene",
      koble: "Koble",
      allEvents: "All events",
      communities: "Communities",
      booking: "Booking",
      spacesAndRooms: "Spaces & rooms",
      gruva: "Gruva",
      ideaGarage: "Idégarasjen",
      about: "About Fram",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    langSwitch: {
      label: "Language",
      toEnglish: "English",
      toNorwegian: "Norsk",
      ariaToEnglish: "Switch to English",
      ariaToNorwegian: "Switch to Norwegian",
    },
    footer: {
      partners: "Partners",
      pages: "Pages",
      affiliatedWith: "Affiliated with",
      rights: "© 2015–2026 Fram NTNU",
      slackTitle: "Leaders only",
      slackBody:
        "The Slack workspace is currently only for the leaders of our member organisations. If you'd like access, get in touch with us.",
      close: "Close",
      pageLinks: {
        communities: "Communities",
        events: "Events",
        booking: "Book the spaces",
        about: "About Fram",
        innovationDays: "Innovasjonsdagene",
      },
    },
    back: "Back",
    notFound: {
      title: "Page not found",
      body: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back to home",
    },
  },
} as const satisfies Record<Lang, unknown>;

export type UiStrings = (typeof ui)[Lang];
