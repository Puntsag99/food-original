import { PlusButton } from "./PlusButton";

export const CreateFoodPlus = () => {
  return (
    <div className="w-[270px] h-[241px] rounded-[20px] border border-dashed border-red-500 flex flex-col gap-y-6 items-center justify-center">
      <PlusButton />
      <p className="text-sm font-medium  text-center">Add new Dish to name</p>
    </div>
  );
};
