import { UserModel } from "../../models";
import { verifyToken } from "../../utils";
import { Request, Response } from "express";

export const verifyUserController = async (req: Request, res: Response) => {
  const token = String(req.query.token);

  const decodedToken = verifyToken(token) as { userId: string };

  await UserModel.findByIdAndUpdate(decodedToken.userId, {
    isVerified: true,
    ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.FRONTEND_ENDPOINT}/signin`);
};
