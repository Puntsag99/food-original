import { Router } from "express";

import {
  getFoodOrderController,
  createFoodOrderController,
  updatedFoodOrderController,
  getByUserIdFoodOrderContoller,
} from "../controllers";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", createFoodOrderController);
foodOrderRouter
  .get("/", getFoodOrderController)
  .get("/:id", getByUserIdFoodOrderContoller);
foodOrderRouter.patch("/:id", updatedFoodOrderController);
