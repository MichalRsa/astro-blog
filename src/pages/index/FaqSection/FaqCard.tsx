import { useState, type ReactElement, useRef, useEffect } from "react";

interface FaqCardProps {
  question: string;
  answer: string;
}

export const FaqCard = ({ question, answer }: FaqCardProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
    if (target != null) {
      observer.observe(target);
    }

    // Cleanup function to unobserve when the component unmounts
    return () => {
      if (target != null) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className="animationHidden animationLeft shadow-xl bg-primary-200 rounded-3xl p-4 hover:bg-primary-400 focus-within:outline-none focus-within:ring focus-within:ring-primary-500"
    >
      <button
        className="border-b-secondary-500 border-b-2 flex w-full justify-between items-center text-xl md:text-2xl pb-4 focus:outline-none"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="text-left">{question}</span>
        <div className="h-6 min-w-[24px] transition-all flex-grow-0">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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
