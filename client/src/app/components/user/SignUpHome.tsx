"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserEmailContext } from "@/app/providers/UserProvider";

type formValues = {
  email: string;
};

const signUpValidation = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[^\s@]+@[^\s@]+\.(com|net|org)$/,
      "IInvalid email. Use a format like example@email.com."
    )
    .required("Email field must not be empty"),
});

export const SignUpHome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  const { setUserEmail } = useUserEmailContext();

  const signUpField = useFormik<formValues>({
    initialValues: {
      email: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      setUserEmail({ email: values.email });

      router.push("/password");
    },
  });

  return (
    <form
      onSubmit={signUpField.handleSubmit}
      className="flex flex-col w-[416px] gap-y-6 pl-25"
    >
      <div className="w-9 h-9 rounded-md  border border-solid flex items-center justify-center border-[#E4E4E7]">
        <ChevronLeft />
      </div>

      <div className="flex flex-col gap-y-1">
        <h3 className="text-2xl font-semibold">Create your account </h3>
        <p className="font-normal text-base text-gray-500">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <Input
        name="email"
        value={signUpField.values.email}
        onChange={signUpField.handleChange}
        onBlur={signUpField.handleBlur}
        placeholder="Enter your email address"
      />
      {signUpField.touched.email && signUpField.errors.email && (
        <p className="text-sm text-red-500">{signUpField.errors.email}</p>
      )}
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
