"use client";

import axios from "axios";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserEmailContext } from "@/app/providers/UserProvider";

export const ResetPasswordComp = () => {
  const [serverMessage, setServerMessage] = useState("");
  const { sendEmail, setSendEmail } = useUserEmailContext();

  const router = useRouter();

  console.log("utgaa awch bna uu:", sendEmail);

  const handleClickSendLink = async () => {
    try {
      await axios.post("http://localhost:8000/auth/reset-request", {
        email: sendEmail,
      });

      router.push("/resend");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setServerMessage(message);
      }
    }
  };

  const handleChangeSendLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendEmail(event.target.value);
  };

  return (
    <div className="flex flex-col gap-y-6  ">
      <div className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
        <ChevronLeft width={16} height={16} />
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">Reset your password </h3>
        <p className="text-base font-semibold text-[#71717A]">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <Input
        value={sendEmail}
        onChange={handleChangeSendLink}
        placeholder="example@gmail.com"
      />
      {serverMessage && <p className="text-sm text-red-500">{serverMessage}</p>}
      <Button onClick={handleClickSendLink} className="text-sm font-medium">
        Send link
      </Button>

      <div className="flex gap-x-3 text-base font-normal justify-center ">
        <p className="text-[#71717A]">Don't have an account?</p>
        <p className="text-[#2563EB]">Sign Up</p>
      </div>
    </div>
  );
};
