import { Badge } from "@/components/ui/badge";

export const ChangeDeliver = () => {
  return (
    <div className="w-[213px] h-9 rounded-full flex gap-x-2 bg-black items-center px-4 py-2 ">
      <p className="text-sm font-medium text-white">Change delivery state</p>
      <Badge className="w-[26px] h-[26px] bg-white rounded-full text-black">
        1
      </Badge>
    </div>
  );
};
