import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

type Props = {};

const UploadLogo = (props: Props) => {
  const [fileName, setFileName] = useState("");

  const Handlelogochange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };
  return (
    <div className="space-y-1">
      <p>Company Logo</p>
      <div className="w-full p-2 rounded-[10px] bg-[#DAE7FC] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="bg-[#4390F2] text-white rounded-[11px] w-fit flex justify-center items-center p-3 cursor-pointer">
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload
            </label>
          </h1>
          <span className="text-[#4390F2]">
            {fileName || "No file selected"}
          </span>
        </div>

        <label htmlFor="file-upload" className="cursor-pointer">
          <MdOutlineFileUpload className="text-[#4390F2] size-6" />
        </label>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={Handlelogochange}
        />
      </div>
      <h1 className="text-black/50">
        Upload a Company Logo (recommended size: 1200x1200).
      </h1>
    </div>
  );
};

export default UploadLogo;
