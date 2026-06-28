import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: "#00FFD1",
        secondary: "#FF6B6B",
        card: "#0D0D0D",
        muted: "#888888",
        accent1: "#659287",
        accent2: "#88BDA4",
        accent3: "#B1D3B9",
        accent4: "#E6F2DD",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 209, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 209, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
