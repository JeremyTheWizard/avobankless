import { DEFAULT_SUPPORTED_CHAINS, useEthers } from "@usedapp/core";

const useGetNetworkName = (): string | undefined => {
  const { chainId } = useEthers();
  const networkName =
    DEFAULT_SUPPORTED_CHAINS.find(
      (network) => network.chainId === chainId
    )?.chainName?.toLocaleLowerCase() ?? undefined;
  return networkName;
};

export default useGetNetworkName;
