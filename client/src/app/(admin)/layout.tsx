import React from "react";
import { AnimatePresence } from "framer-motion";
import { Dashboard, FoodMenu, Logout } from "../components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-h-screen w-full flex overflow-x-hidden ">
      <Dashboard />
      <div className="bg-[#f4f4f5] flex-1 min-h-screen pt-6 pr-10 pb-[52px] pl-6 flex flex-col gap-y-6">
        <Logout />
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
