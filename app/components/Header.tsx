"use client";
import React, { useState } from "react";
import Assets from "@/app/components/Assets/Assets";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setIsOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full z-50 overflow-x-hidden">
    <div className="max-w-7xl mx-auto">
      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-between">
        <Link href="/Home" className=" flex items-center gap-1">
          <Image className=" h-10 w-auto" src={Assets.Logo1} alt="Logo" />
          <p className=" text-3xl font-semibold bricolage-font">StarkAccess</p>
        </Link>
        <div className="flex items-center gap-[30px] text-xl">
          <Link href="/Home">
          <h1
            className={`cursor-pointer ${
              activeMenu === "home"
                ? "scale-110 transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("home")}
          >
            Home
          </h1>
          </Link>
          <h1
            className={`cursor-pointer ${
              activeMenu === "explore"
                ? "scale-110 transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("explore")}
          >
            Explore Events
          </h1>
          <h1
            className={`cursor-pointer ${
              activeMenu === "create"
                ? "scale-110 transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("create")}
          >
            Create Events
          </h1>
          <Link href="/Onboarding">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center bg-[#4F7CBB] p-1 px-4 rounded-full text-white"
          >
            Sign In
            <Image
              src={Assets.ArrowTopRight}
              alt="ArrowTopRight"
              className="h-6 w-6"
            />
          </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden flex justify-between mx-4">
        <div className="">
          <Image className=" w-40" src={Assets.Logo} alt="Logo"></Image>
        </div>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-white hover:border-2 hover:border-white focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden absolute top-16 left-0 w-full bg-transparent backdrop-filter backdrop-blur-2xl z-50`}
        id="mobile-menu"
      >
        <div className=" items-center mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <h1
            className={`cursor-pointer ${
              activeMenu === "home"
                ? "text-lg transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("home")}
          >
            Home
          </h1>
          <h1
            className={`cursor-pointer ${
              activeMenu === "explore"
                ? "text-lg transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("explore")}
          >
            Explore Events
          </h1>
          <h1
            className={`cursor-pointer ${
              activeMenu === "create"
                ? "text-lg transform transition-transform duration-300"
                : "hover:text-white/50"
            }`}
            onClick={() => handleMenuClick("create")}
          >
            Create Events
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center bg-[#4F7CBB] p-1 px-4 rounded-full"
          >
            Sign In
            <Image
              src={Assets.ArrowTopRight}
              alt="ArrowTopRight"
              className="h-6 w-6"
            />
          </motion.button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Header;
