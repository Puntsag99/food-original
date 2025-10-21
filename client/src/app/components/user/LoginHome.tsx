"use client";

import axios from "axios";
import * as Yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { useFormik } from "formik";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserEmailContext } from "@/app/providers/UserProvider";

type loginUserForm = {
  email: string;
  password: string;
};

const loginValidationSchem = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[^\s@]+@[^\s@]+\.(com|net|org)$/,
      "IInvalid email. Use a format like example@email.com."
    )
    .required("Please enter your email"),
  password: Yup.string().required("Please password field "),
});

export const LoginHome = () => {
  const [serverError, setServerError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { setLoginUserEmail } = useUserEmailContext();

  const router = useRouter();

  const handleClick = () => {
    router.push("/signup");
  };

  const LoginField = useFormik<loginUserForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchem,

    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8000/auth/sign-in", {
          email: values.email,
          password: values.password,
        });
        setLoginUserEmail(res.data);

        toast.success(res.data.message);
        router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const field = error.response?.data?.field;
          const message = error.response?.data?.message;
          if (field && message) {
            setServerError({ [field]: message });
          }
        }
      }
    },
  });

  return (
    <form
      onSubmit={LoginField.handleSubmit}
      className="flex flex-col w-[416px] gap-y-6 pl-25"
    >
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
        <Input
          name="email"
          onChange={LoginField.handleChange}
          onBlur={LoginField.handleBlur}
          value={LoginField.values.email}
          placeholder="Enter your email address"
        />
        {LoginField.touched.email && LoginField.errors.email && (
          <p className="text-sm text-red-500">{LoginField.errors.email}</p>
        )}

        {serverError.email && (
          <p className="text-sm text-red-500">{serverError.email}</p>
        )}
        <Input
          name="password"
          onChange={LoginField.handleChange}
          onBlur={LoginField.handleBlur}
          value={LoginField.values.password}
          placeholder="Password"
        />
        {LoginField.touched.password && LoginField.errors.password && (
          <p className="text-sm text-red-500">{LoginField.errors.password}</p>
        )}

        {serverError.password && (
          <p className="text-sm text-red-500">{serverError.password}</p>
        )}

        <a href="/resetPassword" className="text-sm font-semibold underline">
          Forgot Password?
        </a>
      </div>

      <Button type="submit" className="text-sm font-semibold">
        Let's Go
      </Button>

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
    </form>
  );
};
