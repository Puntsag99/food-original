import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const updateFoodCateGoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!id) {
      res.status(400).send({ message: "ID is required" });
      return;
    }

    if (!categoryName) {
      res.status(400).send({ message: "Category name is required" });
      return;
    }

    const updatedCateGory = await FoodCateGoryModel.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );

    if (!updatedCateGory) {
      res.status(400).send({ message: "Category with given ID not found" });
      return;
    }

    res.status(200).send({
      message: "Category updated successfully",
      data: updatedCateGory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "Failed to update categoryName",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
