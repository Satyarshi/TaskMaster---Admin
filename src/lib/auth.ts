import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string; // JWT ID
  iat: number; // Issued At
}

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    console.log(error);
    throw new Error("your token has expired.");
  }
  //   return decoded;
};
