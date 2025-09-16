"use client";

import { motion } from "framer-motion";

export const FoodMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      FoodMenu
    </motion.div>
  );
};
