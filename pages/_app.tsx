import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import { store } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <div className="h-screen bg-body">
          <div className="w-[90vw] max-w-[1536px] mx-auto pb-24 md:text-body-1">
            <Navbar />
            <Component {...pageProps} />
            <footer></footer>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
