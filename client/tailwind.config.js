/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        104: "26rem",
        112: "28rem",
        128: "32rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      height: {
        104: "26rem",
        128: "32rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      maxHeight: {
        128: "32rem",
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        totalblue: "#1C46F5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
