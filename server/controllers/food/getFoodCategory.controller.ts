import { FoodModel } from "../../models";
import { Request, Response } from "express";

export const getFoodByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: categoryId } = req.params;

    if (!categoryId) {
      res.status(400).send({ message: "categoryId is required" });
      return;
    }

    const food = await FoodModel.find({ category: categoryId });

    if (!food) {
      res.status(404).send({ message: "No food found for this categoryId" });
      return;
    }

    res.status(200).send({ message: "Found food successfully", food });
  } catch (error) {
    console.error("Error during by categoryId");
    res.status(500).json({
      message: "Failed food by categoryId",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
