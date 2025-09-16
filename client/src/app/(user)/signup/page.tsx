import Image from "next/image";
import { SignUpHome } from "@/app/components";

const Signup = () => {
  return (
    <div className="flex w-screen h-screen items-center gap-x-12">
      <SignUpHome />

      <Image
        src="/img/Frame.png"
        alt="loginHome"
        width={856}
        height={904}
        className="object-contain"
      />
    </div>
  );
};

export default Signup;
