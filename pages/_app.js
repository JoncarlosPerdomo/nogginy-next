import "../styles/globals.css";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { lightBlue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuAppBar from "../components/MenuAppBar.js";
const theme = createTheme({
  palette: {
    background: {
      default: "#29B6F6",
      paper: "#4fc3f7",
    },
    primary: {
      main: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Catamaran",
    fontWeightLight: 400,
    fontWeightRegular: 700,
    fontWeightMedium: 800,
    fontWeightBold: 900,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <MenuAppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
