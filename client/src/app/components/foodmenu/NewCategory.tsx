"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
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

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategotyName(event.target.value);
  };

  const handeClickAdd = () => {
    try {
      axios.post("http://localhost:8000/food-category", {
        categoryName,
      });
    } catch (error) {
      console.error(error);
    }
    setCategotyName("");
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
