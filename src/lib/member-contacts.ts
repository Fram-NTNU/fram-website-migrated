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

// Standard: Leder og Nestleder ligger klare med rollen utfylt — orgen fyller
// bare inn navn og kontaktinfo.
export const placeholderContacts: MemberContact[] = [
  { id: "1", name: "", role: "Leder", email: "", phone: "" },
  { id: "2", name: "", role: "Nestleder", email: "", phone: "" },
];
