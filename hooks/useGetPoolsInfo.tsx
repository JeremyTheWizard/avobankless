import { useCalls } from "@usedapp/core";
import { Contract, utils } from "ethers";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

const useGetPoolsInfo = (poolAddresses: string[]) => {
  const calls =
    poolAddresses?.map((address) => ({
      contract: new Contract(
        borrowerPools.address,
        new utils.Interface(borrowerPools.abi)
      ),
      method: "getPoolState",
      args: [address],
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

export default useGetPoolsInfo;
