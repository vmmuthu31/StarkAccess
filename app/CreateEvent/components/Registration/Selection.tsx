"use client";
import React, { useState, useEffect } from "react";
import { FiCheckSquare, FiType, FiUser } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { motion } from "framer-motion";
import { Question } from "./Types"; // Assuming you have a Question type in your Types file

type SelectionProps = {
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  editingQuestion: Question | null;
  setEditingQuestion: (question: Question | null) => void;
  questions: Question[];
};

const Selection = ({
  setQuestions,
  editingQuestion,
  setEditingQuestion,
  questions,
}: SelectionProps) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(
    questions.length > 0 ? questions[questions.length - 1].id + 1 : 1
  );

  const [question, setQuestion] = useState<Question>({
    id: currentQuestionId,
    type: "text",
    required: false,
    question: "",
    options: [],
    socialId: "",
  });

  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion);
    }
  }, [editingQuestion]);

  const addQuestionToReview = () => {
    if (editingQuestion) {
      // Update existing question
      setQuestions((prevQuestions: Question[]) =>
        prevQuestions.map((q) => (q.id === question.id ? question : q))
      );
      setEditingQuestion(null); // Clear editing state
    } else {
      // Add new question
      setQuestions((prevQuestions: Question[]) => [...prevQuestions, question]);
      setCurrentQuestionId(currentQuestionId + 1);
    }
    resetQuestion(); // Reset fields for next question
  };

  const resetQuestion = () => {
    setQuestion({
      id: currentQuestionId + 1,
      type: "text",
      required: false,
      question: "",
      options: [],
      socialId: "",
    });
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setQuestion((prev) => ({ ...prev, [field]: value }));
  };

  // Handle required checkbox toggle
  const handleRequiredChange = () => {
    setQuestion((prev) => ({ ...prev, required: !prev.required }));
  };

  // Handle option field addition
  const handleOptionChange = (option: string) => {
    setQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), option],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Question Type Selection */}
      <div className="flex justify-between">
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() =>
            setQuestion((prev) => ({ ...prev, type: "text", options: [] }))
          }
        >
          <FiType className="mr-2" />
          Text
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() =>
            setQuestion((prev) => ({ ...prev, type: "option", options: [] }))
          }
        >
          <IoIosList className="mr-2" />
          Option
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() =>
            setQuestion((prev) => ({ ...prev, type: "checkbox", options: [] }))
          }
        >
          <FiCheckSquare className="mr-2" />
          Checkbox
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="text-[#4390F2] border border-[#4390F2] p-2 px-3 rounded-[6px] cursor-pointer hover:bg-[#4390F2] hover:text-white"
          onClick={() =>
            setQuestion((prev) => ({ ...prev, type: "social", options: [] }))
          }
        >
          <FiUser className="mr-2" />
          Social IDs
        </motion.p>
      </div>

      {/* Render Question Fields Based on Selection */}
      <div className="space-y-2">
        <p className="text-lg">Question</p>
        <input
          type="text"
          value={question.question}
          placeholder="Enter your question here"
          className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC]"
          onChange={(e) => handleInputChange("question", e.target.value)}
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
            <div className="flex items-center mb-2 border border-gray-300 rounded-lg p-2 bg-[#f0f4fa]">
              {/* Render the capsules inside the input area */}
              <div className="flex flex-wrap gap-2">
                {(question.options || []).map((option, idx) => (
                  <div
                    key={idx}
                    className="bg-[#3B82F6] text-white rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {option}
                    <button
                      className="ml-2 text-white focus:outline-none text-2xl" // Increased size for the 'x' button
                      onClick={() => {
                        const updatedOptions = (question.options || []).filter(
                          (_, index) => index !== idx
                        );
                        setQuestion((prev) => ({
                          ...prev,
                          options: updatedOptions,
                        }));
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {/* Input field for adding new options */}
              <input
                type="text"
                placeholder="Add an option and press enter or tab"
                className="flex-1 h-[53px] p-2 bg-transparent border-none outline-none"
                onKeyDown={(e) => {
                  if (
                    (e.key === "Enter" || e.key === "Tab") &&
                    e.currentTarget.value.trim() !== ""
                  ) {
                    e.preventDefault(); // Prevent default tab behavior
                    handleOptionChange(e.currentTarget.value);
                    e.currentTarget.value = ""; // Clear input
                  }
                }}
              />
            </div>
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
            <p>Select the social platforms:</p>

            {/* Social media platform checkboxes */}
            <div className="space-y-2">
              {["GitHub", "LinkedIn", "Twitter", "Telegram", "Discord"].map(
                (platform) => (
                  <div key={platform} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={platform}
                      checked={question.options?.includes(platform)}
                      onChange={(e) => {
                        const newOptions = e.target.checked
                          ? [...(question.options || []), platform]
                          : (question.options || []).filter(
                              (opt) => opt !== platform
                            );
                        setQuestion((prev) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                    />
                    <label htmlFor={platform} className="text-lg">
                      {platform}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Required Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={question.required}
            onChange={handleRequiredChange}
            className="w-5 h-5"
          />
          <p className="text-lg">Required</p>
        </div>

        <hr className="border-gray-300" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="mt-2 bg-[#4390F2] text-white p-2 px-5 rounded-[10px]"
          onClick={addQuestionToReview}
        >
          {editingQuestion ? "Save Changes" : "Add to Review"}
        </motion.button>
      </div>
    </div>
  );
};

export default Selection;
