import { Contract, utils } from "ethers";
import deployments from "../deployments.json";

import { useContractFunction } from "@usedapp/core";

const useFDAIApprove = () => {
  const fDAI = deployments.contracts.Token1;
  const { abi: contractABI } = fDAI;
  // const { address: contractAddress } = fDAI;
  const contractAddress = "0x1714B9AF0BF10F9EdE7aEE00584B2B731437EdFA";
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: fDAIApprove,
    state: fDAIApproveState,
    resetState: fDAIResetApprove,
    events: fDAIApproveEvents,
  } = useContractFunction(contract, "approve", {
    transactionName: "Approve",
  });

  return {
    fDAIApprove,
    fDAIApproveState,
    fDAIResetApprove,
    fDAIApproveEvents,
  };
};

export default useFDAIApprove;
