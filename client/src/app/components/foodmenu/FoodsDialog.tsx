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
import { useFormik } from "formik";
import { BookImage, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";

type FoodsModal = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategoryId: string;
};

type Category = {
  _id: string;
  categoryName: string;
};

const foodSchemaValidaton = Yup.object({
  foodName: Yup.string().required("Хоолны нэрээ оруулна уу."),
  foodPrice: Yup.number().required("Хоолны  үнээ  оруулна уу."),
  ingredients: Yup.string().required("Хоолны  орцоо  оруулна уу."),
  foodImage: Yup.mixed().required("Хоолны зургаа оруулна уу."),
});

export const FoodsDialog = ({
  isOpen,
  setIsOpen,
  selectedCategoryId,
}: FoodsModal) => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      foodName: "",
      foodPrice: "",
      ingredients: "",
      foodImage: "",
    },
    validationSchema: foodSchemaValidaton,
    onSubmit: async (values, { resetForm }) => {
      const form = new FormData();
      form.append("upload_preset", "food-delivery");
      form.append("file", values.foodImage);
      form.append("folder", "food-delivers");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxjdxefkk/image/upload",
        { method: "POST", body: form }
      );

      const parsed = await response.json();
      const imageURL = parsed.url;

      const payload = {
        foodName: values.foodName,
        foodPrice: Number(values.foodPrice),
        ingredients: values.ingredients,
        foodImage: imageURL,
      };

      await axios.post(
        `http://localhost:8000/food/${selectedCategoryId}`,
        payload
      );

      toast.success("New dish is being added to the menu");

      resetForm();
      setImage("");
      setIsDragging(false);
    },
  });

  const openBrowse = () => {
    inputImageRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("foodImage", file);
    }

    console.log("aldaa bna uu:", file);
  };

  const handleClickImage = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setImage("");
  };

  const handleClickOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = Array.from(event.dataTransfer.files)[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("foodImage", file);
    }

    console.log(file);
  };

  const handleClickOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleClickOnDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form className="flex flex-col gap-y-6" onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Add new Dish to {oneCategory?.categoryName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-2 flex-1">
              <p className="text-sm font-medium">Food name </p>
              <Input
                onBlur={formik.handleBlur}
                placeholder="Type food name"
                name="foodName"
                value={formik.values.foodName}
                onChange={formik.handleChange}
              />
              {formik.touched.foodName && formik.errors.foodName && (
                <p className="text-red-500 text-sm">{formik.errors.foodName}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
              <p className="text-sm font-medium">Food price </p>
              <Input
                onBlur={formik.handleBlur}
                placeholder="Enter price..."
                name="foodPrice"
                value={formik.values.foodPrice}
                onChange={formik.handleChange}
              />
              {formik.touched.foodPrice && formik.errors.foodPrice && (
                <p className="text-red-500 text-sm">
                  {formik.errors.foodPrice}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium">Ingredients</p>
            <textarea
              onBlur={formik.handleBlur}
              name="ingredients"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              placeholder="List ingredients"
              className="h-[90px] border rounded-md px-3 py-2"
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <p className="text-red-500 text-sm">
                {formik.errors.ingredients}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium">Food Image</p>
            {/* multiple, accept="image/png" */}
            <Input
              onBlur={formik.handleBlur}
              type="file"
              ref={inputImageRef}
              hidden
              onChange={handleInputChange}
            />
            <div
              onClick={openBrowse}
              className={`border-dashed border text-sm font-medium h-[138px] bg-[#2563EB0D] flex flex-col gap-y-2 items-center justify-center rounded-md ${
                isDragging ? "border-red-500" : ""
              } `}
              onDrop={handleClickOnDrop}
              onDragOver={handleClickOnDragOver}
              onDragLeave={handleClickOnDragLeave}
            >
              {image ? (
                <div className="relative w-full h-full inline-block  overflow-hidden">
                  <img
                    src={image}
                    alt="food"
                    className=" w-full h-full object-cover rounded-md"
                  />

                  <div
                    onClick={handleClickImage}
                    className="absolute top-2 right-2 cursor-pointer w-9 h-9 bg-white rounded-full flex justify-center items-center text-black"
                  >
                    <X width={16} height={16} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                    <BookImage width={16} height={16} />
                  </div>
                  Choose a file or drag & drop it here
                </>
              )}
            </div>
            {formik.touched.foodImage && formik.errors.foodImage && (
              <p className="text-red-500 text-sm">{formik.errors.foodImage}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-[93px]">
              Add dish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
