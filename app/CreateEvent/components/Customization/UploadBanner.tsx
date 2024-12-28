import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {};

const UploadBanner = (props: Props) => {
  const [fileName, setFileName] = useState("");

  const Handlebannerchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-1">
      <p>Event Banner Image</p>
      <div className="w-full p-2 rounded-[10px] bg-[#DAE7FC] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.h1
            whileTap={{ scale: 0.9 }}
            className="bg-[#4390F2] text-white rounded-[11px] w-fit flex justify-center items-center p-3 cursor-pointer"
          >
            <label htmlFor="banner-upload" className="cursor-pointer">
              Upload
            </label>
          </motion.h1>
          <span className="text-[#4390F2]">
            {fileName || "No file selected"}
          </span>
        </div>

        <motion.label
          whileTap={{ scale: 0.9 }}
          htmlFor="banner-upload" // Unique ID for banner upload
          className="cursor-pointer"
        >
          <MdOutlineFileUpload className="text-[#4390F2] size-6" />
        </motion.label>

        <input
          id="banner-upload" // Unique ID for banner upload
          type="file"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={Handlebannerchange}
        />
      </div>
      <h1 className="text-black/50">
        Upload a banner image (recommended size: 1200x1200).
      </h1>
    </div>
  );
};

export default UploadBanner;
