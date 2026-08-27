// Medlemstall for en organisasjon.
//
// TODO(auth/data): placeholder. Ekte tall skal hentes/lagres mot orgens
// oppføring, gjerne med rapporteringshistorikk (dato + antall) over tid.

export type MemberStats = {
  count: number;
  asOf: string; // yyyy-mm-dd — datoen tallet gjelder for; "" = ikke satt
};

export const placeholderStats: MemberStats = {
  count: 42,
  asOf: "",
};
