import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "../src/content/site";
import "./globals.css";
// the white-and-gold design layer (type scale, buttons, nav, footer, blog board, photo frames), over globals.css
import "./theme.css";
// after the stylesheets, so the loading screen's styles come later in the cascade
import { Preloader } from "../src/components/preloader/Preloader";
import { FastNav } from "../src/components/FastNav";

/** The one typeface for the whole site. theme.css points the old sans and mono names at it too. */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

/** Defaults for every page; each page sets its own title, description, canonical address and share card (src/seo/metadata.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
  // the LUBECON logo's icon (the oil drop over the formwork corner)
  icons: { icon: [{ url: "/logo-icon.png", type: "image/png", sizes: "192x192" }], apple: "/apple-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={display.variable}>
      <body>
        {/* first, so the loading screen is up before the rest of the page arrives */}
        <Preloader />
        {children}
        <FastNav />
      </body>
    </html>
  );
}
