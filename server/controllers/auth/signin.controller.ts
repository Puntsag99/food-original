import { UserModel } from "../../models";
import { Request, Response } from "express";
import { decryptHash, generateNewToken } from "../../utils";

type UserBody = { email: string; password: string };

export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserBody;

    if (!email?.trim() || !password?.trim()) {
      res.status(400).send({ message: "Email or Password not found" });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).send({ field: "email", message: "Буруу email " });
      return;
    }

    const isMatch = decryptHash(password, user.password);

    if (!isMatch) {
      res.status(401).send({ field: "password", message: "Password is wrong" });
      return;
    }

    const accessToken = generateNewToken({ userId: user._id }, "15m");

    res
      .status(201)
      .json({ message: "Successfully logged in.", token: accessToken, user });
  } catch (error) {
    console.error("Error during sign-in", error);
    res.status(500).json({
      message: "Entarnal Server error",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
