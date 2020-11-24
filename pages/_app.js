import "../styles/globals.css";
import useSWR, { SWRConfig } from "swr";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Nav from "../src/components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <ThemeProvider theme={theme}>
           <Nav></Nav>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
