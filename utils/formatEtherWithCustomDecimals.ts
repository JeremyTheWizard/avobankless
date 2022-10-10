import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

const formatEtherWithCustomDecimals = (
  bigNumber: BigNumber,
  decimals: number = 0
): string | undefined => {
  if (!BigNumber.isBigNumber(bigNumber)) return undefined;

  return Number(formatEther(bigNumber.toString())).toFixed(decimals);
};

export default formatEtherWithCustomDecimals;
