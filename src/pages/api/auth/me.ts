import { createEdgeRouter, createRouter } from "next-connect";
import { NextFetchEvent, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { session } from "../../../lib/session";
import { passport } from "../../../lib/passport";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(session as any);

router.get((req: any, res: any) => {
  console.log(1111111111111111, req.session.isNew);
  if (!req.session?.passport?.user) {
    return res.status(401).send("Not authenticated");
  }
  res.json({ user: req.session.passport.user });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
