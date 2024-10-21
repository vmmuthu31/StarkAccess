"use client"
import React, { useState } from "react";
import { FiCheckSquare, FiType, FiUser   } from "react-icons/fi";
import { IoIosList } from 'react-icons/io';
import { motion } from "framer-motion";


type Selectiontype = "text" | "option" | "checkbox" | "social";
type Props = {};

const Selection = (props: Props) => {

    const [selected, setSelected] = useState<Selectiontype | null>(null);

    const Handleselection = (selection: Selectiontype) => {
      setSelected(selection);
    };


  return (
    <div className="flex justify-between">
      <motion.p whileTap={{ scale:0.9 }}
        className={`${
          selected === "text"
            ? "bg-[#4390F2] text-white border  border-[#4390F2]"
            : "text-[#4390F2] hover:text-white hover:bg-[#4390F2] transition-colors duration-300"
        } border border-[#4390F2] flex gap-1 items-center p-2 px-3 w-fit rounded-[6px] cursor-pointer`}
        onClick={() => Handleselection("text")}
      >
       <FiType className="size-6"/>
        Text
      </motion.p>

      <motion.p whileTap={{ scale:0.9 }}
        className={`${
          selected === "option"
            ? "bg-[#4390F2] text-white border  border-[#4390F2]"
            : "text-[#4390F2] hover:text-white hover:bg-[#4390F2] transition-colors duration-300"
        } border border-[#4390F2] p-2 px-3 w-fit flex items-center gap-1 rounded-[6px] cursor-pointer`}
        onClick={() => Handleselection("option")}
      >
       <IoIosList className=" size-6" />
        Option
      </motion.p>

      <motion.p whileTap={{ scale:0.9 }}
        className={`${
          selected === "checkbox"
            ? "bg-[#4390F2] text-white border  border-[#4390F2]"
            : "text-[#4390F2] hover:text-white hover:bg-[#4390F2] transition-colors duration-300"
        } border border-[#4390F2] p-2 px-3 w-fit flex items-center gap-1 rounded-[6px] cursor-pointer`}
        onClick={() => Handleselection("checkbox")}
      >
        <FiCheckSquare className="size-6" />
        Checkbox
      </motion.p>

      <motion.p whileTap={{ scale:0.9 }}
        className={`${
          selected === "social"
            ? "bg-[#4390F2] text-white border  border-[#4390F2]"
            : "text-[#4390F2] hover:text-white hover:bg-[#4390F2] transition-colors duration-300"
        } border border-[#4390F2] p-2 px-3 w-fit flex items-center gap-1 rounded-[6px] cursor-pointer`}
        onClick={() => Handleselection("social")}
      >
        <FiUser className="size-6"/>
        Social id's
      </motion.p>
    </div>
  );
};

export default Selection;
