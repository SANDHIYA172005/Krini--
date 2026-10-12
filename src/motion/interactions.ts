import { finePointer, gsapReady, prefersReducedMotion, type Disposer } from "./env";
import type { Scroller } from "./smooth";

/**
 * The product menus in the top bar (1024px and up). A pointer opens them on
 * hover (CSS); the arrow button beside each line opens and closes its menu
 * for keyboard and touch; Esc, a click elsewhere or tabbing out closes it. A
 * product's side list opens to the right, or to the left where the screen
 * ends first.
 */
function initDrops(d: Disposer, nav: HTMLElement) {
  const drops = Array.from(nav.querySelectorAll<HTMLElement>("[data-drop]"));
  if (!drops.length) return;
  const setOpen = (drop: HTMLElement, open: boolean) => {
    drop.classList.toggle("is-open", open);
    drop.querySelector("[data-drop-toggle]")?.setAttribute("aria-expanded", String(open));
  };
  const closeAll = (except?: HTMLElement) => drops.forEach((x) => x !== except && x.classList.contains("is-open") && setOpen(x, false));
  // side lists: room on the right?
  const place = (drop: HTMLElement) => {
    const panel = drop.querySelector<HTMLElement>(".nav-panel");
    const fly = drop.querySelector<HTMLElement>(".nav-fly");
    if (!panel || !fly) return;
    const right = panel.getBoundingClientRect().right + fly.offsetWidth + 12;
    drop.classList.toggle("fly-left", right > document.documentElement.clientWidth);
  };
  drops.forEach((drop) => {
    const btn = drop.querySelector<HTMLButtonElement>("[data-drop-toggle]");
    d.on(drop, "pointerenter", () => {
      place(drop);
      closeAll(drop);
    });
    if (btn)
      d.on(btn, "click", () => {
        const open = !drop.classList.contains("is-open");
        closeAll(drop);
        if (open) place(drop);
        setOpen(drop, open);
        if (open) drop.querySelector<HTMLElement>(".nav-item")?.focus();
      });
    d.on(drop, "focusout", (e) => {
      const next = (e as FocusEvent).relatedTarget as Node | null;
      if (!next || !drop.contains(next)) setOpen(drop, false);
    });
    d.on(drop, "keydown", (e) => {
      if ((e as KeyboardEvent).key !== "Escape" || !drop.classList.contains("is-open")) return;
      setOpen(drop, false);
      btn?.focus();
    });
  });
  d.on(document, "click", (e) => {
    if (!(e.target as Element).closest?.("[data-drop]")) closeAll();
  });
  // a product link on this page: close the menu as the page scrolls there
  nav.querySelectorAll<HTMLAnchorElement>(".nav-panel a").forEach((a) =>
    d.on(a, "click", () => {
      closeAll();
      (document.activeElement as HTMLElement | null)?.blur();
    }),
  );
}

/**
 * Nav: transparent over the top of the page, solid once past it (the hero on
 * Home, the first screen elsewhere); draws the page's progress. The current
 * page is marked in the markup (Nav.tsx).
 */
export function initNav(d: Disposer, scroller: Scroller) {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!nav) return;
  const { ScrollTrigger } = gsapReady();
  const hero = document.querySelector<HTMLElement>("[data-hero]");

  const page = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => nav.style.setProperty("--page-p", self.progress.toFixed(4)),
  });
  d.add(() => page.kill());

  // transparent over the hero (or the first 40px of other pages), solid once past it
  const edge = () => (hero ? hero.offsetHeight - 80 : 40);
  const pastHero = () => window.scrollY > edge();
  const solid = ScrollTrigger.create({
    start: edge,
    end: "max",
    onToggle: (self) => nav.classList.toggle("is-solid", self.isActive),
  });
  d.add(() => solid.kill());

  initDrops(d, nav);

  // Mobile menu: a sheet from the top bar
  const toggle = nav.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;
  const menuLinks = Array.from(menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]"));
  const menuFolds = Array.from(menu.querySelectorAll<HTMLButtonElement>("[data-menu-acc]"));
  // each product line folds open to its products (one at a time)
  menuFolds.forEach((b) => {
    const list = document.getElementById(b.getAttribute("aria-controls") || "");
    if (!list) return;
    d.on(b, "click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      menuFolds.forEach((o) => {
        if (o === b) return;
        o.setAttribute("aria-expanded", "false");
        document.getElementById(o.getAttribute("aria-controls") || "")?.setAttribute("hidden", "");
        o.closest(".menu-line")?.classList.remove("is-open");
      });
      b.setAttribute("aria-expanded", String(open));
      list.toggleAttribute("hidden", !open);
      b.closest(".menu-line")?.classList.toggle("is-open", open);
    });
  });
  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    [...menuLinks, ...menuFolds].forEach((a) => (a.tabIndex = open ? 0 : -1));
    nav.classList.toggle("is-solid", open || pastHero());
    if (open) {
      scroller.stop();
      (menu.querySelector<HTMLElement>(".menu-tile.is-current") ?? menuLinks[0])?.focus({ preventScroll: true });
    } else scroller.start();
  };
  d.on(toggle, "click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menuLinks.forEach((a) => d.on(a, "click", () => setOpen(false)));
  const dim = menu.querySelector<HTMLElement>("[data-menu-dim]");
  if (dim) d.on(dim, "click", () => setOpen(false));
  d.on(document, "keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape" && menu.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  // the sheet only exists under 1024px: close it if the screen grows past that
  const wide = window.matchMedia("(min-width: 1024px)");
  d.on(wide, "change", () => {
    if (wide.matches && menu.classList.contains("is-open")) setOpen(false);
  });
}

/** Buttons lean toward the pointer. Desktop only. */
export function initMagnetic(d: Disposer) {
  if (!finePointer() || prefersReducedMotion()) return;
  const { gsap } = gsapReady();
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    d.on(el, "pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const pe = e as PointerEvent;
      xTo((pe.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((pe.clientY - (r.top + r.height / 2)) * 0.36);
    });
    d.on(el, "pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

/** A quiet ring cursor that grows over anything clickable. */
export function initCursor(d: Disposer) {
  const el = document.querySelector<HTMLElement>("[data-cursor]");
  if (!el || !finePointer() || prefersReducedMotion()) return;
  const { gsap } = gsapReady();
  const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
  d.on(window, "pointermove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    el.classList.add("is-visible");
    const t = e.target as HTMLElement;
    el.classList.toggle("is-hover", !!t.closest("a, button, select, label"));
  });
  d.on(document.documentElement, "pointerleave", () => el.classList.remove("is-visible"));
}

/**
 * Products: the sticky frame follows whichever product line is centred. The new
 * line's picture rolls up over the last one (which stays underneath, dimmed,
 * until it has been covered); the bars at the top mark the line in view.
 */
export function initProducts(d: Disposer) {
  const media = document.querySelector<HTMLElement>("[data-product-media]");
  const caption = document.querySelector<HTMLElement>("[data-product-caption]");
  if (!media) return;
  const { ScrollTrigger } = gsapReady();
  const imgs = Array.from(media.querySelectorAll("img"));
  const bars = Array.from(media.querySelectorAll<HTMLElement>("[data-product-step]"));
  let current = 0;
  document.querySelectorAll<HTMLElement>("[data-product]").forEach((article, i) => {
    const st = ScrollTrigger.create({
      trigger: article,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (!self.isActive || i === current) return;
        imgs.forEach((img, j) => {
          img.classList.toggle("was-active", j === current);
          img.classList.toggle("is-active", j === i);
        });
        current = i;
        bars.forEach((b, j) => b.classList.toggle("is-on", j === i));
        const title = article.querySelector("h3")?.textContent ?? "";
        const index = article.querySelector(".text-amber")?.textContent ?? "";
        if (caption) caption.textContent = `${index} / ${title}`;
      },
    });
    d.add(() => st.kill());
  });
}

/**
 * Services, private label: an oil line runs through the steps and fills as they
 * scroll past, lighting each step as it is reached (horizontal on large
 * screens, vertical below).
 */
export function initPipeline(d: Disposer) {
  const block = document.querySelector<HTMLElement>("[data-pipeline]");
  if (!block) return;
  const { gsap, ScrollTrigger } = gsapReady();
  const steps = Array.from(block.querySelectorAll<HTMLElement>("[data-step]"));
  const list = block.querySelector("ol") ?? block;
  const paint = (p: number) => {
    block.style.setProperty("--pipe-p", p.toFixed(4));
    steps.forEach((s) => s.classList.toggle("is-reached", p >= parseFloat(s.dataset.stepAt || "0") - 0.001));
  };
  if (prefersReducedMotion()) {
    paint(1);
    return;
  }
  paint(0);
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: list,
      start: "top 85%",
      end: "top 35%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });
  });
  mm.add("(max-width: 1023px)", () => {
    ScrollTrigger.create({
      trigger: list,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });
  });
  d.add(() => mm.revert());
}

/** Copy phone / email. Clipboard can be refused; then select the text instead. */
export function initCopy(d: Disposer) {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
    d.on(btn, "click", async () => {
      const text = btn.dataset.copy || "";
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
      } catch {
        const target = btn.parentElement?.querySelector<HTMLElement>("[data-copy-text]");
        if (target) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
        btn.textContent = "Selected";
      }
      window.setTimeout(() => (btn.textContent = original), 1800);
    });
  });
}

/** A 10-digit Indian mobile number from what was typed (spaces, dashes, +91 or a leading 0 allowed), or null. */
const mobile = (v: string) => {
  let n = v.replace(/\D/g, "");
  if (n.length === 12 && n.startsWith("91")) n = n.slice(2);
  else if (n.length === 11 && n.startsWith("0")) n = n.slice(1);
  return n.length === 10 ? n : null;
};

/**
 * One enquiry form (the pop-up's or the Contact page's): checks the three
 * fields, posts JSON to the form's endpoint when it has one, or writes the
 * enquiry out in WhatsApp. It never says a message was sent unless the
 * endpoint accepted it.
 */
type EnquiryMessages = {
  missing: { name: string; phone: string; message: string };
  sending: string;
  sent: string;
  offline: string;
  failed: string;
  whatsapp: string;
};

function wireEnquiryForm(d: Disposer, form: HTMLFormElement) {
  // the words come with the form (site.enquiry.status), so this bundle carries no copy
  let t: EnquiryMessages;
  try {
    t = JSON.parse(form.dataset.messages || "");
  } catch {
    return;
  }
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const setStatus = (msg: string, tone: "" | "ok" | "warn" = "") => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.tone = tone;
  };
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;

  const validate = () => {
    const missing: string[] = [];
    let first: HTMLInputElement | HTMLTextAreaElement | null = null;
    (["name", "phone", "message"] as const).forEach((name) => {
      const f = field(name);
      if (!f) return;
      const v = f.value.trim();
      const ok = name === "phone" ? mobile(v) !== null : v !== "";
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok) {
        missing.push(t.missing[name]);
        first ??= f;
      }
    });
    if (first) {
      setStatus(missing.join(" "), "warn");
      (first as HTMLElement).focus();
      return false;
    }
    return true;
  };
  // a field stops being marked as soon as it is filled in again
  d.on(form, "input", (e) => {
    const f = e.target as HTMLElement;
    if (f.getAttribute("aria-invalid") === "true") f.setAttribute("aria-invalid", "false");
  });

  d.on(form, "submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      setStatus(t.offline, "warn");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    data.phone = `+91 ${mobile(data.phone ?? "")}`;
    setStatus(t.sending);
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      delete form.dataset.prefill;
      setStatus(t.sent, "ok");
    } catch {
      setStatus(t.failed, "warn");
    }
  });

  // WhatsApp: the enquiry written out as a message, opened in WhatsApp (nothing is sent until the visitor sends it there)
  const wa = form.querySelector<HTMLButtonElement>("[data-whatsapp-send]");
  const waBase = form.dataset.whatsapp;
  if (wa && waBase) {
    d.on(wa, "click", () => {
      if (!validate()) return;
      const v = (name: string) => field(name)?.value.trim() ?? "";
      const text = `Hello Krini Crude,\n\n${v("message")}\n\nName: ${v("name")}\nContact Number: ${v("phone")}`;
      window.open(`${waBase}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      setStatus(t.whatsapp, "ok");
    });
  }
}

/**
 * Enquiries. Every "Enquire now" button (data-enquire) opens the pop-up with
 * the form; on the Contact page, which has the form itself, it scrolls there
 * instead. What the button is about (data-enquire, and data-product when it
 * names one) goes into the message, where the visitor can change it, and
 * travels with the enquiry as `type`. Links that arrive without JavaScript as
 * /contact?type=…&product=…#enquiry are read the same way.
 */
export function initEnquiry(d: Disposer, scroller: Scroller) {
  const forms = Array.from(document.querySelectorAll<HTMLFormElement>("[data-enquiry-form]"));
  forms.forEach((f) => wireEnquiryForm(d, f));
  const dialog = document.querySelector<HTMLDialogElement>("[data-enquire-dialog]");
  const pageForm = forms.find((f) => !f.closest("dialog")) ?? null;

  // what the button was about, as the first lines of the message (unless the visitor has written their own)
  const prefill = (form: HTMLFormElement, type?: string | null, product?: string | null) => {
    const kind = type || "Enquiry";
    const typeField = form.querySelector<HTMLInputElement>("[data-enquiry-type]");
    if (typeField) typeField.value = kind;
    const pageField = form.querySelector<HTMLInputElement>("[data-enquiry-page]");
    if (pageField) pageField.value = location.pathname;
    const msg = form.querySelector<HTMLTextAreaElement>("textarea[name=message]");
    if (!msg) return;
    if (msg.value.trim() === "" || msg.value === form.dataset.prefill) {
      const lines = [kind !== "Enquiry" ? kind : "", product ? `Product: ${product}` : ""].filter(Boolean);
      msg.value = lines.length ? `${lines.join("\n")}\n` : "";
      form.dataset.prefill = msg.value;
    }
  };
  // the first field still to fill in, cursor at the end
  const focusFirst = (form: HTMLFormElement) => {
    const f =
      Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]")).find((x) =>
        x.tagName === "TEXTAREA" ? x.value === form.dataset.prefill || !x.value.trim() : !x.value.trim(),
      ) ?? form.querySelector<HTMLInputElement>("input[required]");
    f?.focus({ preventScroll: true });
    if (f instanceof HTMLTextAreaElement) f.setSelectionRange(f.value.length, f.value.length);
  };

  if (pageForm) {
    const params = new URLSearchParams(location.search);
    if (params.has("type") || params.has("product")) prefill(pageForm, params.get("type"), params.get("product"));
  }

  // the pop-up
  let opener: HTMLElement | null = null;
  const open = (type?: string | null, product?: string | null) => {
    if (!dialog || dialog.open) return;
    const form = dialog.querySelector<HTMLFormElement>("[data-enquiry-form]");
    if (form) {
      prefill(form, type, product);
      const status = form.querySelector<HTMLElement>("[data-form-status]");
      if (status?.dataset.tone === "ok") status.textContent = "";
    }
    opener = document.activeElement as HTMLElement | null;
    scroller.stop();
    dialog.showModal();
    document.documentElement.classList.add("has-dialog");
    if (form) focusFirst(form);
  };
  if (dialog) {
    const close = () => dialog.open && dialog.close();
    d.on(dialog, "close", () => {
      document.documentElement.classList.remove("has-dialog");
      scroller.start();
      opener?.focus({ preventScroll: true });
    });
    dialog.querySelectorAll<HTMLElement>("[data-enquire-close]").forEach((b) => d.on(b, "click", close));
    // a click outside the panel (on the dimmed page) closes it
    d.on(dialog, "click", (e) => {
      const me = e as MouseEvent;
      if (me.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (me.clientX < r.left || me.clientX > r.right || me.clientY < r.top || me.clientY > r.bottom) close();
    });
  }

  // Product details pop-up modals
  document.querySelectorAll<HTMLDialogElement>(".pds-modal-dialog").forEach((pdsDialog) => {
    const closePds = () => {
      if (pdsDialog.open) pdsDialog.close();
    };
    d.on(pdsDialog, "close", () => {
      document.documentElement.classList.remove("has-dialog");
      scroller.start();
      opener?.focus({ preventScroll: true });
    });
    pdsDialog.querySelectorAll<HTMLElement>("[data-modal-close]").forEach((b) => d.on(b, "click", closePds));
    d.on(pdsDialog, "click", (e) => {
      const me = e as MouseEvent;
      if (me.target !== pdsDialog) return;
      const r = pdsDialog.getBoundingClientRect();
      if (me.clientX < r.left || me.clientX > r.right || me.clientY < r.top || me.clientY > r.bottom) closePds();
    });
  });

  d.on(document, "click", (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const pdsOpenBtn = target.closest<HTMLElement>("[data-pds-open]");
    if (pdsOpenBtn) {
      e.preventDefault();
      const targetId = pdsOpenBtn.dataset.pdsOpen;
      const pdsDialog = targetId ? (document.getElementById(targetId) as HTMLDialogElement | null) : null;
      if (pdsDialog && typeof pdsDialog.showModal === "function" && !pdsDialog.open) {
        opener = pdsOpenBtn;
        scroller.stop();
        pdsDialog.showModal();
        document.documentElement.classList.add("has-dialog");
      }
      return;
    }

    const closeBtn = target.closest<HTMLElement>("[data-modal-close]");
    if (closeBtn) {
      const parentDialog = closeBtn.closest<HTMLDialogElement>("dialog");
      if (parentDialog && parentDialog.open) {
        e.preventDefault();
        parentDialog.close();
      }
    }
  });

  document.querySelectorAll<HTMLElement>("[data-enquire]").forEach((el) => {
    if (el.closest("[data-enquiry-form]")) return;
    d.on(el, "click", (e) => {
      const type = el.dataset.enquire || "Enquiry";
      const product = el.dataset.product;
      const openDialog = el.closest<HTMLDialogElement>("dialog");
      if (openDialog && openDialog.open && openDialog !== dialog) {
        openDialog.close();
      }
      if (pageForm) {
        e.preventDefault();
        prefill(pageForm, type, product);
        scroller.scrollTo(pageForm);
        window.setTimeout(() => focusFirst(pageForm), 900);
      } else if (dialog && typeof dialog.showModal === "function") {
        e.preventDefault();
        open(type, product);
      }
    });
  });
}

/**
 * Blog and Products: show one topic (or product line) at a time. The buttons
 * only show once this runs (html.js); without it everything shows. The
 * group's data-noun names what is counted for screen readers ("guide" unless
 * set).
 */
export function initFilters(d: Disposer) {
  const group = document.querySelector<HTMLElement>("[data-filters]");
  const list = document.querySelector<HTMLElement>("[data-filter-list]");
  if (!group || !list) return;
  const { gsap, ScrollTrigger } = gsapReady();
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>("[data-filter]"));
  const items = Array.from(list.querySelectorAll<HTMLElement>("[data-category]"));
  const status = document.querySelector<HTMLElement>("[data-filter-status]");
  // a guide that comes back into the list shows at once, in its final state, whether or not it had made its entrance
  const settle = (it: HTMLElement) => {
    if (prefersReducedMotion()) return;
    gsap.killTweensOf(it);
    gsap.set(it, { opacity: 1, y: 0, filter: "none" });
    it.querySelectorAll<HTMLElement>("[data-shutter]").forEach((frame) => {
      const img = frame.querySelector("img");
      gsap.killTweensOf(img ? [frame, img] : frame);
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)", "--shade": 0 });
      if (img) gsap.set(img, { scale: 1 });
    });
  };
  const apply = (f: string) => {
    let shown = 0;
    items.forEach((it) => {
      const on = f === "all" || it.dataset.category === f;
      it.hidden = !on;
      if (on) {
        shown += 1;
        settle(it);
      }
    });
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    const noun = group.dataset.noun || "guide";
    const name = buttons.find((b) => b.dataset.filter === f)?.firstChild?.textContent?.trim() || f;
    if (status) status.textContent = `${shown} ${shown === 1 ? noun : `${noun}s`}${f === "all" ? "" : ` in ${name}`}`;
    ScrollTrigger.refresh();
  };
  buttons.forEach((b) => d.on(b, "click", () => apply(b.dataset.filter || "all")));
}
