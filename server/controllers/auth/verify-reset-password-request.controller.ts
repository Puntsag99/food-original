import { verifyToken } from "../../utils";
import { Request, Response } from "express";

export const verifyResetPasswordRequserController = (
  req: Request,
  res: Response
) => {
  const token = String(req.query.token);

  console.log("end yum bna uu", token);

  try {
    const decodedToken = verifyToken(token) as { userId: string };

    res
      .status(200)
      .send({ message: "Token is valid", userId: decodedToken.userId });

    return;
  } catch (error) {
    res.status(400).send({ message: "Invalid or expired token" });
    return;
  }

  //   res.status(201).send({ message: "Success" });
};
