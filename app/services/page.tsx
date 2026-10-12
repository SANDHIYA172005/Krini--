import { ServicesPage } from "../../src/views/ServicesPage";
import { seo } from "../../src/content/pages";
import { pageMetadata } from "../../src/seo/metadata";

export const metadata = pageMetadata(seo.services);

export default function Page() {
  return <ServicesPage />;
}
