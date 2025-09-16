import { Secret, sign, verify } from "jsonwebtoken";

const SECRETKEY: Secret = "my_secret";

export const generateNewToken = (
  payload: object,
  expiresIn: number | `${number}${"s" | "m" | "h" | "d"}`
) => {
  return sign(payload, SECRETKEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  return verify(token, SECRETKEY);
};
