import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

type cateGoryBody = { categoryName: string };

export const createFoodCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryName } = req.body as cateGoryBody;

    if (!categoryName) {
      res.status(400).send({ message: "Category name is not found " });
      return;
    }

    const existCategoryName = await FoodCateGoryModel.findOne({ categoryName });

    if (existCategoryName) {
      res.status(400).send({ message: "CategoryName already exist" });
      return;
    }

    const newCateGory = await FoodCateGoryModel.create({
      categoryName,
    });

    res
      .status(201)
      .send({ message: "CateGory created successfully", newCateGory });
  } catch (error) {
    console.error("Error during sign-in", error);
    res.status(500).json({
      message: "Entarnal Server error",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
