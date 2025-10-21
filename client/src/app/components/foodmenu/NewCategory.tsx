"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NewCategoryProps = {
  categoryModalOpen: boolean;
  setCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewCategory = ({
  categoryModalOpen,
  setCategoryModalOpen,
}: NewCategoryProps) => {
  const [categoryName, setCategotyName] = useState("");
  const [error, setError] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategotyName(event.target.value);
    setError("");
  };

  const cateGorySchema = z.object({
    cateGoryName: z.string().min(1, "Category нэр хоосон байж болохгүй"),
  });

  const handeClickAdd = async () => {
    const result = cateGorySchema.safeParse({ cateGoryName: categoryName });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    try {
      await axios.post("http://localhost:8000/food-category", {
        categoryName: result.data.cateGoryName,
      });

      setCategotyName("");
      setCategoryModalOpen(false);
      toast.success("Category амжилттай нэмэгдлээ 🚀");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response?.data?.message) {
        toast(axiosError.response.data.message);
      }
    }
  };

  const handleClickClose = () => {
    setCategoryModalOpen(false);
  };

  return (
    <Dialog open={categoryModalOpen} onOpenChange={handleClickClose}>
      <DialogContent className="flex flex-col gap-y-6 ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add new category
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Category name</span>
            <Input
              value={categoryName}
              onChange={handleChangeInput}
              placeholder="Type category name..."
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={handeClickAdd}
            className="text-sm font-medium w-[123px] "
          >
            Add category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
