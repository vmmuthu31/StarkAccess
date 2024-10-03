// Header.tsx
import React from "react";
import Assets from "@/app/components/Assets/Assets"; 
import Image from "next/image";


type Props = {};

const Header = (props: Props) => {
  return (
    <div className=" max-w-7xl mx-auto">
      <div className=" flex items-center justify-between">
        <div className="">
          <Image src={Assets.Logo} alt="Logo" width={200} height={100} />{" "}
          {/* Using Assets.Logo as intended */}
        </div>
        <div className=" flex items-center gap-[30px]">
          <h1>Home</h1>
          <h1>Explore Events</h1>
          <h1>Create Events</h1>
          <button className=" flex items-center bg-[#4F7CBB] p-1 px-3 rounded-full" >
            Sign In
            <Image src={Assets.ArrowTopRight} alt="ArrowTopRight" className="h-6 w-6"></Image>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
