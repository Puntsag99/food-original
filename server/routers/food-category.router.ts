import { Router } from "express";

import {
  getFoodCategoryController,
  createFoodCategoryController,
  updateFoodCateGoryController,
  deleteFoodCateGoryController,
} from "../controllers";
import { UserRoleEnum } from "../models";
import { authenticateUser, authorization } from "../middlewares";

export const foodCategoryRouter = Router();

foodCategoryRouter.get("/", getFoodCategoryController);
foodCategoryRouter.patch("/:id", updateFoodCateGoryController);
foodCategoryRouter.delete("/:id", deleteFoodCateGoryController);
foodCategoryRouter.post(
  "/",
  // authenticateUser,
  // authorization(UserRoleEnum.ADMIN),
  createFoodCategoryController
);
