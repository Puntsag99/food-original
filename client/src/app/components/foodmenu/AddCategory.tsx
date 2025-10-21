"use client";

import axios from "axios";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { PlusButton } from "./PlusButton";
import { useState, useEffect } from "react";
import { NewCategory } from "./NewCategory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = {
  _id: string;
  categoryName: string;
  foodCount: number;
};

type AddCategoryProps = {
  setSelectedCategoryId: (id: string) => void;
};

export const AddCategory = ({ setSelectedCategoryId }: AddCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCate, setSelectedCate] = useState("");
  const [foods, setFoods] = useState([]);

  const handleClickPlus = () => {
    setCategoryModalOpen(true);
  };

  const handleClickCateGories = (cateGoryId: string) => () => {
    setSelectedCategoryId(cateGoryId);
    setSelectedCate(cateGoryId);

    console.log(cateGoryId);
  };

  const handleClickClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCategoryId("");
    setSelectedCate("");
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

  useEffect(() => {
    const foodCount = async () => {
      try {
        const res = await axios("http://localhost:8000/food");

        setFoods(res.data.total);
      } catch (error) {
        console.error(error);
      }
    };
    foodCount();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 bg-white px-6 py-6 rounded-xl">
      <h3 className="text-xl font-semibold">Dishes category</h3>
      <div className="grid grid-cols-7 grid-rows-2 gap-3">
        <Button className="border border-solid border-red-600 py-2 px-4 w-[145px] h-[36px] rounded-full bg-white">
          <div className="flex gap-x-2">
            <p className="text-sm font-medium text-black">All dishes</p>
            <Badge className="w-[39px] h-5 rounded-full">{foods}</Badge>
          </div>
        </Button>
        {categories.map((items) => (
          <div
            key={items._id}
            className={cn(
              "py-2 px-4 border rounded-full cursor-pointer",
              selectedCate === items._id && "bg-black text-white"
            )}
            onClick={handleClickCateGories(items._id)}
          >
            <div className=" flex gap-x-2 items-center">
              <p className="text-sm font-medium  truncate">
                {items.categoryName}
              </p>
              {selectedCate === items._id ? (
                <X size={16} onClick={handleClickClear} />
              ) : (
                <Badge className="w-7 h-5 rounded-full ">
                  {items.foodCount}
                </Badge>
              )}
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
