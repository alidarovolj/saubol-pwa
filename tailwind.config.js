/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#0043E8",
        bColor: "#9A9BA4",
        regText: "#02051C"
      },
      width: {
        fifth: "19%",
        third: "32%",
        half: "49.5%",
        fourth: "24%",
        seventh: "14%"
      },
      fontSize: {
        "2xs": "0.6rem"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    logs: false,
  },
}

