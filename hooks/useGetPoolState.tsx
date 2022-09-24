import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

const useGetPoolState = (address: string | undefined) => {
  const Interface = new ethers.utils.Interface(borrowerPools.abi);

  const { data: poolParameters } = useContractRead({
    addressOrName: borrowerPools.address,
    contractInterface: Interface,
    functionName: "getPoolState",
    args: [address],
  });
  return poolParameters;
};

export default useGetPoolState;
