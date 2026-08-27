// Kontaktpersoner for en medlemsorganisasjon.
//
// TODO(auth/data): placeholder. Ekte kontakter skal hentes/lagres mot orgens
// oppføring. `id` er kun for lokal liste-håndtering i UI-et.

export type MemberContact = {
  id: string;
  name: string;
  role: string; // f.eks. Leder, Nestleder, IT-ansvarlig
  email: string;
  phone: string;
};

// Vanlige verv — brukes som forslag (datalist) i skjemaet.
export const roleSuggestions = [
  "Leder",
  "Nestleder",
  "Økonomiansvarlig",
  "IT-ansvarlig",
  "Markedsansvarlig",
  "Arrangementsansvarlig",
];

export const placeholderContacts: MemberContact[] = [
  { id: "1", name: "Ola Nordmann", role: "Leder", email: "leder@organisasjon.no", phone: "400 00 000" },
  { id: "2", name: "Kari Nordmann", role: "Nestleder", email: "nestleder@organisasjon.no", phone: "" },
];
