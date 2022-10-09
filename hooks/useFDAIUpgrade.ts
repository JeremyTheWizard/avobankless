import { ethers } from "ethers";
import { useState } from "react";
import { networkConfig } from "../helper-hardhat-config";
import useGetNetworkName from "./useGetNeworkName";
import useGetSF from "./useGetSF";

const useFDAIUpgrade = () => {
  /*
        1. get SF
        2. load sDAI
        3. upgrade fDAI
    */

  /**
   * @dev sDAI must be already approved by the underlying token: fDAI
   */

  // resources
  const networkName = useGetNetworkName();
  const [fDAIUpgradeStatus, setFDAIUpgradeStatus] = useState("None");
  const getSF = useGetSF();
  let provider: ethers.providers.Web3Provider | undefined;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
  }
  const signer = provider?.getSigner();

  const fDAIUpgrade = async (amount: string) => {
    //1.
    const sf = await getSF();

    //2.

    if (!sf) {
      return;
    }

    const sDAI = await sf.loadWrapperSuperToken(
      networkConfig[networkName ?? ""].sDAI ?? ""
    );

    //3.
    const upgradeOperation = sDAI.upgrade({
      amount: amount,
    });
    if (signer) {
      try {
        setFDAIUpgradeStatus("Pending Signature");
        const txnResponse = await upgradeOperation.exec(signer);
        setFDAIUpgradeStatus("Mining");
        await txnResponse.wait();
        setFDAIUpgradeStatus("Success");
      } catch (e) {
        setFDAIUpgradeStatus("Exception");
      }
    } else {
      alert("web3 provider not found");
    }
  };

  const resetFDAIUpgradeStatus = () => {
    setFDAIUpgradeStatus("None");
  };

  return { fDAIUpgrade, fDAIUpgradeStatus, resetFDAIUpgradeStatus };
};

export default useFDAIUpgrade;
