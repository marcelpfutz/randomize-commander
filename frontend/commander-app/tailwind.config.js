import { heroui } from "@heroui/react";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          // ... outros tons, mas use #8B5CF6 para roxo principal
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        background: "#000000",  // Preto base
        // Adicione mais para dark mode
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: { primary: "#8B5CF6" },
      },
      dark: {
        colors: { primary: "#A78BFA", background: "#000000" },
      },
    },
  })],
};

export default config;
