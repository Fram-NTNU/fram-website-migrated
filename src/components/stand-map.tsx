import type { Lang } from "@/i18n/config";

type Stand = { name: string; x: number; y: number; partner?: boolean };

const copy = {
  nb: { ariaLabel: "Standkart over Innovasjonsdagene i Gruva (Plan 1. etasje), med plassering av alle organisasjonene.", mainStage: "Scenerommet", commonArea: "Fellesrommet", entrance: "Inngang" },
  en: { ariaLabel: "Stand map of Innovasjonsdagene in Gruva (ground floor plan), showing the location of all the organisations.", mainStage: "Scenerommet", commonArea: "Fellesrommet", entrance: "Entrance" },
} as const satisfies Record<Lang, unknown>;

// Coordinates live in the floor-plan space defined by the viewBox below; the
// background image is the real Gruva plan (Plan 1. etasje) traced from the venue drawing.
const stands: Stand[] = [
  { name: "Equinor", x: 762, y: 540, partner: true },
  { name: "SMN", x: 772, y: 658, partner: true },
  { name: "DNB", x: 772, y: 815, partner: true },
  { name: "Vortex", x: 792, y: 918 },
  { name: "Spark/Boost", x: 948, y: 530 },
  { name: "Ascend", x: 1092, y: 530 },
  { name: "Brain", x: 1232, y: 375 },
  { name: "Nordlys", x: 1363, y: 375 },
  { name: "Revolve", x: 1485, y: 375 },
  { name: "Propulse", x: 1616, y: 375 },
  { name: "Designhjelpen", x: 1414, y: 512 },
  { name: "Fuel Fighter", x: 1579, y: 512 },
  { name: "Grunderbrakka", x: 1133, y: 900 },
  { name: "Fram", x: 730, y: 961 },
  { name: "Orbit", x: 946, y: 989 },
  { name: "GridVille", x: 1044, y: 989 },
  { name: "IUG", x: 1124, y: 989 },
  { name: "Start", x: 472, y: 1140 },
  { name: "ReLu", x: 576, y: 1140 },
  { name: "Women in AI", x: 712, y: 1140 },
  { name: "Engage", x: 899, y: 1140 },
  { name: "Make", x: 463, y: 1255 },
  { name: "Marinor", x: 566, y: 1255 },
  { name: "Jet", x: 669, y: 1255 },
  { name: "Cogito", x: 772, y: 1255 },
  { name: "Njord", x: 876, y: 1255 },
];

export function StandMap({ lang = "nb" }: { lang?: Lang } = {}) {
  const t = copy[lang];
  return (
    <div className="overflow-x-auto [scrollbar-width:thin]">
      <svg
        viewBox="180 67 1579 1306"
        role="img"
        aria-label={t.ariaLabel}
        className="block h-auto w-full min-w-[720px]"
      >
        {/* Real floor plan of Gruva, traced from the venue drawing */}
        <image href="/assets/standkart-gruva.png" x="348.4" y="67.2" width="1410.2" height="1305.6" preserveAspectRatio="xMidYMid meet" opacity="0.85" />

        {/* Room labels */}
        <text x="1311" y="781" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="600" fill="rgba(205,217,227,.72)" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>{t.mainStage}</text>
        <text x="1560" y="781" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="600" fill="rgba(205,217,227,.72)" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>{t.commonArea}</text>

        {/* Entrance (left wall) */}
        <g>
          <rect x="353" y="1157" width="5" height="56" rx="2" fill="var(--id-peach)" />
          <path d="M334 1171 L356 1185 L334 1199 Z" fill="var(--id-peach)" />
          <text x="268" y="1191" textAnchor="middle" fontSize="21" letterSpacing="2.5" fill="var(--id-peach)" style={{ fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}>{t.entrance}</text>
        </g>

        {/* Stands */}
        {stands.map((stand) => {
          const accent = stand.partner ? "var(--id-peach)" : "var(--id-teal)";
          return (
            <g key={stand.name}>
              <circle cx={stand.x} cy={stand.y} r="15" fill={accent} opacity="0.18" />
              <circle cx={stand.x} cy={stand.y} r="9" fill={accent} opacity="0.42" />
              <circle cx={stand.x} cy={stand.y} r="5" fill={accent} />
              <text
                x={stand.x}
                y={stand.y + 29}
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                fill="#fff"
                stroke="rgba(20,20,20,.55)"
                strokeWidth="4"
                paintOrder="stroke"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {stand.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
