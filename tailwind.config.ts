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
        primary: "#695DFD",
        primaryDark: "#0C0D45",
        secondary: "#EEF1FF",
        secondaryDark: "#1F204F",
        tertiary: "#99F22B",
        fourth: "#675DF4",
        
        
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
export default config;
