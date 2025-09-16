import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const getByUserIdFoodOrderContoller = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      res.status(400).send({ message: "ID is required" });
      return;
    }
    const orders = await FoodOrderModel.find({ user: userId })
      .populate("user")
      .populate({ path: "foodOrderItems.food", model: "Food" });

    if (!orders || orders.length === 0) {
      res.status(404).send({ message: "No orders found for this user" });
      return;
    }

    res
      .status(200)
      .send({ message: "food founded successfully by userId", data: orders });
  } catch (error) {
    console.error("Error creating food order", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
