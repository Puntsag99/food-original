import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const getCategoriesWithFoods = async (req: Request, res: Response) => {
  try {
    const result = await FoodCateGoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "allCategoryFoods",
        },
      },
    ]);

    res.status(200).send({ message: "Found allFood successfully", result });
  } catch (error) {
    console.error("Error during allFoodsCateGory", error);
    res.status(500).json({
      message: "Failed food  allFoods",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
