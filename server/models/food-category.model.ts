import { Schema, model, models, Model } from "mongoose";

type FoodCategorySchemaType = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const FoodCateGoryModel: Model<FoodCategorySchemaType> =
  models["FoodCateGory"] || model("FoodCateGory", FoodCategorySchema);
