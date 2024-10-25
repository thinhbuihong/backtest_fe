import cookieSession from "cookie-session";
import { NextApiRequest, NextApiResponse } from "next";

export const session = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  cookieSession({
    keys: ["asd"],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  })(req as any, res as any, next);
};
