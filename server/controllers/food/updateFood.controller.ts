import { FoodModel } from "../../models";
import { Request, Response } from "express";

type foodBody = Partial<{
  image: string;
  price: number;
  foodName: string;
  ingredient: string[];
}>;
export const updateFoodController = async (req: Request, res: Response) => {
  try {
    const { id: foodId } = req.params;
    const updateData = req.body as foodBody;

    if (!foodId) {
      res.status(400).send({ message: "Food ID is required" });
      return;
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, updateData, {
      new: true,
    });

    if (!updatedFood) {
      res.status(400).send({ message: "Not found food for this foodId" });
      return;
    }

    res
      .status(200)
      .send({ message: "Updated new food successfully ", data: updateData });
  } catch (error) {
    console.error("Error during by foodId");
    res.status(500).json({
      message: "Failed food by foodId",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
