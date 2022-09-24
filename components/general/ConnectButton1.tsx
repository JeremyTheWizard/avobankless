import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import ScoreButton from "../navbar/buttons/ScoreButton";

export const ConnectButton1 = () => {
  const { address } = useAccount();
  const { activateBrowserWallet, deactivate } = useEthers();

  useEffect(() => {
    if (address) {
      activateBrowserWallet();
    }
  }, [address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <ScoreButton
                    text="Connect Wallet"
                    onClick={openConnectModal}
                  />
                );
              }
              if (chain.unsupported) {
                return (
                  <ScoreButton
                    onClick={openChainModal}
                    type="button"
                    text="Wrong network"
                    twProps={"!bg-gradient-to-r from-red-600 to-red-600"}
                  />
                );
              }
              return (
                <ScoreButton onClick={openAccountModal}>
                  {account.displayName}
                </ScoreButton>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
