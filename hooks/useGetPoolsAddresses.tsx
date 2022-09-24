import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

const useGetPoolsAddresses = () => {
  const Interface = new ethers.utils.Interface(borrowerPools.abi);

  const { data: poolsAddresses } = useContractRead({
    addressOrName: borrowerPools.address,
    contractInterface: Interface,
    functionName: "getPoolsAddresses",
    args: [],
  });
  return poolsAddresses as string[];
};

export default useGetPoolsAddresses;
