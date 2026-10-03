"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function NewsRetry() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return <button className="event-more-link news-retry" type="button" disabled={pending}
    onClick={() => start(() => router.refresh())}>{pending ? "Henter nyheter …" : "Prøv igjen"}</button>;
}
