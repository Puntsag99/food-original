"use client";

import { motion } from "framer-motion";
import { ChangeDeliver, DateRangePicker, Orders } from "@/app/components";

const Admin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex px-4 py-4 bg-white justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Orders</h3>
          <p className="text-xs font-medium text-gray-500">32 items</p>
        </div>

        <div className="flex gap-x-3 items-center">
          <DateRangePicker />
          <ChangeDeliver />
        </div>
      </div>

      <Orders />
    </motion.div>
  );
};

export default Admin;
