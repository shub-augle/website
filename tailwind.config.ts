import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#E8E4D9",
        surface: "#F4F1EB",
        dark: "#1E1C1A",
        terracotta: "#C15F3C",
        border: "#C8C4BA",
        muted: "#B0ADA5",
        body: "#5A5550",
        "dark-border": "#49443F",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-libre-baskerville)", "Libre Baskerville", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
        sans: ["var(--font-ibm-plex-sans)", "IBM Plex Sans", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
