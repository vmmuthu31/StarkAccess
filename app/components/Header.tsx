"use client";
import React, { useState, useEffect } from "react";
import Assets from "@/app/components/Assets/Assets";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [user, setUser] = useState<any>(null); // State to store user info

  useEffect(() => {
    // Retrieve user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user info
    }
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setIsOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/Home"; // Redirect to home or login page
  };

  return (
    <div className="w-full z-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between">
          <Link href="/Home" className="flex items-center gap-1">
            <Image className="h-10 w-auto" src={Assets.Logo1} alt="Logo" />
            <p className="text-3xl font-semibold bricolage-font">StarkAccess</p>
          </Link>
          <div className="flex items-center gap-[30px] text-xl">
            <Link href="/Home">
              <h1
                className={`custom-cursor ${
                  activeMenu === "home"
                    ? "scale-110 transform transition-transform duration-300 border-b-2 border-[#4390F2]"
                    : "hover:text-white/50"
                }`}
                onClick={() => handleMenuClick("home")}
              >
                Home
              </h1>
            </Link>
            <Link href="/ExploreEvents">
              <h1
                className={`custom-cursor ${
                  activeMenu === "explore"
                    ? "scale-110 transform transition-transform duration-300 border-b-2 border-[#4390F2]"
                    : "hover:text-white/50"
                }`}
                onClick={() => handleMenuClick("explore")}
              >
                Explore Events
              </h1>
            </Link>
            <Link href="/CreateEvent">
              <h1
                className={`custom-cursor ${
                  activeMenu === "create"
                    ? "scale-110 transform transition-transform duration-300 border-b-2 border-[#4390F2]"
                    : "hover:text-white/50"
                }`}
                onClick={() => handleMenuClick("create")}
              >
                Create Events
              </h1>
            </Link>
            {user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 bg-[#4F7CBB] p-1 px-4 rounded-full text-white custom-cursor"
                  onClick={toggleMenu}
                >
                  {user.name || "Account"}
                  <Image
                    src={Assets.ArrowTopRight}
                    alt="ArrowTopRight"
                    className="h-6 w-6"
                  />
                </motion.button>
                {isOpen && (
                  <div className="absolute bg-white border rounded shadow-lg top-10 right-0 p-2">
                    <Link href="/MyEvents">
                      <p
                        className="hover:bg-gray-100 text-black p-2 rounded cursor-pointer"
                        onClick={() => handleMenuClick("my-events")}
                      >
                        My Events
                      </p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hover:bg-gray-100 text-black p-2 w-full text-left rounded cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/Onboarding">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center bg-[#4F7CBB] p-1 px-4 rounded-full text-white custom-cursor"
                >
                  Sign In
                  <Image
                    src={Assets.ArrowTopRight}
                    alt="ArrowTopRight"
                    className="h-6 w-6"
                  />
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex justify-between mx-4">
          <Image className="w-40" src={Assets.Logo} alt="Logo"></Image>
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
      </div>
    </div>
  );
};

export default Header;
