import Image from "next/image";
import { Create } from "@/app/components";

const Password = () => {
  return (
    <div className="flex w-screen h-screen items-center gap-x-12">
      <Create />

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

export default Password;
