// import { utils } from "ethers";
// import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

// import borrowerPools from "../deployments/localhost/BorrowerPools.json";

// import { parseEther } from "ethers/lib/utils";
// import {
//   cooldownPeriod,
//   distributionRate,
//   establishmentFeeRate,
//   lateRepayFeePerBondRate,
//   liquidityRewardsActivationThreshold,
//   maxRateInput,
//   minRateInput,
//   rateSpacingInput,
//   repaymentFeeRate,
//   repaymentPeriod,
// } from "../constants";
// import token1 from "../deployments/localhost/Token1.json";
// import yearnFinanceWrapper from "../deployments/localhost/YearnFinanceWrapper.json";

// const useCreatePoolV2 = () => {
//   const { address } = useAccount();
//   const { abi: contractABI } = borrowerPools;
//   const { address: contractAddress } = borrowerPools;
//   const contractInterface = new utils.Interface(contractABI);

//   const params = {
//     poolOwner: address,
//     underlyingToken: token1.address,
//     yieldProvider: yearnFinanceWrapper.address,
//     minRate: minRateInput,
//     maxRate: maxRateInput,
//     rateSpacing: rateSpacingInput,
//     maxBorrowableAmount: parseEther("1000"),
//     loanDuration: 24 * 3600,
//     distributionRate: distributionRate,
//     cooldownPeriod: cooldownPeriod,
//     repaymentPeriod: repaymentPeriod,
//     lateRepayFeePerBondRate: lateRepayFeePerBondRate,
//     establishmentFeeRate: establishmentFeeRate,
//     repaymentFeeRate: repaymentFeeRate,
//     liquidityRewardsActivationThreshold: liquidityRewardsActivationThreshold,
//     earlyRepay: true,
//   };

//   const { config, error } = usePrepareContractWrite({
//     addressOrName: contractAddress,
//     contractInterface: contractInterface,
//     functionName: "createNewPool",
//     args: [params],
//   });
//   const { data, isLoading, isSuccess, write } = useContractWrite(config);

//   return write ? write : null;
// };

// export default useCreatePoolV2;
