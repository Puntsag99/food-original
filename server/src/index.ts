import express from "express";
import { configDotenv } from "dotenv";
import { connectDataBase } from "../database";
import cors from "cors";
import {
  authRouter,
  foodRouter,
  foodOrderRouter,
  foodCategoryRouter,
} from "../routers";

const app = express();

configDotenv();
connectDataBase();
app.use(cors());

const port = 8000;

app.use(express.json());

app.use("/food", foodRouter);
app.use("/auth", authRouter);
app.use("/food-order", foodOrderRouter);
app.use("/food-category", foodCategoryRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
