import type { CSSProperties } from "react";

type OrigamiDecorationProps = {
  className: string;
  color: string;
  size: string;
  rotation: string;
  opacity: number;
};

export function OrigamiDecoration({ className, color, size, rotation, opacity }: OrigamiDecorationProps) {
  const style = {
    width: size,
    opacity,
    transform: `rotate(${rotation})`,
    "--tile-color": color,
  } as CSSProperties;

  const lightFacet = {
    backgroundColor: color,
    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,.5), rgba(255,255,255,.06) 60%, rgba(0,0,0,.03))",
  };
  const shadowFacet = {
    backgroundColor: color,
    backgroundImage: "linear-gradient(135deg, rgba(0,0,0,.02), rgba(0,0,0,.12) 55%, rgba(0,0,0,.24))",
  };

  return (
    <span className={`pointer-events-none absolute z-0 aspect-square drop-shadow-[0_14px_26px_rgba(0,0,0,.1)] max-[720px]:hidden ${className}`} style={style} aria-hidden="true">
      <span className="absolute inset-0 rounded-sm [clip-path:polygon(0_0,100%_0,0_100%)]" style={lightFacet} />
      <span className="absolute inset-0 rounded-sm [clip-path:polygon(100%_0,100%_100%,0_100%)]" style={shadowFacet} />
    </span>
  );
}
