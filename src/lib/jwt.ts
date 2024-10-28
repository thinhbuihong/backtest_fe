import { JwtPayload, sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "jwt_secret";

export const signJwt = async (payload: any): Promise<string> => {
  const token = await sign(payload, secret);
  return token;
};

export const verifyJwt = async <T = any>(
  jwt: string
): Promise<(JwtPayload & T) | null> => {
  try {
    return (await verify(jwt, secret)) as any;
  } catch (error) {
    return null;
  }
};
