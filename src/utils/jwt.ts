import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN || !REFRESH_TOKEN) {
  throw new Error("JWT secrets are missing");
}

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN) as jwt.JwtPayload;
};
