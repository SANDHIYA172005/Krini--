"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Makes moving between pages instant: every link on the site is a plain <a>,
 * so without this each click reloads the whole site (fonts, scripts, the
 * motion bundle) before the next page shows. This catches clicks on links to
 * other pages of the site and hands them to the Next.js router, which swaps
 * only the page and keeps everything else; links are prefetched as the pointer
 * reaches them or they get focus. The page fades out and the new one fades in
 * (theme.css, html[data-route]).
 *
 * Every page opens at its top: after a click, after a refresh, and with the
 * back button. Home is the exception when you come to it from another page:
 * it opens on the hero film's last frame (window.__kcHeroEnd, read by
 * scrollhero.ts), not at the start of the film; a refresh or a first visit
 * starts the film from the beginning, after the loading screen. A link with a
 * #place in it (/products#all-products) still goes to that place. On Home
 * itself, a link to Home glides back up to the top.
 *
 * It listens on window, after everything else has seen the click, so the
 * enquiry buttons, in-page anchors and the menus keep their own behaviour
 * (they call preventDefault). New tabs, downloads, other sites, phone, email
 * and WhatsApp links are left alone.
 */
export function FastNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const target = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noFast !== undefined) return null;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return null;
      if (/\.(pdf|png|jpe?g|webp|svg|zip|docx?|xlsx?)$/i.test(url.pathname)) return null;
      // same page, only the #hash differs: leave it to the in-page scroll
      if (url.pathname === location.pathname && url.search === location.search) return null;
      return url;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Home, from Home: no reload, glide back up to the top
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (a && a.target !== "_blank") {
        const to = new URL(a.href, location.href);
        if (to.origin === location.origin && to.pathname === "/" && !to.hash && location.pathname === "/") {
          e.preventDefault();
          const w = window as unknown as { __scroller?: { scrollTo: (y: number, o?: object) => void } };
          if (w.__scroller) w.__scroller.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      const url = target(e);
      if (!url) return;
      e.preventDefault();
      root.dataset.route = "leaving";
      root.dataset.routeHash = url.hash ? "1" : "";
      if (url.pathname === "/" && location.pathname !== "/") (window as unknown as { __kcHeroEnd?: boolean }).__kcHeroEnd = true;
      router.push(url.pathname + url.search + url.hash);
    };
    const seen = new Set<string>();
    const warm = (e: Event) => {
      const url = target(e);
      if (!url || seen.has(url.pathname)) return;
      seen.add(url.pathname);
      router.prefetch(url.pathname + url.search);
    };
    window.addEventListener("click", onClick);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      window.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, [router]);

  // a refresh or the back button opens a page at its top too
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // the new page is in: put it at its top (unless the link went to a #place, or it is Home reached
  // from another page: the hero puts that at its film's last frame), and fade it up
  const prev = useRef<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const from = prev.current;
    prev.current = pathname;
    if (pathname === "/" && from !== null && from !== "/") {
      // the back button to Home: the same as a link to it
      const w = window as unknown as { __kcHeroEnd?: boolean };
      w.__kcHeroEnd = true;
      window.dispatchEvent(new Event("hero:end"));
      delete root.dataset.routeHash;
      if (root.dataset.route === "leaving") {
        root.dataset.route = "arriving";
        const t = window.setTimeout(() => delete root.dataset.route, 450);
        return () => window.clearTimeout(t);
      }
      return;
    }
    const toTop = () => {
      const w = window as unknown as { __scroller?: { scrollTo: (y: number, o?: object) => void } };
      w.__scroller?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    if (!root.dataset.routeHash && !location.hash) {
      toTop();
      requestAnimationFrame(toTop);
      window.setTimeout(toTop, 150);
    }
    delete root.dataset.routeHash;
    if (root.dataset.route !== "leaving") return;
    root.dataset.route = "arriving";
    const t = window.setTimeout(() => delete root.dataset.route, 450);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
