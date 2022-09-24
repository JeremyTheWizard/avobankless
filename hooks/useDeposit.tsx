import { Contract, utils } from "ethers";
import positionManager from "../deployments/goerli/PositionManager.json";

import { useContractFunction } from "@usedapp/core";

const useDeposit = () => {
  const { abi: contractABI } = positionManager;
  const { address: contractAddress } = positionManager;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: deposit,
    state: depositState,
    resetState: resetDeposit,
    events: depositEvents,
  } = useContractFunction(contract, "deposit", {
    transactionName: "deposit",
  });

  return {
    deposit,
    depositState,
    resetDeposit,
    depositEvents,
  };
};

export default useDeposit;
