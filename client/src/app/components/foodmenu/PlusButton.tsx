import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlusProps = {
  handleClickPlus: () => void;
};

export const PlusButton = ({ handleClickPlus }: PlusProps) => {
  return (
    <Button
      onClick={handleClickPlus}
      className="cursor-pointer w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white"
    >
      <Plus className="w-4 h-4" />
    </Button>
  );
};
