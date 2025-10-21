"use client";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserEmailContext } from "@/app/providers/UserProvider";

type formValues = {
  password: string;
  confirmPassword: string;
};

const createPasswordValidation = Yup.object({
  password: Yup.string()
    .required("Weak password. Use numbers and symbols.")
    .min(6, "Password must be at least 6 characters")
    .required("Plase password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Those passwords didn’t match, Try again")
    .required("Please confrim password"),
});

export const Create = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { userEmail } = useUserEmailContext();

  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  const handleChangeShowpassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordField = useFormik<formValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: createPasswordValidation,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8000/auth/sign-up", {
          email: userEmail.email,
          password: values.password,
        });

        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={passwordField.handleSubmit}
      className="flex flex-col w-[416px] gap-y-6 pl-25"
    >
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
        <Input
          name="password"
          onChange={passwordField.handleChange}
          onBlur={passwordField.handleBlur}
          value={passwordField.values.password}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        {passwordField.touched.password && passwordField.errors.password && (
          <p className="text-red-500 text-sm">
            {passwordField.errors.password}
          </p>
        )}
        <Input
          name="confirmPassword"
          onChange={passwordField.handleChange}
          onBlur={passwordField.handleBlur}
          value={passwordField.values.confirmPassword}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm"
        />
        {passwordField.touched.confirmPassword &&
          passwordField.errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {passwordField.errors.confirmPassword}
            </p>
          )}

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={handleChangeShowpassword}
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

      <Button type="submit" className="text-sm font-semibold">
        Let's Go
      </Button>

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
    </form>
  );
};
