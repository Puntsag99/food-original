import { Schema, Model, model, models } from "mongoose";

type foodSchemaType = {
  foodPrice: number;
  foodImage: string;
  foodName: string;
  ingredients: string;
  category: Schema.Types.ObjectId;
};

const FoodSchema = new Schema<foodSchemaType>(
  {
    foodPrice: { type: Number, required: true },
    foodImage: { type: String, required: true },
    foodName: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "FoodCateGory",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel: Model<foodSchemaType> =
  models["Food"] || model("Food", FoodSchema);
