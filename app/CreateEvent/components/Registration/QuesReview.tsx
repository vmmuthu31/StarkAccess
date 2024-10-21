"use client";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const QuesReview = ({
  questions,
  setQuestions,
}: {
  questions: any[];
  setQuestions: any;
}) => {
  const handleDelete = (id: number) => {
    setQuestions((prev: any) => prev.filter((q: any) => q.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Review Questions</h2>
      {questions.length > 0 ? (
        questions.map((question: any, index: number) => (
          <div
            key={question.id}
            className="border border-gray-300 p-4 rounded-lg space-y-2"
          >
            <p className="font-medium">Question {index + 1}</p>
            <p>{question.question}</p>

            {question.options && (
              <ul className="list-disc pl-5 space-y-1">
                {question.options.map((option: string, idx: number) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            )}

            <button
              className="text-red-600 flex items-center gap-1"
              onClick={() => handleDelete(question.id)}
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
