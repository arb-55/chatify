import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand color system
        brand: {
          bg: "#050608",
          surface: "#0B0E14",
          elevated: "#111620",
          border: "#242B37",
          "border-subtle": "#1A2030",
          blue: "#1677FF",
          "blue-bright": "#35A7FF",
          "blue-dim": "#1155CC",
          red: "#FF1744",
          "red-dim": "#CC1236",
          "text-primary": "#F5F7FA",
          "text-secondary": "#929BAA",
          "text-muted": "#4A5568",
        },
      },
      animation: {
        border: "border 4s linear infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    logs: false,
  },
};
