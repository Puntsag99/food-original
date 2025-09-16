"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const router = useRouter();

  const handeClickFood = () => {
    router.push("/food");
  };

  const handeClickOrders = () => {
    router.push("/orders");
  };

  return (
    <div className="h-full  w-[205px] py-9 px-5 flex flex-col  ">
      <div className="flex flex-col gap-y-10 ">
        <div className="flex gap-x-2">
          <Image width={40} height={40} alt="Hat" src="/img/Screenshot.svg" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">NomNom</h3>
            <p className="text-sm font-normal text-gray-500">Swift delivery</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-6  ">
          <Button
            onClick={handeClickFood}
            className="flex gap-x-[10px]  bg-white text-black  hover:bg-black hover:text-white "
          >
            <LayoutDashboard className="w-[22px] h-[22px]" />
            <p className="text-sm font-medium">Food menu</p>
          </Button>

          <Button
            onClick={handeClickOrders}
            className="flex gap-x-[10px] mr-6 bg-white text-black  hover:bg-black hover:text-white "
          >
            <Truck className="w-[22px] h-[22px]" />
            <p className="text-sm font-medium">Orders</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
