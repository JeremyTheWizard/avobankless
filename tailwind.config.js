/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mulish: ["Mulish", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        darkGreen: "#014E1C",
        lightGreen: "#E6FFBE",
        almostWhite: "#FDFFFB",
        almostDark: "#110F2D",
        red: "#D75E22",
      },
      fontSize: {
        "display-1": ["8rem", { lineHeight: 1, fontWeight: 400 }],
        "display-2": ["6rem", { lineHeight: 1, fontWeight: 400 }],
        "display-3": ["4.75rem", { lineHeight: 1, fontWeight: 400 }],
        "display-4": ["4.5rem", { lineHeight: 1, fontWeight: 400 }],
        "display-5": ["4rem", { lineHeight: "123%", fontWeight: 400 }],
        "display-6": ["2rem", { lineHeight: "123%", fontWeight: 400 }],
        "display-7": ["1.875rem", { lineHeight: "2.25rem", fontWeight: 300 }],
        "display-8": ["1.5rem", { lineHeight: "2rem", fontWeight: 300 }],
        "display-9": ["1.25rem", { lineHeight: "1.75rem", fontWeight: 400 }],
        "body-1": ["1.5rem", { lineHeight: "1.75rem", fontWeight: 400 }],
        body: ["1.rem", { lineHeight: "1.5rem", fontWeight: 400 }],
      },
      backgroundImage: {
        body: "linear-gradient(106.56deg, #D8FCE5 -20.93%, #FFFFFF 31.18%, #FFFFFF 88.98%, #D8FCE5 135.39%)",
        object: "linear-gradient(90deg, #014E1C 2.7%, #4EE142 96.96%)",
      },
      borderRadius: {
        100: "100px",
      },
      padding: {
        18: "18px",
      },
    },
    plugins: [],
  },
};
