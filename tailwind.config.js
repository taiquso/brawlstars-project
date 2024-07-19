/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#161616",
        secondaryDark: "rgba(30,30,30,1)",
        greyText: "#bbb",
        epic: "#d850ff",
        legendary: "#fff11e",
        mythic: "#fe5e72",
        superRare: "#5ab3ff",
        rare: "#68fd58",
        shelly: "#b9eaff",
        starPower: "#ffc107",
        gadget: "#0DFF0D",
      },
    },
  },
  plugins: [],
};
