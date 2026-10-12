import type { ReactNode } from "react";
import type { PageId } from "../content/site";
import type { Line } from "../content/catalogue";
import { graph } from "../content/schema";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MotionRuntime } from "./MotionRuntime";
import { EnquiryDialog } from "./Enquiry";
import { QuickBar } from "./QuickBar";
import { JsonLd } from "./ui";

/**
 * Every page: the top bar and menu (with this page marked), the page, the
 * footer (`footer={false}` leaves it out: the Contact page ends with its form
 * and addresses), the "Enquire Now" pop-up and, on phones, the quick-contact
 * bar (neither on Contact, which has the form itself) and the cursor, and the page's structured data (the company,
 * the site, then `schema`). Server-rendered; behaviour is attached by src/motion.
 */
export function Shell({
  current,
  line,
  schema,
  footer = true,
  children,
}: {
  current?: PageId;
  /** On a product line's page: that line, marked in the menu. */
  line?: Line["id"];
  schema: Record<string, unknown>[];
  footer?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Nav current={current} line={line} />
      <main id="main">{children}</main>
      {footer && <Footer current={current} />}
      {current !== "contact" && <QuickBar />}
      {current !== "contact" && <EnquiryDialog />}
      <div className="cursor" aria-hidden="true" data-cursor />
      <JsonLd data={graph(schema)} />
      <MotionRuntime />
    </>
  );
}
