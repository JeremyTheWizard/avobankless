import { useCall, useEthers } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import deployments from "../deployments.json";

const useGetRepaymentAmount = (
  loanAmount: string | undefined
): BigNumber | undefined => {
  const { account } = useEthers();
  const borrowerPools = deployments.contracts.BorrowerPools;

  const { value, error } =
    useCall(
      account &&
        loanAmount && {
          contract: new Contract(
            borrowerPools.address,
            new Interface(borrowerPools.abi)
          ),
          method: "getRepaymentAmount",
          args: [account, loanAmount],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export default useGetRepaymentAmount;
