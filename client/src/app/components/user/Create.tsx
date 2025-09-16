"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Create = () => {
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
        <h3 className="text-2xl font-semibold">Create a strong password </h3>
        <p className="font-normal text-base text-gray-500">
          Create a strong password with letters, numbers.{" "}
        </p>
      </div>

      <div className="flex flex-col gap-y-4">
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm" />

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="show-password"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="show-password"
            className="text-gray-500 text-sm font-normal"
          >
            Show password
          </label>
        </div>
      </div>

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
