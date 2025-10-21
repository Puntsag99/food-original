import { UserModel } from "../models";
import { verifyToken } from "../utils";
import { Request, Response, NextFunction } from "express";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.split(" ")[1];

  if (!authorization) {
    res.status(400).send({ message: "Authorization header is missing" });
    return;
  }

  if (!token) {
    res.status(400).send({ message: "Authorization token is missing" });
    return;
  }

  const decodedToken = verifyToken(token) as { userId: string };

  console.log("ene yuwe", decodedToken);

  if (!decodedToken || !decodedToken.userId) {
    res.status(400).send({ message: "Bad request" });
    return;
  }

  const existingUser = await UserModel.findById(decodedToken.userId);

  console.log("aaaa", existingUser);

  if (!existingUser) {
    res.status(400).send({ message: "userId not found" });
    return;
  }

  req.body.user = existingUser;

  next();
};
