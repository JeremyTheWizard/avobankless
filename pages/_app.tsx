import type { AppProps } from "next/app";
import { Head } from "next/document";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <title>Avobankless</title>
    <meta name="description" content="The decentralized credit bureau for the unbanked inclusive, secure and private." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta name="theme-color" content="#000000" />
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
