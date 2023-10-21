import type { Config } from 'tailwindcss'
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  theme: {
    colors: {
      blue: "#0167FF",
      rose: "#FB55A5",
      black: "#000000",
      white: "#FFFFFF",
      current: "currentColor",
      transparent: "transparent",
    },

    fontSize: {
      xs: ["12px", "14px"],
      sm: ["14px", "16px"],
      md: ["16px", "18px"],
      lg: ["18px", "20px"],
      xl: ["20px", "22px"],
      "2xl": ["22px", "24px"],
      "3xl": ["32px", "34px"],
      "4xl": ["68px", "70px"],
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "950px",
        md: "970px",
        lg: "970px",
        xl: "1000px",
        "2xl": "1000px",
      }
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      }
    }
  },

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  plugins: [],
}
export default config
