import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import ScoreButton from "../navbar/buttons/ScoreButton";

export const ConnectButton1 = () => {
  const { openAccountModal } = useAccountModal();
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
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
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
