"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CreateFoodPlus } from "./CreateFoodPlus";

type FoodsProps = {
  selectedCategoryId: string;
};

type Category = {
  _id: string;
  categoryName: string;
};

export const Foods = ({ selectedCategoryId }: FoodsProps) => {
  const [oneCategory, setOneCategory] = useState<Category | null>(null);

  useEffect(() => {
    const cateGoryData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/food-category/${selectedCategoryId}`
        );

        setOneCategory(res.data.oneCategory);
      } catch (error) {
        console.error(error);
      }
    };
    cateGoryData();
  }, [selectedCategoryId]);

  return (
    <div className="bg-white rounded-xl px-5 py-5">
      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">{oneCategory?.categoryName}</h3>

        <CreateFoodPlus selectedCategoryId={selectedCategoryId} />
      </div>
    </div>
  );
};
