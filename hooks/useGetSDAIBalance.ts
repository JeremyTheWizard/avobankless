import { ethers } from "ethers";
import { networkConfig } from "../helper-hardhat-config";
import useGetNetworkName from "./useGetNeworkName";
import useGetSF from "./useGetSF";

const useGetSDAIBalance = () => {
  /* 
    1. get SF
    2. load sDAI
    3. get sDAI balance of @param address
    */

  // resources
  const networkName = useGetNetworkName();
  let provider: ethers.providers.Web3Provider | undefined;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
  }
  const signer = provider?.getSigner();
  const getSF = useGetSF();

  const getSDAIBalance = async (account: string) => {
    //1.
    const sf = await getSF();

    //2.
    if (!sf) {
      return;
    }
    const sDAI = await sf.loadSuperToken(
      networkConfig[networkName ?? ""].sDAI ?? ""
    );

    //3.
    if (!signer) {
      return;
    }
    try {
      const sDAIBalance = await sDAI.balanceOf({
        providerOrSigner: signer,
        account: account,
      });
      return sDAIBalance;
    } catch (e) {}
  };

  return getSDAIBalance;
};

export default useGetSDAIBalance;
