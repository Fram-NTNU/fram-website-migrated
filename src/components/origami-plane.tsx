import type { CSSProperties } from "react";

type PlaneProps = {
  className: string;
  rotation: string;
  delay: string;
  colors: [string, string, string];
};

export function OrigamiPlane({ className, rotation, delay, colors }: PlaneProps) {
  const style = { "--rot": rotation, animationDelay: delay } as CSSProperties;
  return (
    <svg className={`origami-plane absolute opacity-[.55] [transform:rotate(var(--rot,0deg))_scale(var(--scale,1))] will-change-transform animate-[fram-floaty_12s_ease-in-out_infinite_alternate] motion-reduce:animate-none max-[720px]:opacity-[.42] max-[480px]:opacity-[.36] ${className}`} viewBox="0 0 200 140" style={style}>
      <polygon points="190,70 10,16 58,74" fill={colors[0]} />
      <polygon points="190,70 10,124 58,74" fill={colors[1]} />
      <polygon points="58,74 10,124 46,104" fill={colors[2]} />
    </svg>
  );
}
