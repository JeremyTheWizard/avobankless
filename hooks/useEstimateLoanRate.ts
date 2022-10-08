import { useCall } from "@usedapp/core";
import { BigNumber, Contract, ethers } from "ethers";
import deployments from "../deployments.json";

function useEstimateLoanRate(
  normalizedBorrowedAmount: string | undefined,
  ownerAddress: string | undefined
): BigNumber | undefined {
  const borrowerPools = deployments.contracts.BorrowerPools;
  const Interface = new ethers.utils.Interface(borrowerPools.abi);

  const { value, error } =
    useCall(
      normalizedBorrowedAmount &&
        ownerAddress && {
          contract: new Contract(borrowerPools.address, Interface),
          method: "estimateLoanRate",
          args: [normalizedBorrowedAmount, ownerAddress],
        }
    ) ?? {};
  if (error) {
    return undefined;
  }
  return value?.[0];
}

export default useEstimateLoanRate;
