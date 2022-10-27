import { createTheme } from "@mui/material/styles";

export const MainTheme = createTheme({
  palette: {
    primary: {
      main: "#087454",
      dark: "#054632",
      light: "#e6f1ee",
    },
    grey: {
      main: "#343a40",
      light: "#f8f9fa",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Lato, sans-serif",
    },
    logo: {
      fontFamily: "Lato, sans-serif",
      fontSize: "30px",
      fontWeight: 700,
    },
  },
  spacing: [2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160],
});
