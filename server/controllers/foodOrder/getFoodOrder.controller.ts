import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const getFoodOrderController = async (req: Request, res: Response) => {
  try {
    const allOrders = await FoodOrderModel.find()
      .populate("user")
      .populate({ path: "foodOrderItems.food", model: "Food" });

    const total = await FoodOrderModel.countDocuments();

    res
      .status(200)
      .send({ message: "Get all orderes susseccfully", allOrders, total });
  } catch (error) {
    console.error("Error creating food order", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
