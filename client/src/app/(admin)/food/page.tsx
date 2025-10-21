"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AddCategory, Foods } from "@/app/components";

const Food = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  return (
    <div className="flex flex-col gap-y-6 ">
      <AddCategory setSelectedCategoryId={setSelectedCategoryId} />
      <Foods selectedCategoryId={selectedCategoryId} />
    </div>
  );
};

export default Food;
