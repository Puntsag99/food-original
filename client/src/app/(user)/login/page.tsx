import Image from "next/image";
import { LoginHome } from "@/app/components";

const Login = () => {
  return (
    <div className="flex w-screen h-screen items-center gap-x-12">
      <LoginHome />

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

export default Login;
