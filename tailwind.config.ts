import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1340px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        blood: {
          100: "#ffd9dd",
          200: "#ffb0b8",
          300: "#ff7686",
          400: "#f83b52",
          500: "#dc143c",
          600: "#b30d2f",
          700: "#8a0a25",
          800: "#5e0619",
          900: "#37030e",
          950: "#1b0107",
        },
        ash: {
          100: "#e4e4e7",
          200: "#c3c3c8",
          300: "#9b9ba3",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#2a2a30",
          800: "#171719",
          900: "#0c0c0e",
          950: "#050506",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 6px)",
        sm: "calc(var(--radius) - 10px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(220,20,60,0.20), 0 18px 60px -22px rgba(220,20,60,0.55)",
        "glow-lg": "0 0 0 1px rgba(220,20,60,0.28), 0 36px 120px -30px rgba(220,20,60,0.7)",
      },
      backgroundImage: {
        "blood-gradient": "linear-gradient(135deg,#8a0a25 0%,#dc143c 50%,#ff3b52 100%)",
        veil: "radial-gradient(120% 90% at 50% 0%,rgba(220,20,60,0.14) 0%,rgba(5,5,6,0) 62%)",
      },
      keyframes: {
        "fog-drift": {
          "0%": { transform: "translate3d(-14%,0,0) scale(1.18)" },
          "50%": { transform: "translate3d(10%,-3%,0) scale(1.3)" },
          "100%": { transform: "translate3d(-14%,0,0) scale(1.18)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        flicker: {
          "0%,19%,21%,55%,57%,100%": { opacity: "1" },
          "20%,56%": { opacity: "0.42" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "fog-slow": "fog-drift 52s ease-in-out infinite",
        "fog-fast": "fog-drift 34s ease-in-out infinite reverse",
        "pulse-glow": "pulse-glow 4.5s ease-in-out infinite",
        flicker: "flicker 7s linear infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
