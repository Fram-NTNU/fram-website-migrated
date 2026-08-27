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

// Placeholder = Spark* NTNU (vi later som vi er innlogget på deres profil).
// Speiler Spark sin oppføring i organizations.ts.
export const placeholderProfile: MemberProfile = {
  name: "Spark* NTNU",
  description:
    "Gratis veiledningstjeneste for studenter med en forretningsidé — mentorer, workshops og et program fra post-it til pilot.",
  longDescription:
    "Spark* NTNU er en gratis veiledningstjeneste for studenter som vil realisere en idé. Vi kobler deg med erfarne mentorer, holder workshops, og tar deg gjennom et program fra første post-it til ferdig pilot. Uansett om du har en løs idé eller en oppstart på beina — vi hjelper deg videre.",
  website: "https://sparkntnu.no/",
  accent: "blue",
  logo: "/assets/spark-logo.webp",
  hero: "/assets/heroes/spark-org.webp",
};
