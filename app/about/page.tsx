import { AboutPage } from "../../src/views/AboutPage";
import { seo } from "../../src/content/pages";
import { pageMetadata } from "../../src/seo/metadata";

export const metadata = pageMetadata(seo.about);

export default function Page() {
  return <AboutPage />;
}
