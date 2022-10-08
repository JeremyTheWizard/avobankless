import { useCall } from "@usedapp/core";
import { BigNumber, Contract, ethers } from "ethers";
import deployments from "../deployments.json";

function useGetPositionRepartition(
  tokenId: string | undefined
): BigNumber | undefined {
  const positionManager = deployments.contracts.PositionManager;

  const Interface = new ethers.utils.Interface(positionManager.abi);

  const { value, error } =
    useCall(
      tokenId && {
        contract: new Contract(positionManager.address, Interface),
        method: "getPositionRepartition",
        args: [tokenId],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export default useGetPositionRepartition;
