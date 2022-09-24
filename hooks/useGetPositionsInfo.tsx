import { useCalls } from "@usedapp/core";
import { Contract, utils } from "ethers";
import positionManager from "../deployments/goerli/PositionManager.json";

const useGetPositionsInfo = (positions: string[]) => {
  const calls =
    positions?.map((position) => ({
      contract: new Contract(
        positionManager.address,
        new utils.Interface(positionManager.abi)
      ),
      method: "position",
      args: [position],
    })) ?? [];

  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered calling 'positions' on ${calls[idx]?.contract.address}: ${result.error.message}`
      );
    }
  });
  return results as any[];
};

export default useGetPositionsInfo;
