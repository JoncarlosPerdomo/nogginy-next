import "../styles/globals.css";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { lightBlue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  background: {
    default: "#03a9f4",
    paper: "#4fc3f7",
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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
