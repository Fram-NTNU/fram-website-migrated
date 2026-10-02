"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
};
const snapshot = () => Math.floor(Date.now() / 60000) * 60000;
const serverSnapshot = () => 0;

export function useBookingClock() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
