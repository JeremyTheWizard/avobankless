import { Contract, utils } from "ethers";
import token1 from "../deployments/goerli/Token1.json";

import { useContractFunction } from "@usedapp/core";

const useWithdraw = () => {
  const { abi: contractABI } = token1;
  const { address: contractAddress } = token1;
  const contractInterface = new utils.Interface(contractABI);
  const contract = new Contract(contractAddress, contractInterface);

  const {
    send: mint,
    state: mintState,
    resetState: resetMint,
    events: mintEvents,
  } = useContractFunction(contract, "mint", {
    transactionName: "mint",
  });

  return {
    mint,
    mintState,
    resetMint,
    mintEvents,
  };
};

export default useWithdraw;
