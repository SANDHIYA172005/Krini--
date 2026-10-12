import type { Metadata } from "next";
import { NotFoundPage } from "../src/views/NotFoundPage";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Krini Crude" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
