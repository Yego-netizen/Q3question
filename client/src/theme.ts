import { createTheme } from "@mui/material/styles";
import Pixel from "./assets/font/PressStart2P-vaV7.ttf";

const theme = createTheme({
 palette: {
  background: {
    default: "#EEF7FF",
    paper: "#FFFFFF",
  },
  primary: {
    main: "#3B82F6",
  },
  secondary: {
    main: "#F97316",
  },
  success: {
    main: "#22C55E",
  },
  error: {
    main: "#EF4444",
  },
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
  },
},
  typography: {
    fontFamily: "'Pixel', Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pixel';
          src: url(${Pixel}) format('truetype');
          font-weight: 400;
          font-style: normal;
        }
      `,
    },
  },
});

export default theme;
