import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

type foodOrderItemBody = {
  food: string;
  quantity: number;
};
type foodOrderBody = {
  user: string;
  totalPrice: number;
  foodOrderItems: foodOrderItemBody[];
};

export const createFoodOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const { user, totalPrice, foodOrderItems } = req.body as foodOrderBody;

    if (!user || !totalPrice || foodOrderItems.length === 0) {
      res.status(400).send({ message: "All required fields must be provided" });
      return;
    }

    const newFoodOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
    });

    res.status(201).json({
      message: "Food order created successfully",
      order: newFoodOrder,
    });
  } catch (error) {
    console.error("Error creating food order", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
