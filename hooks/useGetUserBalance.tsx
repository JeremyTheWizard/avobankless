import { useCall } from "@usedapp/core";
import { BigNumber, Contract, ethers } from "ethers";
import token1 from "../deployments/goerli/Token1.json";

function useGetUserBalance(address: string | undefined): BigNumber | undefined {
  const Interface = new ethers.utils.Interface(token1.abi);

  const { value, error } =
    useCall(
      address && {
        contract: new Contract(token1.address, Interface),
        method: "balanceOf",
        args: [address],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export default useGetUserBalance;
