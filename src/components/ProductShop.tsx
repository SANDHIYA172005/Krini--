import { site } from "../content/site";
import { lines, type Line } from "../content/catalogue";
import type { ReactNode } from "react";
import { ShopClient, type ShopItem } from "./ShopClient";

/** One card per item a buyer can order: each named product in a range, or the product type itself where it has no named range. */
function itemsOf(line: Line): ShopItem[] {
  const base = { line: line.id, lineTitle: line.title, lineShort: line.short };
  return line.products.flatMap((p) =>
    p.range?.length
      ? p.range.map((r) => ({ key: `${p.id}-${r.name}`, name: r.name, type: p.name, text: r.text, grades: [], ...base }))
      : [{ key: p.id, name: p.name, type: line.short, text: p.about, grades: p.variants ?? [], ...base }],
  );
}

/** A WhatsApp chat to the sales number with the order already written. */
export const orderHref = (name: string, line: string) =>
  `${site.contact.whatsapp.split("?")[0]}?text=${encodeURIComponent(
    `Hi Krini Crude, I would like to order:\n• ${name} (${line})\nQuantity: \nDelivery location: `,
  )}`;

/** The WhatsApp mark for the Order now buttons. */
export function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/**
 * The Products page's shop: every product, from the catalogue, handed to
 * ShopClient (search, the lines as chips, Add to cart, and the cart that sends
 * the order on WhatsApp or by email).
 */
export function ProductShop({ top }: { top?: ReactNode }) {
  return (
    <ShopClient
      top={top}
      items={lines.flatMap(itemsOf)}
      lines={lines.map((l) => ({ id: l.id, title: l.title }))}
      whatsapp={site.contact.whatsapp}
      email={site.contact.email}
    />
  );
}
