import { JwtPayload, sign, verify } from "jsonwebtoken";

const secret = "jwt_secret";

export const signJwt = async (payload: any): Promise<string> => {
  const token = await sign(payload, secret);
  return token;
};

export const verifyJwt = async (jwt: string): Promise<string | JwtPayload> =>
  await verify(jwt, secret);
