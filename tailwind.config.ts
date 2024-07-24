import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1440px",
      }
    },
    extend: {
      colors: {
        primary: "#00809E",
        secondary: "#FF9773",
        base: "#5C5C5C"
      }
    },
  },
  plugins: [],
};
export default config;
