// Preserve the actual body width: root.clientWidth can include a reserved
// scrollbar gutter even when the body's content area is narrower.
export function lockPageScroll() {
  const body = document.body;
  const root = document.documentElement;
  const original = { overflow: body.style.overflow, width: body.style.width, maxWidth: body.style.maxWidth, gutter: root.style.scrollbarGutter };
  const position = { left: window.scrollX, top: window.scrollY };
  const width = body.getBoundingClientRect().width;
  root.style.scrollbarGutter = "stable";
  body.style.width = `${width}px`;
  body.style.maxWidth = "100%";
  body.style.overflow = "hidden";
  return () => {
    body.style.overflow = original.overflow;
    body.style.width = original.width;
    body.style.maxWidth = original.maxWidth;
    root.style.scrollbarGutter = original.gutter;
    window.scrollTo({ ...position, behavior: "instant" });
  };
}
