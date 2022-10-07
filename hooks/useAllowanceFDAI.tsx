import { useCall } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import deployments from "../deployments.json";

const useGetAllowanceFDAI = (
  owner: string | undefined,
  spender: string | undefined
): BigNumber | undefined => {
  const fDAI = deployments.contracts.Token1;

  const { value, error } =
    useCall(
      owner &&
        spender && {
          contract: new Contract(fDAI.address, new Interface(fDAI.abi)),
          method: "allowance",
          args: [owner, spender],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export default useGetAllowanceFDAI;
