import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const getOneFoodCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const oneCategory = await FoodCateGoryModel.findById(id);

    if (!oneCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).send({ message: "One Categories ", oneCategory });
  } catch (error) {
    console.error("Error during getting categories", error);

    res.status(500).json({
      message: "Failed to get categories",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
