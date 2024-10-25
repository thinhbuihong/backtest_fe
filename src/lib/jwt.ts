import { JwtPayload, sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "jwt_secret";

export const signJwt = async (payload: any): Promise<string> => {
  const token = await sign(payload, secret);
  return token;
};

export const verifyJwt = async (
  jwt: string
): Promise<string | JwtPayload | null> => {
  try {
    return await verify(jwt, secret);
  } catch (error) {
    return null;
  }
};
