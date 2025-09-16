import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const updatedFoodOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: foodOrderId } = req.params;
    const { totalPrice, foodOrderItems } = req.body;

    if (!foodOrderId) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedFoodOrder = await FoodOrderModel.findByIdAndUpdate(
      foodOrderId,
      { totalPrice: totalPrice, foodOrderItems: foodOrderItems },
      { new: true }
    );

    if (!updatedFoodOrder) {
      return res.status(404).json({ message: "Food order not found" });
    }

    return res.status(200).json({
      message: "Food order updated successfully",
      data: updatedFoodOrder,
    });
  } catch (error) {
    console.error("Error updating food order:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
