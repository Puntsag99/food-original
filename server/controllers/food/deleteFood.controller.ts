import { FoodModel } from "../../models";
import { Request, Response } from "express";

export const deleteFoodContoller = async (req: Request, res: Response) => {
  try {
    const { id: foodId } = req.params;

    if (!foodId) {
      res.status(400).send({ message: "foodId is required" });
      return;
    }

    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      res.status(404).send({ message: "Not found food for this foodId" });
      return;
    }

    res.status(200).send({ message: "deletedFood succesfully" });
  } catch (error) {
    console.error("Error during by foodId");
    res.status(500).json({
      message: "Failed food by foodId",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
