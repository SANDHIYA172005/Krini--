import { enquireHref, site } from "../content/site";
import { Arrow, Glyph } from "./ui";

/**
 * Phones only (under 640px): a bar held at the foot of the screen with the
 * three quickest ways to reach the team, Call, WhatsApp and Enquire now (the
 * pop-up). It slides up once the visitor has scrolled past the first screen,
 * and slides away over the closing band and the footer (which carry the same
 * three), while the menu or the pop-up is open, and while typing in a form.
 * Not on the Contact page, which is all about these. Without JavaScript it
 * stays hidden (the closing band has the same links).
 * Behaviour: src/motion/mobile.ts, initQuickBar.
 */
export function QuickBar() {
  const c = site.contact;
  return (
    <nav className="qbar" aria-label="Quick contact" data-qbar>
      <a href={c.phoneHref} className="qbar-btn">
        <Glyph name="call" size={20} />
        <span>Call</span>
      </a>
      <a href={c.whatsapp} className="qbar-btn" target="_blank" rel="noopener noreferrer">
        <Glyph name="chat" size={20} />
        <span>WhatsApp</span>
      </a>
      <a href={enquireHref("Enquiry")} className="qbar-cta" data-enquire="Enquiry">
        Enquire now <Arrow />
      </a>
    </nav>
  );
}
