import { FoodModel } from "../../models";
import { Request, Response } from "express";

type foodBody = {
  foodName: string;
  foodPrice: number;
  foodImage: string;
  ingredients: string;
};

export const createFoodController = async (req: Request, res: Response) => {
  try {
    const { id: categoryId } = req.params;
    const { foodName, foodPrice, foodImage, ingredients } =
      req.body as foodBody;

    if (
      !categoryId ||
      !foodName ||
      foodPrice == null ||
      !foodImage ||
      !ingredients
    ) {
      res.status(400).send({ message: "All fields are required" });
      return;
    }

    const existingFood = await FoodModel.findOne({
      category: categoryId,
      foodName,
    });

    if (existingFood) {
      res.status(400).send({
        message: "Food with this name already exists in this category",
      });
      return;
    }

    const newFood = await FoodModel.create({
      category: categoryId,
      foodName,
      foodPrice,
      foodImage,
      ingredients,
    });

    res
      .status(201)
      .send({ message: "Created newFood successfully ", data: newFood });
  } catch (error) {
    console.error("Error during addFood", error);
    res.status(500).json({
      message: "addFood error",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
