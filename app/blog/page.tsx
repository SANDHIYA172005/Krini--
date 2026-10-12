import { BlogPage } from "../../src/views/BlogPage";
import { seo } from "../../src/content/pages";
import { pageMetadata } from "../../src/seo/metadata";

export const metadata = pageMetadata(seo.blog);

export default function Page() {
  return <BlogPage />;
}
