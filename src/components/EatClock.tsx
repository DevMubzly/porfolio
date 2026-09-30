"use client";

import { useSyncExternalStore } from "react";

// East Africa Time is UTC+3 with no DST, so the IANA zone is stable year-round.
const TIMEZONE = "Africa/Kampala";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

// Returns a string, so this only produces a new value when the second ticks —
// React compares by value and skips the re-render otherwise.
function getSnapshot() {
  return formatter.format(new Date());
}

function getServerSnapshot() {
  return "--:--:--";
}

export function EatClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="flex items-center gap-1.5 tabular-nums">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {time} EAT
    </span>
  );
}
