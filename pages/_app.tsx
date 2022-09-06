import type { AppProps } from "next/app";
import { Head } from "next/document";
import { Navbar } from "../components/navbar/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <title>Avobankless</title>
    <meta name="description" content="The decentralized credit bureau for the unbanked inclusive, secure and private." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta name="theme-color" content="#000000" />
  </Head>;
  return <><div className="h-screen bg-body"><div className="max-w-[1440px] px-lg flex flex-col mx-auto"><Navbar /><Component {...pageProps} /></div></div></>;
}

export default MyApp;
