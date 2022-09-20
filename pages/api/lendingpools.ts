// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  lendingPools: Array<{
    deposit: number;
    TVL: number;
    borrowed: number;
    activeAPY: number;
    rewardAPY: number;
    yearnAPY: number;
    collateral: number;
    creditScore: number;
  }>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const demoLiquidityPools = [
    {
      deposit: 100,
      TVL: 500,
      borrowed: 300,
      activeAPY: 6,
      rewardAPY: 2,
      yearnAPY: 1.5,
      collateral: 60,
      creditScore: 720,
    },
  ];

  if (req.method === "GET") {
    res.status(200).json({ success: true, lendingPools: demoLiquidityPools });
  } else if (req.method === "POST") {
    res.status(200).json({ success: true, lendingPools: demoLiquidityPools });
  }
}
