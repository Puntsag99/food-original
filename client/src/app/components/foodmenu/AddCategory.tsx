"use client";

import axios from "axios";
import { PlusButton } from "./PlusButton";
import { useState, useEffect } from "react";
import { NewCategory } from "./NewCategory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = {
  _id: string;
  categoryName: string;
};

export const AddCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleClickPlus = () => {
    setCategoryModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("http://localhost:8000/food-category");
        setCategories(res.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 bg-white px-6 py-6">
      <h3 className="text-xl font-semibold">Dishes category</h3>
      <div className="grid grid-cols-7 grid-rows-2 gap-3">
        <Button className="border border-solid border-red-600 py-2 px-4 w-[145px] h-[36px] rounded-full bg-white">
          <div className="flex gap-x-2">
            <p className="text-sm font-medium text-black">All dishes</p>
            <Badge className="w-[39px] h-5 rounded-full">123</Badge>
          </div>
        </Button>
        {categories?.slice(0, 7).map((items) => (
          <div
            key={items._id}
            className="py-2 px-4   border border-solid rounded-full "
          >
            <div className=" flex gap-x-2 ">
              <p className="text-sm font-medium  truncate">
                {items.categoryName}
              </p>
              <Badge className="w-7 h-5 rounded-full ">6</Badge>
            </div>
          </div>
        ))}

        <PlusButton handleClickPlus={handleClickPlus} />
      </div>
      {categoryModalOpen && (
        <NewCategory
          categoryModalOpen={categoryModalOpen}
          setCategoryModalOpen={setCategoryModalOpen}
        />
      )}
    </div>
  );
};
