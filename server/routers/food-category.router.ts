import { Router } from "express";

import {
  getFoodCategoryController,
  getAllCategoriesController,
  createFoodCategoryController,
  updateFoodCateGoryController,
  deleteFoodCateGoryController,
  getOneFoodCategoryController,
} from "../controllers";
import { UserRoleEnum } from "../models";
import { authenticateUser, authorization } from "../middlewares";

export const foodCategoryRouter = Router();

foodCategoryRouter
  .get("/allCategory", getAllCategoriesController)
  .get("/", getFoodCategoryController)
  .get("/:id", getOneFoodCategoryController);
foodCategoryRouter.patch("/:id", updateFoodCateGoryController);
foodCategoryRouter.delete("/:id", deleteFoodCateGoryController);
foodCategoryRouter.post(
  "/",
  // authenticateUser,
  // authorization(UserRoleEnum.ADMIN),
  createFoodCategoryController
);
