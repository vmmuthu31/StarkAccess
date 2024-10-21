import React from "react";

type Props = {};

const Question = (props: Props) => {
  return (
    <div>
      <p className=" text-lg">Question</p>
      <input
        type="text"
        className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC]"
      />
    </div>
  );
};

export default Question;
