// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  score: number;
  timestamp: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;
  if (req.method === "GET") {
    res.status(200).json({ success: true, score: 650, timestamp: Date.now() });
  } else if (req.method === "POST") {
    res.status(200).json({ success: true, score: 584, timestamp: Date.now() });
  }
}
