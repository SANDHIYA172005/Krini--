"use client";

import { useEffect } from "react";
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
 * Links to Home (the Home link, the logo) open Home on the hero's last screen
 * ("Engineered for performance", the buttons) rather than at the start of the
 * film: scrollhero.ts reads the flag set here; on Home itself the page just
 * goes there. Only a refresh or a fresh visit starts the film from the top.
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
      // Home, from Home: no reload, straight to the hero's last screen
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (a && a.target !== "_blank") {
        const to = new URL(a.href, location.href);
        if (to.origin === location.origin && to.pathname === "/" && !to.hash) {
          if (location.pathname === "/") {
            e.preventDefault();
            window.dispatchEvent(new Event("hero:end"));
            return;
          }
          (window as unknown as { __kcHeroEnd?: boolean }).__kcHeroEnd = true;
        }
      }
      const url = target(e);
      if (!url) return;
      e.preventDefault();
      root.dataset.route = "leaving";
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

  // the new page is in: fade it up
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.route !== "leaving") return;
    root.dataset.route = "arriving";
    const t = window.setTimeout(() => delete root.dataset.route, 450);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
