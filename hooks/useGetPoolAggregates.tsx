import { useCall } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import deployments from "../deployments.json";

function useGetPoolAggregates(account: string) {
  const borrowerPools = deployments.contracts.BorrowerPools;
  const Interface = new ethers.utils.Interface(borrowerPools.abi);

  const { value, error } =
    useCall(
      account && {
        contract: new Contract(borrowerPools.address, Interface),
        method: "getPoolAggregates",
        args: [account],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value ?? undefined;
}

export default useGetPoolAggregates;
