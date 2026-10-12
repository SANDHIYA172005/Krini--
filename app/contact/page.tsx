import { ContactPage } from "../../src/views/ContactPage";
import { seo } from "../../src/content/pages";
import { pageMetadata } from "../../src/seo/metadata";

export const metadata = pageMetadata(seo.contact);

export default function Page() {
  // any form backend or API route that accepts a JSON POST; without one, the form tells visitors how to call or email
  return <ContactPage endpoint={process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? ""} />;
}
