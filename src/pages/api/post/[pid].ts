import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  // res.end(`Post: ${pid}`);
  res.json({ post: pid });
}
