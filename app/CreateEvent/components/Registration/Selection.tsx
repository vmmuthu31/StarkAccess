"use client";
import React, { useState } from "react";
import { FiCheckSquare, FiType, FiUser } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { motion } from "framer-motion";

type SelectionType = "text" | "option" | "checkbox" | "social";
type Question = {
  id: number;
  type: SelectionType;
  required: boolean;
  question: string;
  options?: string[];
  socialId?: string;
};

const Selection = ({ setQuestions }: { setQuestions: any }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  const addQuestionToReview = (question: Question) => {
    setQuestions((prev: any) => [...prev, question]);
    setQuestionList([]); // Reset question list for new input
  };

  // Function to handle selection type and add question
  const handleSelection = (type: SelectionType) => {
    const newQuestion: Question = {
      id: currentQuestionId,
      type,
      required: false,
      question: "",
      options: type === "option" ? [] : undefined,
    };

    setCurrentQuestionId(currentQuestionId + 1);
    setQuestionList([...questionList, newQuestion]);
  };

  // Handle input changes
  const handleInputChange = (id: number, field: string, value: string) => {
    setQuestionList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // Handle required checkbox toggle
  const handleRequiredChange = (id: number) => {
    setQuestionList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, required: !q.required } : q))
    );
  };

  // Handle option field addition
  const handleOptionChange = (id: number, option: string) => {
    setQuestionList((prev) =>
      prev.map((q) =>
        q.id === id && q.options
          ? { ...q, options: [...q.options, option] }
          : q
      )
    );
  };

  // Social ID validation
  const validateSocialId = (value: string) => {
    const socialIdPatterns = [
      /https:\/\/github.com\/.+/,
      /https:\/\/linkedin.com\/in\/.+/,
      /https:\/\/twitter.com\/.+/,
      /https:\/\/t.me\/.+/, // Telegram
      /https:\/\/discord.com\/.+/,
    ];
    return socialIdPatterns.some((pattern) => pattern.test(value));
  };

  return (
    <div className="space-y-4">
      {/* Question Type Selection */}
      <div className="flex justify-between">
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() => handleSelection("text")}
        >
          <FiType className="mr-2" />
          Text
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() => handleSelection("option")}
        >
          <IoIosList className="mr-2" />
          Option
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() => handleSelection("checkbox")}
        >
          <FiCheckSquare className="mr-2" />
          Checkbox
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() => handleSelection("social")}
        >
          <FiUser className="mr-2" />
          Social IDs
        </motion.p>
      </div>

      {/* Render Question Fields Based on Selection */}
      {questionList.map((question, index) => (
        <div key={question.id} className="space-y-2">
          <p className="text-lg">Question {index + 1}</p>
          <input
            type="text"
            value={question.question}
            placeholder="Enter your question here"
            className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC]"
            onChange={(e) =>
              handleInputChange(question.id, "question", e.target.value)
            }
          />

          {/* Conditional Inputs Based on Question Type */}
          {question.type === "text" && (
            <div>
              <p>Answer (Text)</p>
              <input
                type="text"
                className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#f0f4fa]"
                disabled
              />
            </div>
          )}

          {question.type === "option" && (
            <div>
              <p>Options</p>
              <input
                type="text"
                placeholder="Add an option and press enter"
                className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#f0f4fa]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                    handleOptionChange(question.id, e.currentTarget.value);
                    e.currentTarget.value = ""; // Clear input
                  }
                }}
              />
              <ul className="space-y-1">
                {question.options?.map((option, idx) => (
                  <li key={idx} className="text-[#4390F2]">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {question.type === "checkbox" && (
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5" disabled />
              <p className="text-lg">Check this option</p>
            </div>
          )}

          {question.type === "social" && (
            <div>
              <p>
                Enter your social ID (GitHub, LinkedIn, Twitter, Telegram,
                Discord)
              </p>
              <input
                type="text"
                placeholder="Enter social ID URL"
                className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#f0f4fa]"
                onChange={(e) => {
                  const isValid = validateSocialId(e.target.value);
                  handleInputChange(question.id, "socialId", e.target.value);
                  e.target.style.borderColor = isValid ? "green" : "red";
                }}
              />
            </div>
          )}

          {/* Required Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={question.required}
              onChange={() => handleRequiredChange(question.id)}
              className="w-5 h-5"
            />
            <p className="text-lg">Required</p>
          </div>

          <hr className="border-gray-300" />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-2 bg-[#4390F2] text-white p-2 px-5 rounded-[10px]"
            onClick={() => addQuestionToReview(question)}
          >
            Add to Review
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default Selection;
