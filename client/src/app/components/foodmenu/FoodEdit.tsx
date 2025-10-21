"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import axios from "axios";
import * as Yup from "yup";
import { toast } from "sonner";
import Image from "next/image";
import { useFormik } from "formik";
import { X, Trash, BookImage } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReturnFood = {
  _id: string;
  foodName: string;
  foodImage: string;
  foodPrice: number;
  ingredients: string;
  category: string;
};

type FoodEditProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  food: ReturnFood;
};

type Category = {
  _id: string;
  categoryName: string;
  foodCount: number;
};

type FormValues = {
  foodName: string;
  category: string;
  ingredients: string;
  foodImage: string | File | null;
  foodPrice: number;
};

const foodEditValidation = Yup.object({
  foodName: Yup.string().required("Хоолны нэрээ оруулна уу."),
  category: Yup.string().required("Төрлөө сонгоно уу."),
  ingredients: Yup.string().required("Орц оо оруулна уу."),
  foodImage: Yup.mixed<File | string>().test(
    "required-image",
    "Зургаа оруулна уу.",
    (value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      return value instanceof File;
    }
  ),
  foodPrice: Yup.number().required("Үнээ оруулна уу."),
});

export const FoodEdit = ({ open, onOpenChange, food }: FoodEditProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [prevImage, setPrevImage] = useState("");

  const inputImageRef = useRef<HTMLInputElement>(null);

  const openImage = () => {
    inputImageRef.current?.click();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = Array.from(files)[0];

    setPrevImage(URL.createObjectURL(file));
    formik.setFieldValue("foodImage", file);
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

  const formik = useFormik<FormValues>({
    initialValues: {
      foodName: food.foodName,
      category: food.category,
      ingredients: food.ingredients,
      foodImage: food.foodImage ?? "",
      foodPrice: food.foodPrice,
    },
    enableReinitialize: true,
    validationSchema: foodEditValidation,
    onSubmit: async (values) => {
      let imageURL = "";

      if (values.foodImage && values.foodImage instanceof File) {
        const form = new FormData();
        form.append("upload_preset", "food-delivery");
        form.append("file", values.foodImage);

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dxjdxefkk/image/upload",
          { method: "POST", body: form }
        );

        const parsed = await response.json();
        imageURL = parsed.url;
      } else if (typeof values.foodImage === "string") {
        imageURL = values.foodImage;
      }

      const payload = {
        foodName: values.foodName,
        foodPrice: Number(values.foodPrice),
        ingredients: values.ingredients,
        foodImage: imageURL,
      };

      await axios.patch(`http://localhost:8000/food/${food._id}`, payload);

      toast.success("New dish is being updated to the menu");
    },
  });

  const handleClickEditImage = () => {
    formik.setFieldValue("foodImage", null);
    setPrevImage("");
  };

  const displayImageSrc: string | null = (() => {
    if (prevImage) return prevImage;
    const current = formik.values.foodImage;
    if (typeof current === "string" && current.trim()) return current;
    return null;
  })();

  const handleClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/food/${food._id}`);
      onOpenChange(false);

      toast.success("Dish successfully deleted.");
    } catch (error) {
      toast.error("Failed to delete dish.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-3">
          <DialogHeader>
            <DialogTitle>Dishes Info</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-4">
              <p className="text-sm font-normal text-[#71717A] min-w-[120px]">
                Dish name
              </p>
              <div className="flex flex-col w-full">
                <Input
                  name="foodName"
                  value={formik.values.foodName}
                  onChange={formik.handleChange}
                />
                {formik.touched.foodName && formik.errors.foodName && (
                  <p className="text-xs text-red-500">
                    {formik.errors.foodName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-x-4">
              <p className="text-sm font-normal text-[#71717A] whitespace-nowrap min-w-[120px]">
                Dish category
              </p>

              <Select
                name="category"
                value={formik.values.category}
                onValueChange={(val) => formik.setFieldValue("category", val)}
              >
                <SelectTrigger className="flex items-center justify-between w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-xs text-red-500">{formik.errors.category}</p>
              )}
            </div>

            <div className="flex gap-x-4 ">
              <p className="text-sm font-normal text-[#71717A] whitespace-nowrap min-w-[120px]">
                ingredients
              </p>
              <div className="flex flex-col w-full">
                <textarea
                  value={formik.values.ingredients}
                  name="ingredients"
                  onChange={formik.handleChange}
                  id=""
                  className="w-full h-20 px-3 py-2 border rounded-md"
                />
                {formik.touched.ingredients && formik.errors.ingredients && (
                  <p className="text-xs text-red-500">
                    {formik.errors.ingredients}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-x-4">
              <p className="text-sm font-normal text-[#71717A] whitespace-nowrap min-w-[120px]">
                Price
              </p>
              <div className="flex flex-col w-full">
                <Input
                  type="number"
                  name="foodPrice"
                  value={formik.values.foodPrice}
                  onChange={formik.handleChange}
                />
                {formik.touched.foodPrice && formik.errors.foodPrice && (
                  <p className="text-xs text-red-500">
                    {formik.errors.foodPrice}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-x-4">
              <p className="text-sm font-normal text-[#71717A] whitespace-nowrap min-w-[120px]">
                Image
              </p>
              <div className="flex flex-col relative w-full  ">
                {displayImageSrc ? (
                  <Image
                    height={116}
                    width={288}
                    src={displayImageSrc}
                    alt={formik.values.foodName || "food"}
                    className="rounded-md w-full"
                  />
                ) : (
                  <div className="h-[116px]   border border-dashed bg-[#2563EB0D] rounded-md flex items-center justify-center">
                    <Input
                      type="file"
                      ref={inputImageRef}
                      hidden
                      onChange={handleChangeInput}
                    />
                    <div
                      onClick={openImage}
                      className="flex flex-col gap-y-2  items-center"
                    >
                      <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center">
                        <BookImage width={16} height={16} />
                      </div>
                      <p className="text-sm font-medium">
                        Choose a file or drag & drop it here
                      </p>
                    </div>
                  </div>
                )}
                {formik.touched.foodImage && formik.errors.foodImage && (
                  <p className="text-xs text-red-500">
                    {formik.errors.foodImage}
                  </p>
                )}
                {displayImageSrc && (
                  <div
                    onClick={handleClickEditImage}
                    className="absolute top-2 right-2 cursor-pointer w-9 h-9 bg-white rounded-full flex justify-center items-center text-black"
                  >
                    <X width={16} height={16} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              onClick={handleClickDelete}
              className="cursor-pointer w-12 h-10 rounded-md border flex border-[#EF444480] justify-center items-center text-red-500"
            >
              <Trash width={16} height={16} />
            </div>
            <Button type="submit" className="text-sm font-medium">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
