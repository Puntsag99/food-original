"use client";

import { motion } from "framer-motion";
import { AddCategory, CreateFoodPlus } from "@/app/components";

const Food = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-y-6">
        <AddCategory />
        <CreateFoodPlus />
      </div>
    </motion.div>
  );
};

export default Food;
