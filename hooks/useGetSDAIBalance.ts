import { useEthers } from "@usedapp/core";
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
  const { library } = useEthers();
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
    try {
      const sDAIBalance = await sDAI.balanceOf({
        providerOrSigner: library?.getSigner() as ethers.Signer,
        account: account,
      });
      return sDAIBalance;
    } catch (e) {
      alert("Error getting sDAI balance");
    }
  };

  return getSDAIBalance;
};

export default useGetSDAIBalance;
