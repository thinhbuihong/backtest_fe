import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { passport } from "../../../../lib/passport";
import { session } from "../../../../lib/session";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(session as any).use(passport.initialize() as any);

router.get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
