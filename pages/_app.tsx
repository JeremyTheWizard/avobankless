import { ThemeProvider } from "@mui/material/styles";
import {
  AvatarComponent,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { Chain, Config, DAppProvider, Goerli } from "@usedapp/core";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Navbar from "../components/navbar/Navbar";
import NavbarApp from "../components/navbar/NavbarApp";
import { MaterialTheme } from "../MaterialTheme";
import { store } from "../store/store";

import { getDefaultProvider } from "ethers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentRoute = router.pathname;

  const ArbitrumGoereli: Chain = {
    chainId: 421613,
    chainName: "Arbitrum Nitro",
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: "0xF0B2fe7A6981427C586764Cc52583AdB4aBAB3A3",
    rpcUrl: "https://goerli-rollup.arbitrum.io/rpc/",
    blockExplorerUrl: "https://goerli-rollup-explorer.arbitrum.io",
    getExplorerAddressLink(address: string) {
      return `https://goerli-rollup-explorer.arbitrum.io/address/${address}`;
    },
    getExplorerTransactionLink(transactionHash: string) {
      return `https://goerli-rollup-explorer.arbitrum.io/tx/${transactionHash}`;
    },
  };

  const config: Config = {
    // readOnlyChainId: ArbitrumGoereli.chainId,
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      // [Hardhat.chainId]: "http://127.0.0.1:8545",
      // [ArbitrumRinkeby.chainId]: "https://rinkeby.arbitrum.io/rpc",
      [Goerli.chainId]: getDefaultProvider("goerli"),
    },
  };

  const { chains, provider, webSocketProvider } = configureChains(
    [
      // chain.arbitrumGoerli,
      // chain.arbitrumRinkeby,
      chain.goerli,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
        ? [chain.goerli]
        : []),
    ],
    [
      alchemyProvider({
        // This is Alchemy's default API key.
        // You can get your own at https://dashboard.alchemyapi.io
        apiKey: "aCqen3L7WkFxk3q30VBgAiuS03nEAbx4",
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
        alt="ens"
      />
    ) : (
      <img
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
              <div className=" bg-body overflow-hidden">
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
function infuraProvider(arg0: {
  apiKey: string | undefined;
}): import("wagmi").ChainProviderFn<
  import("@wagmi/core").Provider,
  import("@wagmi/core").WebSocketProvider,
  import("wagmi").Chain
> {
  throw new Error("Function not implemented.");
}
