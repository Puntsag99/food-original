import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const getFoodCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await FoodCateGoryModel.find();

    const categoriesWithCount = await FoodCateGoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $addFields: {
          foodCount: { $size: "$foods" },
        },
      },
    ]);

    if (!categories || categories.length === 0) {
      res.status(400).send({ message: "No categories found" });
      return;
    }

    res
      .status(200)
      .send({ message: "All Categories ", categories: categoriesWithCount });
    return;
  } catch (error) {
    console.error("Error during getting categories", error);

    res.status(500).json({
      message: "Failed to get categories",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
