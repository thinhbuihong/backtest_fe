import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, NextHandler } from "next-connect";
import { passport } from "../../../../lib/passport";
import { session } from "../../../../lib/session";
import { signJwt } from "../../../../lib/jwt";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(session as any)
  .use(passport.initialize() as any)
  .use(passport.session());

router.get(
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  async (req, res: any) => {
    // Đăng nhập thành công, chuyển hướng về trang chủ
    console.log("on next passport");

    const user = req?.["user"];
    const jwt = await signJwt(user);

    res.writeHead(302, {
      Location: `/?jwt=${jwt}`,
    });
    res.end();
    return true;
  }
);

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
