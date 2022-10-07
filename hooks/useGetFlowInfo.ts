import { Framework, IWeb3FlowInfo } from "@superfluid-finance/sdk-core";
import { useEthers } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import deployments from "../deployments.json";
import { networkConfig } from "../helper-hardhat-config";
import useGetNetworkName from "./useGetNeworkName";
import useGetSF from "./useGetSF";

const useGetFlowInfo = (account: string | undefined) => {
  /* 
    1. get SF
    2. get parameters for getFlow function: superToken, sender, receiver, signer
    3. get flow info
    */

  // resources
  const networkName = useGetNetworkName();
  const { library } = useEthers();
  const getSF = useGetSF();
  const [sf, setSF] = useState<Framework | undefined>();
  const [flowInfo, setFlowInfo] = useState<IWeb3FlowInfo | undefined>();

  useEffect(() => {
    getSFAsync();
  }, []);

  const getSFAsync = async () => {
    const sf = await getSF();
    setSF(sf);
  };

  const getFlowRate = useCallback(async () => {
    //1.
    const sf = await getSF();

    if (!account || !sf || !networkName || !library) {
      return;
    }

    const superToken = networkConfig[networkName].sDAI ?? "";
    const sender = account;
    const receiver = deployments.contracts.SuperfluidCallbacks.address;
    const signer = library.getSigner();

    if (!superToken) {
      alert("Error getting superToken");
      return;
    }

    //3.
    try {
      const flowInfo = await sf.cfaV1.getFlow({
        superToken: superToken,
        sender: sender,
        receiver: receiver,
        providerOrSigner: signer,
      });
      setFlowInfo(flowInfo);
    } catch (e) {
      return e;
    }
  }, [account, library, networkName, sf]);

  useEffect(() => {
    getFlowRate();
  }, [sf, getFlowRate]);

  return flowInfo;
};

export default useGetFlowInfo;
