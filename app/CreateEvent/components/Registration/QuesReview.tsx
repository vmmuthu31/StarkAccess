"use client";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const QuesReview = ({
  questions,
  setQuestions,
  setEditingQuestion, // Receive setEditingQuestion from parent
}: {
  questions: any[];
  setQuestions: any;
  setEditingQuestion: any;
}) => {
  const handleDelete = (id: number) => {
    setQuestions((prev: any) => prev.filter((q: any) => q.id !== id));
  };

  // Function to handle click and send data to Selection for editing
  const handleEdit = (question: any) => {
    setEditingQuestion(question); // Set the clicked question for editing
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Review Questions</h2>
      {questions.length > 0 ? (
        questions.map((question: any, index: number) => (
          <div
            key={question.id}
            className="border border-gray-300 p-4 rounded-lg space-y-2 cursor-pointer"
            onClick={() => handleEdit(question)} // Edit question on click
          >
            <p className="font-medium">Question {index + 1}</p>
            <p>{question.question}</p>

            {/* Render Social ID if applicable */}
            {question.type === "social" && (
              <p className="text-[#4390F2]">Social ID: {question.options.join(", ")}</p>
            )}

            <button
              className="text-red-600 flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering edit on delete click
                handleDelete(question.id);
              }}
            >
              <RiDeleteBin6Line />
              Delete Question
            </button>
          </div>
        ))
      ) : (
        <p>No questions added yet.</p>
      )}
    </div>
  );
};

export default QuesReview;
