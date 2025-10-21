import { Router } from "express";
import {
  getFoodController,
  deleteFoodContoller,
  updateFoodController,
  createFoodController,
  getCategoriesWithFoods,
  getFoodByCategoryController,
} from "../controllers";

export const foodRouter = Router();

foodRouter.post("/:id", createFoodController);
foodRouter.delete("/:id", deleteFoodContoller);
foodRouter.patch("/:id", updateFoodController);
foodRouter
  .get("/categories", getCategoriesWithFoods)
  .get("/", getFoodController)
  .get("/:id", getFoodByCategoryController);
