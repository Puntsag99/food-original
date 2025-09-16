import { Request, Response, NextFunction } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
      if (roles.includes(user.role)) {
        next();
        return;
      }

      res.status(403).send({ message: "Forbidden: Not allowed authorization" });
      return;
    } catch (error) {
      res.status(500).send({
        message: "Error",
        error: error instanceof Error ? error.message : "unknown error",
      });
    }
  };
