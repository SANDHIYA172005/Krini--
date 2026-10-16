import type { Config } from "tailwindcss";

/**
 * Design tokens. Colours are defined once as CSS variables in globals.css
 * and exposed here so utilities and hand-written CSS always agree.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        deep: "rgb(var(--c-deep) / <alpha-value>)",
        graphite: "rgb(var(--c-graphite) / <alpha-value>)",
        plate: "rgb(var(--c-plate) / <alpha-value>)",
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        mute: "rgb(var(--c-mute) / <alpha-value>)",
        amber: "rgb(var(--c-amber) / <alpha-value>)",
        line: "rgb(var(--c-bone) / 0.12)",
      },
      // One typeface for the whole site: Archivo (app/layout.tsx). The other names point to it.
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-display)", "Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-display)", "Archivo", "Helvetica Neue", "Arial", "sans-serif"],
      },
      // Three sizes only (app/theme.css): headings (h), sub-headings (sub), paragraphs and everything else (p).
      fontSize: {
        h: ["var(--fs-h)", { lineHeight: "1.08" }],
        sub: ["var(--fs-sub)", { lineHeight: "1.3" }],
        p: ["var(--fs-p)", { lineHeight: "1.65" }],
        xs: ["var(--fs-p)", { lineHeight: "1.6" }],
        sm: ["var(--fs-p)", { lineHeight: "1.6" }],
        base: ["var(--fs-p)", { lineHeight: "1.65" }],
        lg: ["var(--fs-sub)", { lineHeight: "1.4" }],
        xl: ["var(--fs-sub)", { lineHeight: "1.35" }],
        "2xl": ["var(--fs-sub)", { lineHeight: "1.3" }],
        label: ["var(--fs-p)", { lineHeight: "1.3", letterSpacing: "0.06em" }],
        "display-sm": ["var(--fs-h)", { lineHeight: "1.05" }],
        "display-wide": ["var(--fs-h)", { lineHeight: "1.05" }],
        "display-md": ["var(--fs-h)", { lineHeight: "1.05" }],
        "display-lg": ["var(--fs-h)", { lineHeight: "1.05" }],
      },
      maxWidth: {
        frame: "1600px",
        measure: "36rem",
      },
      transitionTimingFunction: {
        film: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
