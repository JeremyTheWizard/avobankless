// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Deposits } from "../../../utils/types";

type Data = {
  success: boolean;
  deposits: Deposits;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  const demoData = [
    {
      asset: "DAI",
      earned: 2,
      deposited: 60.23,
      available: 52.23,
    },
  ];
  if (req.method === "GET") {
    res.status(200).json({ success: true, deposits: demoData });
  } else if (req.method === "POST") {
    res.status(200).json({ success: true, deposits: demoData });
  }
}
