import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

const formatEtherFromHEX = (
  bigNumber: BigNumber,
  decimals: number = 0
): string => {
  return Number(formatEther(bigNumber.toString())).toFixed(decimals);
};

export default formatEtherFromHEX;
