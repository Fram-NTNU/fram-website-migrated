// Placeholder-data for FRAMs admin-dashboard (back-office).
//
// TODO(data): alt her er placeholder. Kobles til ekte kilder senere:
// medlemstall fra orgenes rapportering, bookinger fra bookingsystemet, osv.

export type Kpi = {
  label: string;
  value: string;
  sub: string;
  icon: string;
  tint: string;
};

export const kpis: Kpi[] = [
  { label: "Medlemsorganisasjoner", value: "31", sub: "+2 dette semesteret", icon: "ph-buildings", tint: "#2E86C1" },
  { label: "Medlemmer totalt", value: "1 342", sub: "rapportert av 24 orger", icon: "ph-users-three", tint: "#3CBFAB" },
  { label: "Bookinger denne uken", value: "47", sub: "12 i Gruva", icon: "ph-calendar-check", tint: "#E58A3A" },
  { label: "Venter på godkjenning", value: "6", sub: "3 interne · 3 eksterne", icon: "ph-hourglass-medium", tint: "#E85A5A" },
];

export type PendingBooking = {
  id: string;
  requester: string;
  room: string;
  date: string;
  time: string;
  purpose: string;
  type: "intern" | "ekstern";
};

export const pendingBookings: PendingBooking[] = [
  { id: "i1", requester: "Cogito NTNU", room: "Scenerommet", date: "12. sep", time: "17:00–20:00", purpose: "AI-workshop for medlemmer", type: "intern" },
  { id: "i2", requester: "Revolve NTNU", room: "Gruva", date: "15. sep", time: "18:00–22:00", purpose: "Sponsormiddag", type: "intern" },
  { id: "i3", requester: "Ascend NTNU", room: "Møterom A", date: "10. sep", time: "14:00–16:00", purpose: "Styremøte", type: "intern" },
  { id: "e1", requester: "Equinor", room: "Fellesrommet", date: "20. sep", time: "09:00–12:00", purpose: "Rekrutteringsevent", type: "ekstern" },
  { id: "e2", requester: "NTNU Karrieresenter", room: "Scenerommet", date: "18. sep", time: "13:00–15:00", purpose: "Bedriftspresentasjon", type: "ekstern" },
  { id: "e3", requester: "SpareBank 1", room: "Gruva", date: "25. sep", time: "16:00–19:00", purpose: "Mingling med studenter", type: "ekstern" },
];

// Bookinger siste 6 måneder — til stolpediagram.
export const bookingsByMonth = [
  { month: "Mar", intern: 22, ekstern: 10 },
  { month: "Apr", intern: 28, ekstern: 13 },
  { month: "Mai", intern: 19, ekstern: 9 },
  { month: "Jun", intern: 12, ekstern: 6 },
  { month: "Aug", intern: 31, ekstern: 14 },
  { month: "Sep", intern: 38, ekstern: 18 },
];

export const roomUtilization = [
  { room: "Gruva", pct: 82 },
  { room: "Scenerommet", pct: 64 },
  { room: "Fellesrommet", pct: 71 },
  { room: "Møterom A", pct: 55 },
  { room: "Møterom B", pct: 43 },
];

export const orgsNeedingFollowup = [
  { org: "BRAIN NTNU", reason: "Ingen kontaktperson registrert" },
  { org: "Boost Henne", reason: "Profil ikke oppdatert på 8 måneder" },
  { org: "Gründerbrakka", reason: "Medlemstall mangler for i år" },
];

export const recruitingOrgs = [
  { org: "Cogito NTNU", until: "26. sep" },
  { org: "Ascend NTNU", until: "1. okt" },
  { org: "Designhjelpen", until: "5. okt" },
];
