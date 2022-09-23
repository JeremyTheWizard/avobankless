import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import borrowerPools from "../deployments/goerli/BorrowerPools.json";

const useGetPools = () => {
  const Interface = new ethers.utils.Interface(borrowerPools.abi);

  const { data: pools } = useContractRead({
    addressOrName: borrowerPools.address,
    contractInterface: Interface,
    functionName: "getPools",
  });
  return pools;
};

export default useGetPools;
