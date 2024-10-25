import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { session } from "../../../lib/session";
import { authMiddleware } from "../../../middleware/auth-middleware";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(session as any);

router.get(authMiddleware(), (req: any, res: any) => {
  return res.json(req?.user);
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
