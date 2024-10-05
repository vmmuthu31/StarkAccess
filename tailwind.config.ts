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
        background: "var(--background)",
        foreground: "var(--foreground)",
        customStart: "#81AFF5",
        customEnd: "#378AF2"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-bg': "url('/app/Assets/BgImg.webp')",
        'custom-bg2': "url('/app/Assets/BgImg2.webp')",
        'custom-bg3': "url('/app/Assets/BgImg3.webp')"
      },
    },
  },
  plugins: [],
};
export default config;
