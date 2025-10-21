"use client";

import Image from "next/image";
import { AllFoods, Footer, Header } from "./components";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="relative h-[570px]">
        <Image
          fill
          alt="bg"
          src="/img/Bg.png"
          className="object-cover"
          priority
        />
      </div>
      <div className="bg-[#404040] w-full p-22">
        <AllFoods />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
