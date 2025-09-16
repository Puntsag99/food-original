import { Router } from "express";

import {
  signupController,
  refreshContoller,
  signinController,
  verifyUserController,
  resetPasswordController,
  resetPasswordRequestController,
  verifyResetPasswordRequserController,
} from "../controllers/auth";

import { authenticateUser } from "../middlewares";

export const authRouter = Router();

authRouter
  .get("/verify-user", verifyUserController)
  .get("/refresh", authenticateUser, refreshContoller)
  .get("/verify-reset-request", verifyResetPasswordRequserController);
authRouter
  .post("/sign-up", signupController)
  .post("/sign-in", signinController)
  .post("/reset-password", resetPasswordController)
  .post("/reset-request", resetPasswordRequestController);
