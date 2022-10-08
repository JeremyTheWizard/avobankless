import { Framework } from "@superfluid-finance/sdk-core";
import { useEthers } from "@usedapp/core";
import { supportedChainsIds } from "../helper-hardhat-config";

const useGetSF = () => {
  const { library, chainId } = useEthers();

  const getSF = async () => {
    if (!library) {
      alert("Library not found");
      return;
    }

    if (supportedChainsIds.includes(chainId ?? 0)) {
      return Framework.create({
        chainId: chainId ?? 5, // defaults to goerli
        provider: library,
      });
    }
  };

  return getSF;
};

export default useGetSF;
