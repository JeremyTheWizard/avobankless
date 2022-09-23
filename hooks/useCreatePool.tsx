import { Contract, utils } from "ethers";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

import { useContractFunction } from "@usedapp/core";

const useCreatePool = () => {
  const { abi: contractABI } = borrowerPools;
  const { address: contractAddress } = borrowerPools;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: createNewPool,
    state: createNewPoolState,
    resetState: resetCreateNewPoolState,
    events,
  } = useContractFunction(contract, "createNewPool", {
    transactionName: "Create new pool",
  });

  return {
    createNewPool,
    createNewPoolState,
    resetCreateNewPoolState,
    events,
  };
};

export default useCreatePool;
