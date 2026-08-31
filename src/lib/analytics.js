import { track } from "@vercel/analytics/react";

/* Vercel caps custom-event property values; anything longer is rejected and the
   whole event is dropped, so we trim before it ever leaves the browser. */
const MAX_VALUE = 250;

/* Query keys that must never reach the dashboard even if a link grows one. */
const SENSITIVE = /^(token|key|secret|password|pass|auth|email|phone|session)$/i;

const clean = (props) => {
  if (!props) return undefined;
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] =
      typeof v === "string"
        ? v.slice(0, MAX_VALUE)
        : typeof v === "number" || typeof v === "boolean"
          ? v
          : String(v).slice(0, MAX_VALUE);
  }
  return Object.keys(out).length ? out : undefined;
};

/* Every call site goes through here: a portfolio must never white-screen
   because an analytics call threw or the script was blocked. */
export function event(name, props) {
  try {
    track(name, clean(props));
  } catch {
    /* no-op */
  }
}

/* Runs on every pageview/event before it is sent. Strips credential-ish query
   params so only the path and harmless params are recorded. */
export function beforeSend(e) {
  try {
    const url = new URL(e.url);
    let touched = false;
    for (const k of [...url.searchParams.keys()]) {
      if (SENSITIVE.test(k)) {
        url.searchParams.delete(k);
        touched = true;
      }
    }
    return touched ? { ...e, url: url.toString() } : e;
  } catch {
    return e;
  }
}
