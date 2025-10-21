"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart } from "lucide-react";

export const Header = () => {
  const router = useRouter();

  const handleClickSign = () => {
    router.push("/signup");
  };

  const handleClickLogIn = () => {
    router.push("/login");
  };
  return (
    <div className="bg-[#18181b] px-22 justify-between h-[172px] w-full flex items-center mx-auto">
      <div className="flex gap-x-3">
        <Image
          width={46}
          height={46}
          alt="heat"
          src="/img/Traced.png"
          priority
        />
        <div className="flex flex-col text-xl font-semibold">
          <div>
            <span className="text-white">Nom</span>
            <span className="text-red-500">Nom</span>
          </div>
          <p className="text-xs font-normal text-white">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-x-[12.81px] text-sm font-medium">
        <Button onClick={handleClickSign} className="bg-white text-black">
          Sign Up
        </Button>
        <Button onClick={handleClickLogIn} className="bg-red-500">
          Log in
        </Button>
      </div>
    </div>
  );
};
