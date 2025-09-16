import { Schema, Model, model, models } from "mongoose";

type foodSchemaType = {
  price: number;
  image: string;
  foodName: string;
  ingredients: string[];
  category: Schema.Types.ObjectId;
};

const FoodSchema = new Schema<foodSchemaType>(
  {
    price: { type: Number, required: true },
    image: { type: String, required: true },
    foodName: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel: Model<foodSchemaType> =
  models["Food"] || model("Food", FoodSchema);
