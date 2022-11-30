import { ThemeProvider } from "@mui/material/styles";
import {
  AvatarComponent,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import Image from "next/image";

import { Config, DAppProvider, Goerli } from "@usedapp/core";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/navbar/Navbar";
import NavbarApp from "../components/navbar/NavbarApp";
import { MaterialTheme } from "../MaterialTheme";
import { store } from "../store/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentRoute = router.pathname;

  const config: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      [Goerli.chainId]: process.env.NEXT_PUBLIC_ETH_NODE_URI_GOERLI ?? "",
    },
  };

  const { chains, provider, webSocketProvider } = configureChains(
    [
      chain.goerli,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
        ? [chain.goerli]
        : []),
    ],
    [
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      }),
      infuraProvider({
        apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
      }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });

  const RainbowKitTheme = lightTheme({
    accentColor: "#014E1C",
    accentColorForeground: "white",
    borderRadius: "medium",
  });

  const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    const color = "#fff";
    return ensImage ? (
      <Image
        src={ensImage}
        width={size}
        height={size}
        style={{ borderRadius: 999 }}
        alt="ens"
      />
    ) : (
      <Image
        src="/avobankless-pet-circle.png"
        width={size}
        height={size}
        style={{ borderRadius: 999 }}
        alt="avobankless pet logo"
      />
    );
  };

  return (
    <ThemeProvider theme={MaterialTheme}>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <DAppProvider config={config}>
            <RainbowKitProvider
              chains={chains}
              theme={RainbowKitTheme}
              avatar={CustomAvatar}
            >
              <div className="bg-body min-h-screen">
                <div className="w-[95vw] max-w-[1536px] mx-auto pb-24 prose sm:prose-sm md:prose-base lg:prose-xl">
                  {currentRoute === "/" ? <Navbar /> : <NavbarApp />}
                  <Component {...pageProps} />
                  <footer></footer>
                </div>
              </div>
            </RainbowKitProvider>
          </DAppProvider>
        </WagmiConfig>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
