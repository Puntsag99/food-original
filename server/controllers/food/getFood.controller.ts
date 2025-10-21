import { FoodModel } from "../../models";
import { Request, Response } from "express";

export const getFoodController = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find();

    const total = await FoodModel.countDocuments();

    if (foods.length === 0) {
      res.status(400).send({ message: "All food not found" });
      return;
    }

    res.status(200).json({
      message: "All foods fetched successfully",
      foods,
      total,
    });
  } catch (error) {
    console.error("Error fetching foods:", error);

    res.status(500).json({
      message: "Failed to fetch foods",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
