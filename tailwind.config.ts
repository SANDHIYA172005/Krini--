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
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "Arial Narrow", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "display-sm": ["clamp(min(2.25rem, 8.8vw), 6vw, 4.5rem)", { lineHeight: "0.95" }],
        "display-wide": ["clamp(min(2.1rem, 8.6vw), 4.7vw, 4.25rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(min(2.1rem, 9.2vw), 7.4vw, 6.25rem)", { lineHeight: "0.9" }],
        "display-lg": ["clamp(3.25rem, 13vw, 13rem)", { lineHeight: "0.84" }],
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
