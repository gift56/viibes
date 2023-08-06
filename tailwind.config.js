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
        paginationShad: "0px 48px 56px -25px rgba(100, 112, 122, 0.15)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
