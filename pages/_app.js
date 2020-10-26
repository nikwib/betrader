import useSWR, { SWRConfig } from "swr";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 30000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
