import Image from "next/image";

export const Logout = () => {
  return (
    <div className="flex justify-end">
      <Image
        width={36}
        height={36}
        alt="Avatar"
        src="/img/Avatar.png"
        className="rounded-full"
      />
    </div>
  );
};
