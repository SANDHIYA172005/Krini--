import { ProcessPage } from "../../src/views/ProcessPage";
import { seo } from "../../src/content/pages";
import { pageMetadata } from "../../src/seo/metadata";

export const metadata = pageMetadata(seo.process);

export default function Page() {
  return <ProcessPage />;
}
