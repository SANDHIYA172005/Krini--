import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function gsapReady() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export type Cleanup = () => void;

/** Collects teardown functions so every module can be unmounted cleanly (React strict mode, HMR). */
export class Disposer {
  private fns: Cleanup[] = [];
  add(fn: Cleanup | undefined | void) {
    if (fn) this.fns.push(fn);
  }
  on<K extends keyof WindowEventMap>(target: Window, type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions): void;
  on(target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions): void;
  on(target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) {
    target.addEventListener(type, fn, opts);
    this.fns.push(() => target.removeEventListener(type, fn, opts));
  }
  dispose() {
    for (const fn of this.fns.splice(0).reverse()) {
      try {
        fn();
      } catch {
        /* keep tearing down */
      }
    }
  }
}
