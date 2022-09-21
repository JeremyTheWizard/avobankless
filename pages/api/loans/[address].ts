// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Loans } from "../../../utils/types";

type Data = {
  success: boolean;
  loans: Loans;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  const demoData = [
    {
      asset: "DAI",
      avgInterest: "2%",
      borrowed: "10K",
      endsOn: "30/9/2022",
      flowRate: "$ 0.000001/second",
    },
  ];
  if (req.method === "GET") {
    res.status(200).json({ success: true, loans: demoData });
  } else if (req.method === "POST") {
    res.status(200).json({ success: true, loans: demoData });
  }
}
