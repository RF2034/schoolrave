"use client";

import { useEffect, type ReactNode } from "react";

const STORAGE_KEY = "gakkorave2026-loading-done";
const LOADING_MS = 2200;
const EXIT_MS = 1000;

function dismissLoadingGate(animate: boolean) {
  const root = document.documentElement;
  const fallback = document.getElementById("loading-gate-2026-fallback");

  if (
    !fallback ||
    fallback.classList.contains("loading-gate-2026--dismissed")
  ) {
    root.classList.remove("loading-gate-pending");
    root.classList.remove("loading-gate-exiting");
    return;
  }

  const finish = () => {
    fallback.classList.add("loading-gate-2026--dismissed");
    fallback.classList.remove("loading-gate-2026--exiting");
    root.classList.remove("loading-gate-exiting");
  };

  if (!animate) {
    root.classList.remove("loading-gate-pending");
    finish();
    return;
  }

  let done = false;
  const complete = () => {
    if (done) return;
    done = true;
    finish();
  };

  const onEnd = (e: TransitionEvent) => {
    if (e.target !== fallback || e.propertyName !== "opacity") return;
    fallback.removeEventListener("transitionend", onEnd);
    complete();
  };

  fallback.addEventListener("transitionend", onEnd);

  root.classList.add("loading-gate-exiting");
  root.classList.remove("loading-gate-pending");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fallback.classList.add("loading-gate-2026--exiting");
    });
  });

  window.setTimeout(complete, EXIT_MS + 120);
}

export default function LoadingGate2026({ children }: { children: ReactNode }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        dismissLoadingGate(false);
        return;
      }
    } catch {
      /* ignore */
    }

    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      dismissLoadingGate(true);
    }, LOADING_MS);

    return () => window.clearTimeout(t);
  }, []);

  return children;
}
