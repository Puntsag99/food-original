"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";

type Categories = { _id: string; categoryName: string };

export const Footer = () => {
  const [allCate, setAllCate] = useState<Categories[] | null>([]);
  useEffect(() => {
    const allCategories = async () => {
      try {
        const res = await axios(
          "http://localhost:8000/food-category/allCategory"
        );
        setAllCate(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    allCategories();
  }, []);

  return (
    <div className="w-full bg-[#18181b]">
      <div className="bg-red-500 mt-20 h-[92px] flex items-center pl-[98px] gap-x-[34px] text-white font-3xl font-semibold">
        Fresh fast delivered
      </div>
      <div className="flex flex-col gap-y-[104px] px-22">
        <div className="flex  mt-[76px] gap-x-55">
          <div className="flex flex-col gap-y-[12.41px] ">
            <div className="flex flex-col items-center">
              <Image width={46} height={37} alt="heat" src="/img/Traced.png" />
              <div className="flex">
                <span className="text-white text-xl font-semibold">Nom</span>{" "}
                <span className="text-red-500 text-xl font-semibold">Nom</span>{" "}
              </div>
              <p className="text-xs font-normal text-white">Swift delivery</p>{" "}
            </div>
          </div>
          <div className="flex gap-x-[112px]">
            <div className=" flex flex-col gap-y-4 text-base font-normal">
              <h3 className=" text-[#71717A]">NOMNOM</h3>
              <p className="text-white">Home</p>
              <p className="text-white">Contact us</p>
              <p className="text-white">Delivery zone </p>
            </div>
            <div className=" flex flex-col gap-y-4 text-base font-normal">
              <h3 className=" text-[#71717A]">MENU</h3>
              <div className="grid grid-rows-5 grid-cols-2 gap-y-4 gap-x-[56px]">
                {allCate?.map((cats) => (
                  <p
                    key={cats._id}
                    className="text-base font-normal text-white"
                  >
                    {cats.categoryName}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className=" text-[#71717A]">FOLLOW US </h3>
              <div className="flex gap-x-4 text-white">
                <Facebook width={28} height={28} />
                <Instagram width={28} height={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-21 flex items-center text-sm font-normal text-[#71717A] gap-x-12 border-t border-[#71717A] mb-[111px]">
          <p>Copy right 2024 @ NomNom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and condition </p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
