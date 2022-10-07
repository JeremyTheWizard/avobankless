import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { networkConfig } from "../helper-hardhat-config";
import useGetNetworkName from "./useGetNeworkName";
import useGetSF from "./useGetSF";

const useSDAIApprove = () => {
  /*
        1. get SF
        2. load sDAI
        3. approve sDAI 
    */

  /**
   * @dev sDAI must be already approved by the underlying token: fDAI
   */

  // resources
  const networkName = useGetNetworkName();
  const { library } = useEthers();
  const [sDAIApproveStatus, setSDAIApproveStatus] = useState("None");
  const getSF = useGetSF();

  const sDAIApprove = async (spender: string, amount: string) => {
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
    const approveOperation = sDAI.approve({
      receiver: spender,
      amount: amount,
    });

    if (library) {
      try {
        setSDAIApproveStatus("Pending Signature");
        const txnResponse = await approveOperation.exec(library.getSigner());
        setSDAIApproveStatus("Mining");
        await txnResponse.wait();
        setSDAIApproveStatus("Success");
      } catch (e) {
        setSDAIApproveStatus("Exception");
      }
    } else {
      alert("web3 provider not found");
    }
  };

  const resetSDAIApproveStatus = () => {
    setSDAIApproveStatus("None");
  };

  return { sDAIApprove, sDAIApproveStatus, resetSDAIApproveStatus };
};

export default useSDAIApprove;
