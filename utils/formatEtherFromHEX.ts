import { formatEther } from "ethers/lib/utils";

const formatEtherFromHEX = (hex: string): string => {
  return Number(formatEther(String(parseInt(hex, 16)))).toFixed(0);
};

export default formatEtherFromHEX;
