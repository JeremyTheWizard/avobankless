import { useCalls } from "@usedapp/core";
import { Contract, utils } from "ethers";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

const useGetPositionsInfo = (positions: string[]) => {
  const calls =
    positions?.map((position) => ({
      contract: new Contract(
        borrowerPools.address,
        new utils.Interface(borrowerPools.abi)
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
  console.log("🚀 ~ useGetPositionsInfo results", results);
  return results.map((result) => result?.value?.[0]);
};

export default useGetPositionsInfo;
