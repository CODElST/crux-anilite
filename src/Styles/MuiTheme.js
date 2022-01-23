import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#D65BF5",
      main: "#8B5CF6",
      background: "#222222",
      button: {
        background: "#8B5CF6",
        color: "#ffffff",
        hover: "#6C48C0",
      },
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Quicksand"],
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
      desktop: 1400,
    },
  },
});

export default darkTheme;
