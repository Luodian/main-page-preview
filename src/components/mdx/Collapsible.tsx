import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

interface CollapsibleProps {
  summary: string;
  children: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  summary,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-left cursor-pointer focus:outline-none"
      >
        <FaChevronRight
          className={`mr-2 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        <span className="font-medium">{summary}</span>
      </button>
      {isOpen && (
        <div className="mt-3 pl-6 text-sm text-gray-700 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};
