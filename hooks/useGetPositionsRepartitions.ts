import { useCalls } from "@usedapp/core";
import { Contract, utils } from "ethers";
import deployments from "../deployments.json";

const useGetPositionsRepatriations = (tokenIds: string[]) => {
  const positionManager = deployments.contracts.PositionManager;

  const calls =
    tokenIds?.map((tokenId) => ({
      contract: new Contract(
        positionManager.address,
        new utils.Interface(positionManager.abi)
      ),
      method: "getPositionRepartition",
      args: [tokenId],
    })) ?? [];

  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered calling 'getPoolStatus' on ${calls[idx]?.contract.address}: ${result.error.message}`
      );
    }
  });
  return results as any[];
};

export default useGetPositionsRepatriations;
