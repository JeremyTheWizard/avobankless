import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { useState } from "react";
import deployments from "../deployments.json";
import { networkConfig } from "../helper-hardhat-config";
import useGetNetworkName from "./useGetNeworkName";
import useGetSF from "./useGetSF";

const useCreateFlow = () => {
  /*
   * 1. Get SF
   * 2. Get parameters to create flow: sender, receiver, superToken, flowRate, userData
   * 3. Create flow
   */

  /**
     @dev the receiver address must already be approved for the super token
   */

  // resources
  const networkName = useGetNetworkName();
  const [createFlowStatus, setCreateFlowStatus] = useState("None");

  let provider: ethers.providers.Web3Provider | undefined;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
  }
  const signer = provider?.getSigner();

  // 1.
  const getSF = useGetSF();

  // 2.
  const { account } = useEthers();

  const sender = account;
  const receiver = deployments.contracts.SuperfluidCallbacks.address;
  const superToken = networkConfig[networkName ?? ""]?.sDAI ?? undefined;

  const createFlow = async (flowRate: string, loanAmount: string) => {
    const abi = defaultAbiCoder;
    const userData = abi.encode(["address", "uint128"], [account, loanAmount]);
    const sf = await getSF();

    //3.
    if (!sender || !superToken || !signer || !sf) {
      return;
    }

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: sender,
        receiver: receiver,
        superToken: superToken,
        flowRate: flowRate,
        userData: userData,
      });

      setCreateFlowStatus("Pending Signature");
      const txnResponse = await createFlowOperation.exec(signer);
      setCreateFlowStatus("Mining");
      await txnResponse.wait();
      setCreateFlowStatus("Success");
    } catch (e) {
      setCreateFlowStatus("Exception");
      alert("Error creating flow");
      return;
    }
  };

  const resetCreateFlowStatus = () => {
    setCreateFlowStatus("None");
  };

  return { createFlow, createFlowStatus, resetCreateFlowStatus };
};
export default useCreateFlow;
