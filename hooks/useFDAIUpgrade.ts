import { useEthers } from "@usedapp/core";
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
  const { library } = useEthers();
  const [fDAIUpgradeStatus, setFDAIUpgradeStatus] = useState("None");
  const getSF = useGetSF();

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
    if (library) {
      try {
        setFDAIUpgradeStatus("Pending Signature");
        const txnResponse = await upgradeOperation.exec(library.getSigner());
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
