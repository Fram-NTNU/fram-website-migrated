export type EventItem = {
  day: string; month: string; meta: string; title: string; description: string;
  location: string; host: string; pill: string; pillClass: string; image: string;
  hostFram?: boolean; href?: string; partner?: { src: string; alt: string };
};

// Kommende Fram-arrangementer
export const upcomingEvents: EventItem[] = [
  { day: "16", month: "SEP", meta: "Onsdag", title: "Bread n' Spread", description: "Ta en pause fra lesesalen og stikk innom Fram til gratis lunsj kl. 12. Ingen påmelding, bare å møte opp ved inngangen ut mot busstoppet på Gløshaugen.", location: "Fellesrommet", host: "Fram", pill: "Gratis · Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp", hostFram: true },
  { day: "23", month: "OKT", meta: "Fredag", title: "Bread n' Spread", description: "Ta en pause fra lesesalen og stikk innom Fram til gratis lunsj kl. 12. Ingen påmelding, bare å møte opp ved inngangen ut mot busstoppet på Gløshaugen.", location: "Fellesrommet", host: "Fram", pill: "Gratis · Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp", hostFram: true },
  { day: "12", month: "NOV", meta: "Torsdag", title: "Bread n' Spread", description: "Ta en pause fra lesesalen og stikk innom Fram til gratis lunsj kl. 12. Ingen påmelding, bare å møte opp ved inngangen ut mot busstoppet på Gløshaugen.", location: "Fellesrommet", host: "Fram", pill: "Gratis · Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/bns-nov6.webp", hostFram: true },
  { day: "01", month: "DES", meta: "Tirsdag", title: "Julegrøt", description: "Tradisjonell julegrøt i Fellesrommet før eksamensinnspurten. Grøt, kos og kanskje mandel i skåla. Ta med godt humør.", location: "Fellesrommet", host: "Fram", pill: "Gratis · Drop-in", pillClass: "bg-[#FFF4D6] text-[#8A6A00]", image: "/assets/fram-fellesrom.webp", hostFram: true },
];

// Tidligere Fram-arrangementer
export const pastEvents: EventItem[] = [
  { day: "19–20", month: "AUG", meta: "2026", title: "Innovasjonsdagene '26", description: "To fine dager i Gruva der Fram-organisasjonene viste frem prosjektene sine, og nye og gamle studenter ble kjent med innovasjonsmiljøet på NTNU.", location: "Gruva", host: "Fram", pill: "Gjennomført", pillClass: "bg-[var(--bg-soft)] text-[var(--muted)]", image: "/assets/innovasjonsdagene-hovedscenen.avif", hostFram: true, href: "/innovasjonsdagene" },
];
