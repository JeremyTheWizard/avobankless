import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import {
  AvatarComponent,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/navbar/Navbar";
import { MaterialTheme } from "../MaterialTheme";
import { store } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider, webSocketProvider } = configureChains(
    [
      chain.mainnet,
      chain.polygon,
      chain.optimism,
      chain.arbitrum,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
        ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
        : []),
    ],
    [
      alchemyProvider({
        // This is Alchemy's default API key.
        // You can get your own at https://dashboard.alchemyapi.io
        apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
      <img
        src={ensImage}
        width={size}
        height={size}
        style={{ borderRadius: 999 }}
      />
    ) : (
      <img
        src="/avobankless-pet-circle.png"
        width={size}
        height={size}
        style={{ borderRadius: 999 }}
      />
    );
  };

  return (
    <ThemeProvider theme={MaterialTheme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              theme={RainbowKitTheme}
              avatar={CustomAvatar}
            >
              <div className="h-screen bg-body">
                <div className="w-[90vw] max-w-[1536px] mx-auto pb-24 md:text-body-1">
                  <Navbar />
                  <Component {...pageProps} />
                  <footer></footer>
                </div>
              </div>
            </RainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default MyApp;
