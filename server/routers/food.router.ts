import { Router } from "express";
import {
  getFoodController,
  deleteFoodContoller,
  updateFoodController,
  createFoodController,
  getFoodByCategoryController,
} from "../controllers";

export const foodRouter = Router();

foodRouter.post("/:id", createFoodController);
foodRouter.delete("/:id", deleteFoodContoller);
foodRouter.patch("/:id", updateFoodController);
foodRouter.get("/", getFoodController).get("/:id", getFoodByCategoryController);
