import { useCall, useEthers } from "@usedapp/core";
import { BigNumber, Contract, ethers } from "ethers";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

function useGetPoolParameters(
  tokenAddress: string | undefined
): BigNumber | undefined {
  const Interface = new ethers.utils.Interface(borrowerPools.abi);
  const { account } = useEthers();

  const { value, error } =
    useCall(
      tokenAddress && {
        contract: new Contract(borrowerPools.address, Interface),
        method: "getPoolParameters",
        args: [account],
      }
    ) ?? {};
  console.log("value", value);
  if (error) {
    console.error(error.message);
    return undefined;
  }
  console.log("value", value);
  return value?.[0];
}

export default useGetPoolParameters;
