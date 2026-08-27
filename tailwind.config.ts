import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#356747",
          "green-dark": "#2A5238",
          "green-deep": "#1E3D29",
          gold: "#F1E564",
          "gold-dark": "#D9CB3A",
          ink: "#1F2933",
          soft: "#F7F8F5",
          line: "#E5E7EB",
          muted: "#667085",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(31,41,51,0.06), 0 1px 2px rgba(31,41,51,0.04)",
        lift: "0 8px 24px rgba(31,41,51,0.10)",
      },
      maxWidth: {
        "7xl": "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
