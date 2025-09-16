import { verifyToken, generateNewToken } from "../../utils";
import { Request, Response } from "express";

export const refreshContoller = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token not found" });
    return;
  }

  try {
    const decoded = verifyToken(refreshToken) as { userId: string };

    const newAccessToken = generateNewToken({ userId: decoded.userId }, "15m");

    res.json({ accessToken: newAccessToken });
    return;
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
    return;
  }
};
