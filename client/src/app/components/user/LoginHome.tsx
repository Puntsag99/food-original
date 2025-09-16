"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginHome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex flex-col w-[416px] gap-y-6 pl-25">
      <div className="w-9 h-9 rounded-md  border border-solid flex items-center justify-center border-[#E4E4E7]">
        <ChevronLeft />
      </div>

      <div className="flex flex-col gap-y-1">
        <h3 className="text-2xl font-semibold">Log in </h3>
        <p className="font-normal text-base">
          Log in to enjoy your favorite dishes.
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        <Input placeholder="Enter your email address" />
        <Input placeholder="Password" />
        <a href="/password" className="text-sm font-semibold underline">
          Forgot Password?
        </a>
      </div>

      <Button className="text-sm font-semibold">Let's Go</Button>

      <div className="flex gap-x-3 justify-center">
        <p className="text-sm font-normal text-gray-500">
          Don't have an account?
        </p>

        <p
          className="text-sm font-normal text-[#2563EB] cursor-pointer"
          onClick={handleClick}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
};
