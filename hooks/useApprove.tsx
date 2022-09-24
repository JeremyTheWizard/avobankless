import { Contract, utils } from "ethers";
import token1 from "../deployments/goerli/Token1.json";

import { useContractFunction } from "@usedapp/core";

const useApprove = () => {
  const { abi: contractABI } = token1;
  const { address: contractAddress } = token1;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: approve,
    state: approveState,
    resetState: resetApprove,
    events: approveEvents,
  } = useContractFunction(contract, "approve", {
    transactionName: "Approve",
  });

  return {
    approve,
    approveState,
    resetApprove,
    approveEvents,
  };
};

export default useApprove;
