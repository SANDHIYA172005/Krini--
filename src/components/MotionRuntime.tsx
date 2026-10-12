"use client";

import { useEffect } from "react";

/**
 * Attaches smooth scrolling, the hero's behaviour and all interactions after
 * hydration. The motion bundle is code-split out of the initial page load.
 */
export function MotionRuntime() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("../motion").then(({ initSite }) => {
      if (!cancelled) cleanup = initSite();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return null;
}
