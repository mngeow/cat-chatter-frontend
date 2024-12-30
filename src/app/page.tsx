'use client';

import {Image} from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image
        alt="Momo sleeping in front of Christmas tree"
        src="/momo-xmas.jpg"
        classNames={{
          wrapper: "w-full max-w-[1000px]",
          img: "w-full h-auto object-contain"
        }}
      />
    </div>
  );
}
