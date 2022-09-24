import { Contract, utils } from "ethers";
import positionManager from "../deployments/goerli/PositionManager.json";

import { useContractFunction } from "@usedapp/core";

const useWithdraw = () => {
  const { abi: contractABI } = positionManager;
  const { address: contractAddress } = positionManager;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: withdraw,
    state: withdrawState,
    resetState: resetWithdraw,
    events: withdrawEvents,
  } = useContractFunction(contract, "withdraw", {
    transactionName: "withdraw",
  });

  return {
    withdraw,
    withdrawState,
    resetWithdraw,
    withdrawEvents,
  };
};

export default useWithdraw;
