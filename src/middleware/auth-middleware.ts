// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { verifyJwt } from "../lib/jwt";

export const authMiddleware = (handler?: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse, next?) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Token ở dạng "Bearer <token>"

    const user = await verifyJwt(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    (req as any).user = user;
    if (handler) return handler(req, res);

    return next();
  };
};
