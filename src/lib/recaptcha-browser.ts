let loading: Promise<void> | undefined;
export async function framkompassCaptcha() {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "development") return "local-development";
    throw new Error("Botbeskyttelsen er ikke konfigurert.");
  }
  loading ??= new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return window.grecaptcha.ready(resolve);
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
    script.onload = () => window.grecaptcha?.ready(resolve);
    script.onerror = () => { loading = undefined; reject(new Error("Botbeskyttelsen kunne ikke lastes.")); };
    document.head.appendChild(script);
  });
  await Promise.race([loading, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Botbeskyttelsen kunne ikke lastes.")), 10000))]);
  return Promise.race([
    window.grecaptcha!.execute(key, { action: "framkompass_submit" }),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Botbeskyttelsen brukte for lang tid.")), 10000)),
  ]);
}
