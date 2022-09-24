import { Contract, utils } from "ethers";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

import { useContractFunction } from "@usedapp/core";

const useBorrow = () => {
  const { abi: contractABI } = borrowerPools;
  const { address: contractAddress } = borrowerPools;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: borrow,
    state: borrowState,
    resetState: resetBorrowState,
    events: borrowEvents,
  } = useContractFunction(contract, "borrow", {
    transactionName: "borrow",
  });

  return {
    borrow,
    borrowState,
    resetBorrowState,
    borrowEvents,
  };
};

export default useBorrow;
