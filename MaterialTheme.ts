import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobileL: true;
    mobileM: true;
    mobileS: true;
    tabletS: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#014E1C",
      contrastText: "#000000",
    },
    secondary: {
      main: "#E6FFBE",
    },
    background: {
      default: "#FDFFFB",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: ["Mulish", "Poppins"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      mobileS: 320,
      mobileM: 375,
      mobileL: 425,
      tabletS: 520,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        filledError: {
          backgroundColor: "#991b1b",
        },
      },
    },
  },
});

export const MaterialTheme = responsiveFontSizes(theme, {
  breakpoints: [
    "xs",
    "mobileS",
    "mobileM",
    "mobileL",
    "tabletS",
    "sm",
    "md",
    "lg",
    "xl",
  ],
  factor: 4,
});
