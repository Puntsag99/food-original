"use client";

import axios from "axios";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type FoodType = {
  _id: string;
  categoryName: string;
  allCategoryFoods: {
    _id: string;
    foodName: string;
    foodPrice: number;
    foodImage: string;
    ingredients: string;
    category: string;
  }[];
};

export const AllFoods = () => {
  const [allFoods, setAllFoods] = useState<FoodType[] | null>(null);

  useEffect(() => {
    const resultAllFoods = async () => {
      try {
        const res = await axios("http://localhost:8000/food/categories");
        setAllFoods(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    resultAllFoods();
  }, []);

  return (
    <div className="flex flex-col gap-y-[54px]">
      {allFoods?.map((foods) => (
        <div key={foods._id} className="flex flex-col gap-y-[54px]">
          <p className="text-white text-3xl font-semibold">
            {foods.categoryName}
          </p>
          <div className="grid gap-9 grid-cols-3 grid-rows-auto">
            {foods.allCategoryFoods.map((allFoods) => (
              <div
                key={allFoods._id}
                className="w-[397px] h-[342px] bg-white rounded-2xl p-4"
              >
                <div className="flex flex-col gap-y-5">
                  <div className="relative">
                    <Image
                      width={365}
                      height={210}
                      alt="foods"
                      src={allFoods.foodImage}
                      className="rounded-md object-cover"
                    />
                    <div className="absolute bottom-2  right-2">
                      <Button className="bg-white w-11 h-11 rounded-full flex justify-center items-center text-red-500">
                        <Plus width={16} height={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2 justify-between">
                    <div className="flex justify-between">
                      <p className="text-2xl font-semibold text-red-500">
                        {allFoods.foodName}
                      </p>
                      <p className="text-lg font-semibold">
                        ${allFoods.foodPrice}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-normal ">{allFoods.ingredients}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
