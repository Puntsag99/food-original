import { Schema, Model, models, model } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "Pending",
  CANCELED = "Canceled",
  DELIVERED = "Delivered",
}

type foodOrderSchemaType = {
  totalPrice: number;
  status: FoodOrderStatusEnum;
  user: Schema.Types.ObjectId;
  foodOrderItems: foodOrderItemSchemaType[];
};

type foodOrderItemSchemaType = {
  quantity: number;
  food: Schema.Types.ObjectId;
};

const FoodOrderItemSchema = new Schema<foodOrderItemSchemaType>(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "Food" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<foodOrderSchemaType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<foodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", FoodOrderSchema);
