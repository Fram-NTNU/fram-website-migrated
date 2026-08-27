// Redigerbar profil for en innlogget medlemsorganisasjon.
//
// Feltene speiler de delene av Organization-typen (src/components/
// miljoer-explorer.tsx) som organisasjonen selv skal styre. Layout-finjustering
// (logoSize, spin, media, photoPosition) er bevisst utelatt — det styrer FRAM.
//
// TODO(auth/data): dette er placeholder. Ekte profil skal hentes fra den
// innloggede orgens oppføring (i dag organizations.ts, et datalager senere),
// og lagring skal skrive tilbake dit + kjøre bildene gjennom en webp-pipeline.

export type MemberAccent = "yellow" | "blue" | "red" | "teal";

export type MemberProfile = {
  name: string;
  description: string; // kort blurb på selve kortet
  longDescription: string; // vises i utvidet visning når man klikker kortet på /miljoer
  website: string; // -> Organization.href
  accent: MemberAccent;
  logo: string; // -> Organization.logo (url etter opplasting)
  hero: string; // -> Organization.photo (url etter opplasting)
};

export const accentHex: Record<MemberAccent, string> = {
  yellow: "#FDC82F",
  blue: "#2E86C1",
  red: "#E85A5A",
  teal: "#3CBFAB",
};

export const placeholderProfile: MemberProfile = {
  name: "Testorganisasjon",
  description:
    "Kort beskrivelse av organisasjonen slik den vises på Miljøene-siden. Dette redigerer dere herfra.",
  longDescription:
    "Her kan dere skrive mer utfyllende om organisasjonen — hva dere driver med, hvem dere er for, hvordan man blir med, og hva slags aktiviteter og prosjekter dere har. Denne teksten vises i den utvidede visningen når noen klikker på kortet deres på framntnu.no.",
  website: "https://www.example.no",
  accent: "blue",
  logo: "",
  hero: "",
};
