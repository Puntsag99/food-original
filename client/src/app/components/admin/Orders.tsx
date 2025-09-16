import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";

export const Orders = () => {
  return (
    <div className=" flex h-[52px]  border-b ">
      <div className="w-12 h-full px-4  py-4 ">
        <Input className="w-4 h-4" type="checkbox" />
      </div>

      <div className="w-[56px] h-full flex  px-4 py-4 text-sm font-normal items-center">
        №
      </div>

      <div className="w-[213.5px] text-sm font-medium px-4 py-4  text-[#71717A]">
        Customer
      </div>

      <div className="w-40 px-4 py-4 text-sm font-medium text-[#71717A]">
        Food
      </div>

      <div className=" flex justify-between w-40 px-4 py-4 text-sm font-medium text-[#71717A]">
        Date
        <ChevronsUpDown className="w-4 h-4" />
      </div>

      <div className=" flex  w-40 px-4 py-4 text-sm font-medium text-[#71717A]">
        Total
      </div>

      <div className=" flex  w-[213.5px] px-4 py-4 text-sm font-medium text-[#71717A]">
        Delivery Address
      </div>

      <div className=" flex justify-between w-40 px-4 py-4 text-sm font-medium text-[#71717A]">
        Delivery State
        <ChevronsUpDown className="w-4 h-4" />
      </div>
    </div>
  );
};
