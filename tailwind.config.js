/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#__next",
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
        almostBlack: "#110F2D",
        darkishRed: "#D75E22",
      },
      fontSize: {
        "display-1": ["5rem", { lineHeight: 1.2, fontWeight: 400 }],
        "display-2": ["4.5rem", { lineHeight: 1.2, fontWeight: 400 }],
        "display-3": ["3.5rem", { lineHeight: 1.2, fontWeight: 400 }],
        "display-4": ["3rem", { lineHeight: 1.2, fontWeight: 400 }],
        "display-5": ["2.25rem", { lineHeight: "2.5rem", fontWeight: 400 }],
        "display-6": ["1.875rem", { lineHeight: "2.25rem", fontWeight: 400 }],
        "display-7": ["1.5rem", { lineHeight: "2rem", fontWeight: 400 }],
        "display-8": ["1.25rem", { lineHeight: "1.75rem", fontWeight: 400 }],
        "body-1": ["1.25rem", { lineHeight: "1.75rem", fontWeight: 400 }],
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
      spacing: {
        xs: "0.5rem",
        sm: "1.5rem",
        md: "3rem",
        lg: "6rem",
        xl: "12rem",
        "2xl": "20rem",
      },
    },

    boxShadow: {
      equal: "0px 0px 10px rgba(0,0,0,0.25)",
    },

    plugins: [],
    corePlugins: {
      preflight: false,
    },
  },
};
