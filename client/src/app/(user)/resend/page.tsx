import { Rese } from "@/app/components";
import Image from "next/image";

const Resend = () => {
  return (
    <div className=" max-w-screen-xl mx-auto  flex w-screen h-screen items-center gap-x-12">
      <Rese />

      <Image
        src="/img/Frame.png"
        alt="loginHome"
        width={856}
        height={904}
        className="w-full max-w-[600px] h-auto object-contain"
      />
    </div>
  );
};

export default Resend;
