"use client";

import axios from "axios";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { FoodEdit } from "./FoodEdit";
import { motion } from "framer-motion";
import { PlusButton } from "./PlusButton";
import { FoodsDialog } from "./FoodsDialog";
import { useState, useEffect } from "react";

type cateTypeProps = {
  selectedCategoryId: string;
};

type Category = {
  _id: string;
  categoryName: string;
};

type RetrunFood = {
  _id: string;
  foodName: string;
  foodImage: string;
  foodPrice: number;
  ingredients: string;
  category: string;
};

export const CreateFoodPlus = ({ selectedCategoryId }: cateTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [oneCategory, setOneCategory] = useState<Category | null>(null);
  const [categoryFood, setCateoryFood] = useState<RetrunFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<RetrunFood | null>(null);

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

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const foodData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/food/${selectedCategoryId}`
        );

        setCateoryFood(res.data.food);
      } catch (error) {
        console.error(error);
      }
    };
    foodData();
  }, [selectedCategoryId]);

  const handleClickEdit = (food: RetrunFood) => () => {
    // event.stopPropagation();

    setSelectedFood(food);
    setIsOpenEdit(true);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 ">
      <div className=" h-[241px] rounded-[20px] border border-dashed border-red-500 flex flex-col gap-y-6 items-center justify-center">
        <PlusButton handleClickPlus={handleOpenDialog} />
        <p className="text-sm font-medium  text-center">
          Add new Dish to {oneCategory?.categoryName}
        </p>

        <FoodsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCategoryId={selectedCategoryId}
        />
      </div>

      {categoryFood &&
        categoryFood.map((foods, index) => (
          <motion.div
            key={foods._id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className=" h-[241px] rounded-md border border-[#E4E4E7] px-4 py-4 cursor-pointer"
          >
            <div className="flex flex-col gap-y-5">
              <div className="relative inline-block">
                <Image
                  src={foods.foodImage}
                  alt="foodImage"
                  width={239}
                  height={129}
                  className="rounded-xl"
                />

                <div
                  onClick={handleClickEdit(foods)}
                  className="absolute bottom-2 right-2 bg-white w-11 h-11 rounded-full flex justify-center items-center shadow-md text-red-500"
                >
                  <Pencil width={16} height={16} />
                </div>
              </div>

              <div className="flex flex-col gapy-2 ">
                <div className="flex gap-x-[10px] justify-between ">
                  <span className="text-sm font-medium text-red-500">
                    {foods.foodName}
                  </span>
                  <span className="text-xs font-normal">
                    ${foods.foodPrice}
                  </span>
                </div>
                <p className="text-xs font-normal">{foods.ingredients}</p>
              </div>
            </div>
          </motion.div>
        ))}
      {isOpenEdit && selectedFood && (
        <FoodEdit
          open={isOpenEdit}
          onOpenChange={setIsOpenEdit}
          food={selectedFood}
        />
      )}
    </div>
  );
};
