import { site } from "../content/site";
import { Arrow, Glyph } from "./ui";

/**
 * The enquiry form, word for word as on krinicrude.com: "Enquire Now", one
 * line, then Name, Contact Number and Message / Product Enquiry (all three
 * required) and "Submit Enquiry". The same form is the pop-up on every page
 * (EnquiryDialog) and the form on the Contact page; `id` keeps their fields
 * apart. Behaviour (validation, sending, WhatsApp, the pop-up) is in
 * src/motion/interactions.ts.
 *
 * It validates in the browser and posts JSON to NEXT_PUBLIC_ENQUIRY_ENDPOINT
 * when one is configured (any form backend or an API route). With no endpoint
 * it says how to reach the team directly and never claims a message was sent;
 * "Send on WhatsApp" opens WhatsApp with the enquiry written out. Enquire
 * buttons on other pages can name what they are about (data-enquire and
 * data-product): it goes into the message, where the visitor can change it.
 */
export function EnquiryForm({ id, endpoint = "", wide = false }: { id: string; endpoint?: string; wide?: boolean }) {
  const e = site.enquiry;
  const c = site.contact;
  const req = (
    <span className="enq-req" aria-hidden="true">
      *
    </span>
  );
  return (
    <form
      id={id}
      className={`enq-form${wide ? " enq-form-wide" : ""}`}
      noValidate
      data-enquiry-form
      data-endpoint={endpoint}
      data-whatsapp={c.whatsapp.split("?")[0]}
      data-messages={JSON.stringify(e.status)}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-lead`}
    >
      <h2 id={`${id}-title`} className="enq-title display-tight">
        {e.heading}
      </h2>
      <p id={`${id}-lead`} className="enq-lead">
        {e.lead}
      </p>

      <div className="enq-fields">
        <div className="field">
          <label className="label" htmlFor={`${id}-name`}>
            {e.name.label} {req}
          </label>
          <div className="input-wrap">
            <Glyph name="user" size={18} />
            <input className="input input-box" id={`${id}-name`} name="name" autoComplete="name" required placeholder={e.name.placeholder} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={`${id}-phone`}>
            {e.phone.label} {req}
          </label>
          <div className="input-wrap">
            <Glyph name="call" size={18} />
            <input
              className="input input-box"
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder={e.phone.placeholder}
              data-phone
            />
          </div>
        </div>
        <div className="field enq-field-message">
          <label className="label" htmlFor={`${id}-message`}>
            {e.message.label} {req}
          </label>
          <div className="input-wrap input-wrap-area">
            <Glyph name="note" size={18} />
            <textarea className="input input-box resize-y" id={`${id}-message`} name="message" required placeholder={e.message.placeholder} />
          </div>
        </div>
      </div>
      {/* what the button that opened the form was about, and the page it was on: sent along, not shown */}
      <input type="hidden" name="type" defaultValue="Enquiry" data-enquiry-type />
      <input type="hidden" name="page" defaultValue="" data-enquiry-page />

      <div className="enq-actions">
        <button type="submit" className="btn btn-primary enq-submit">
          {e.submit} <Arrow />
        </button>
        <button type="button" className="enq-wa" data-whatsapp-send>
          <Glyph name="chat" size={16} /> {e.whatsapp}
        </button>
      </div>
      <p className="enq-status" role="status" aria-live="polite" data-form-status />
    </form>
  );
}

/**
 * The pop-up: the enquiry form in a modal dialog, on every page but Contact
 * (which has the form itself). Every "Enquire now" button opens it
 * (data-enquire); without JavaScript those buttons go to the Contact page's
 * form instead. Esc, the close button or a click outside closes it.
 */
export function EnquiryDialog() {
  // read where the page is rendered (Next.js inlines NEXT_PUBLIC_ values at build)
  const endpoint = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT) || "";
  return (
    <dialog id="enquire" className="enq-dialog" aria-labelledby="enq-title" data-enquire-dialog data-lenis-prevent>
      <button type="button" className="enq-close" aria-label={site.enquiry.close} data-enquire-close>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      <EnquiryForm id="enq" endpoint={endpoint} />
    </dialog>
  );
}
