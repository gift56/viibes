/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        cardShad: "0px 14px 34px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
