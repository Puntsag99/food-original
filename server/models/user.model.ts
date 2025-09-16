import { Schema, Model, models, model } from "mongoose";

export enum UserRoleEnum {
  ADMIN = "Admin",
  USER = "User",
}

type userSchemaType = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: Schema.Types.ObjectId;
  ttl: Date;
  isVerified: boolean;
};

const UserSchema = new Schema<userSchemaType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
    },
    isVerified: { type: Boolean, default: false },
    orderedFoods: [
      { type: Schema.Types.ObjectId, ref: "FoodOrder", required: true },
    ],
    ttl: { type: Date, default: Date.now() + 24 * 60 * 608300 },
  },
  { timestamps: true }
);

export const UserModel: Model<userSchemaType> =
  models["User"] || model("User", UserSchema);
