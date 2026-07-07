/** @type {import('tailwindcss').Config} */
export default {
  // "class" strategy: dark mode is toggled by adding/removing a "dark"
  // class on <html>, controlled from context/ThemeContext.jsx
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Dark-mode surfaces - deep navy, not pure black, to keep it warm
        ink: "#0B1220",
        surface: "#121B2E",
        surface2: "#182544",
        // Light-mode surfaces - cool off-white, not stark white
        paper: "#F3F6FB",
        paperCard: "#FFFFFF",
        // Text
        graphite: "#1B2537",
        // Accents - drawn from monitoring/observability dashboards:
        // teal "signal" for healthy/active states, amber for highlights
        signal: {
          DEFAULT: "#2DD4BF",
          dark: "#14B8A6",
          light: "#99F6E9",
        },
        amber: {
          DEFAULT: "#F5A623",
          dark: "#C77D0A",
        },
      },
      fontFamily: {
        // Display face: geometric + technical, used for headings only
        display: ["Sora", "sans-serif"],
        // Body face: neutral, highly readable at small sizes
        sans: ["Inter", "sans-serif"],
        // Utility face: for metrics, timestamps, labels, code-like data
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.08)",
        softDark: "0 1px 2px rgba(0, 0, 0, 0.2), 0 8px 30px -4px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(45, 212, 191, 0.25), 0 0 24px rgba(45, 212, 191, 0.15)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
