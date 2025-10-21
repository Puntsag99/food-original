"use client";

import axios from "axios";
import * as Yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

type formValuesType = {
  newPassword: string;
  confirmPassword: string;
};

const newPasswordValidation = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Field must not be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Those password did’t match, Try again")
    .required("Please confirmPassword"),
});

export const CreateNewComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get("token");

  const newPasswordField = useFormik<formValuesType>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: newPasswordValidation,
    onSubmit: async (values) => {
      try {
        if (!token) return;

        const res = await axios.post(
          `http://localhost:8000/auth/reset-password?token=${token}`,
          values
        );

        toast.success(res.data.message);
        router.push("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          setServerMessage(message);
        }
      }
    },
  });

  const handleChangeShowPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowPassword(event.target.checked);
  };

  return (
    <form
      onSubmit={newPasswordField.handleSubmit}
      className="flex flex-col gap-y-6 w-100"
    >
      <div className="flex flex-col gap-y-1">
        <h3 className="text-2xl font-semibold">Create new Password</h3>
        <p className="text-base font-normal text-[#71717A]">
          Set a new password with a combination of letters and numbers for
          better security.
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <Input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          onChange={newPasswordField.handleChange}
          onBlur={newPasswordField.handleBlur}
          value={newPasswordField.values.newPassword}
          placeholder="Password"
        />
        {newPasswordField.touched.newPassword &&
          newPasswordField.errors.newPassword && (
            <p className="text-sm text-red-500">
              {newPasswordField.errors.newPassword}
            </p>
          )}
        <Input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          onChange={newPasswordField.handleChange}
          onBlur={newPasswordField.handleBlur}
          value={newPasswordField.values.confirmPassword}
          placeholder="Confirm"
        />
        {newPasswordField.touched.confirmPassword &&
          newPasswordField.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {newPasswordField.errors.confirmPassword}
            </p>
          )}
        <div className="flex gap-x-2">
          <input
            checked={showPassword}
            onChange={handleChangeShowPassword}
            type="checkbox"
            style={{ width: 16, height: 16 }}
          />
          <p className="text-sm font-normal text-[#71717A]">Show password</p>
        </div>
      </div>
      <Button type="submit" className="text-sm font-medium">
        Create password
      </Button>
    </form>
  );
};
