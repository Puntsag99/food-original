"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserEmailContext } from "@/app/providers/UserProvider";

export const Rese = () => {
  const { sendEmail } = useUserEmailContext();

  const handleClickSendLink = async () => {
    try {
      await axios.post("http://localhost:8000/auth/reset-request", {
        email: sendEmail,
      });
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   const message = error.response?.data?.message;
      //   setServerMessage(message);
      // }
    }
  };

  return (
    <div className="flex flex-col gap-y-6  ">
      <div className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
        <ChevronLeft width={16} height={16} />
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">Please verify Your Email</h3>
        <p className="text-base font-semibold text-[#71717A]">
          We just sent an email to {sendEmail} Click the link in the email to
          verify your account.
        </p>
      </div>

      <Button onClick={handleClickSendLink} className="text-sm font-medium">
        Resend email
      </Button>
    </div>
  );
};
