import { UserModel } from "../../models";
import { Request, Response } from "express";
import { verifyToken, encryptHash } from "../../utils";

export const resetPasswordController = async (req: Request, res: Response) => {
  const token = String(req.query.token);

  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    res.status(400).send({ message: "both password is required" });
  }

  if (newPassword !== confirmPassword) {
    res.status(400).send({ message: "Passwords do not match" });
    return;
  }

  try {
    const decodedToken = verifyToken(token) as { userId: string };

    if (!decodedToken || !decodedToken.userId) {
      res.status(400).send({ message: "Invalid token payload" });
      return;
    }

    const hashedPassword = encryptHash(newPassword);

    const updatedUser = await UserModel.findByIdAndUpdate(
      decodedToken.userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Password has been reset successfully" });
    return;
  } catch (error) {
    res.status(400).send({ message: "Invalid or expired token" });
    return;
  }
};
