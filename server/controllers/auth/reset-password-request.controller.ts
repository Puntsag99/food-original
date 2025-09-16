import { UserModel } from "../../models";
import { Request, Response } from "express";
import { generateNewToken, sendUserVerificationLink } from "../../utils";

export const resetPasswordRequestController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ message: "Email is required" });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).send({ message: "Email is wrong ,please check again" });
    return;
  }

  const token = generateNewToken({ userId: user._id }, "15m");

  await sendUserVerificationLink(
    `${req.protocol}://${req.get(
      "host"
    )}/auth/verify-reset-request?token=${token}`,
    email
  );

  res.status(201).send({ message: "Success" });
};
