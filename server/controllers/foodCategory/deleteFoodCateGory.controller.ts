import { Request, Response } from "express";
import { FoodCateGoryModel } from "../../models";

export const deleteFoodCateGoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: "ID is required" });
      return;
    }

    const deletedCategory = await FoodCateGoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(400).send({ message: "Category with given ID not found" });
    }

    res.status(200).send({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      message: "Failed to deleting category",
      error: error instanceof Error ? error.message : "Unkwon error",
    });
  }
};
