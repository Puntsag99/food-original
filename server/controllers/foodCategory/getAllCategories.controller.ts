import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await FoodCateGoryModel.find();

    res.status(200).send({ message: "Found allFood successfully", result });
  } catch (error) {
    console.error("Error during allCategories", error);
    res.status(500).json({
      message: "Failed food  allCategories",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
