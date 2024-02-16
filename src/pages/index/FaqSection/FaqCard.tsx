import { useState, type ReactElement } from "react";

interface FaqCardProps {
  question: string;
  answer: string;
}

export const FaqCard = ({ question, answer }: FaqCardProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-primary-200 rounded-3xl p-4 ">
      <button
        className="border-b-secondary-500 border-b-2 flex w-full justify-between items-center text-xl md:text-2xl pb-4"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span>{question}</span>

        <svg
          className={`w-6 h-6 transition-all ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className="pt-4 grid transition-all"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};
