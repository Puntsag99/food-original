"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUpHome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };
  return (
    <div className="flex flex-col w-[416px] gap-y-6 pl-25">
      <div className="w-9 h-9 rounded-md  border border-solid flex items-center justify-center border-[#E4E4E7]">
        <ChevronLeft />
      </div>

      <div className="flex flex-col gap-y-1">
        <h3 className="text-2xl font-semibold">Create your account </h3>
        <p className="font-normal text-base text-gray-500">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <Input placeholder="Enter your email address" />

      <Button className="text-sm font-semibold">Let's Go</Button>

      <div className="flex gap-x-3 justify-center">
        <p className="text-sm font-normal text-gray-500">
          Already have an account?
        </p>

        <p
          className="text-sm font-normal text-[#2563EB] cursor-pointer"
          onClick={handleClick}
        >
          Log In
        </p>
      </div>
    </div>
  );
};
