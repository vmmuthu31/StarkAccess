"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Selection from "./Selection";
import QuesReview from "./QuesReview";
import { Question } from "./Types";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const Page = ({ onNext, onBack }: Props) => {
  const [questions, setQuestions] = useState<any[]>([]); // State to store questions
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  return (
    <div>
      <div className="flex space-x-10 pt-6 text-black">
        <div className="space-y-4 w-[212px]">
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Basic Event Details
          </p>
          <p className="text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
            Ticketing & Registration
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Customization & Media
          </p>
        </div>
        <div className="">
          <div className=" flex space-x-10">
            <div className=" w-[478px] space-y-3">
              <div className=" space-y-1">
                <p className="text-lg">Maximum Capacity</p>
                <input
                  type="text"
                  placeholder="Enter the maximum number of tickets available."
                  className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC]"
                />
              </div>
              <div className="space-y-1">
                <p className="text-lg">Registration Question</p>
                <h1 className=" text-[#98A0A8]">
                  We will ask guests the following questions when they register.
                </h1>
                <Selection
                  setQuestions={setQuestions}
                  editingQuestion={editingQuestion}
                  setEditingQuestion={setEditingQuestion}
                  questions={questions}
                />
              </div>

            </div>
            {/* Right Side */}
            <div className="space-y-1 w-[363px]">
              <p className=" text-lg">Review Questions</p>
              <QuesReview
                questions={questions}
                setQuestions={setQuestions}
                setEditingQuestion={setEditingQuestion}
              />
            </div>
          </div>

          <div className="flex relative justify-center gap-4 text-xs md:text-base pt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack} // Call the onBack function here
              className="text-[#3581F1] gap-1 bg-white p-2 px-5 flex items-center border-2 border-[#78ABFC] rounded-[10px]"
            >
              Back
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onNext} // Call the onNext function here
              className="text-white bg-[#4390F2] w-fit p-2 px-5 flex justify-center items-center border-[3px] border-[#78ABFC] rounded-[10px]"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
