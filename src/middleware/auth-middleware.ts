// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { verifyJwt } from "../lib/jwt";
import { user } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const authMiddleware = (handler?: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse, next?) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Token ở dạng "Bearer <token>"

    const info = await verifyJwt<user>(token);
    if (!info) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    // const user = await prisma.user.findFirst({ where: { id: info.id } });

    (req as any).user = info;
    if (handler) return handler(req, res);

    return next();
  };
};
