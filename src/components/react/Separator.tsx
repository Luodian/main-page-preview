import React from "react";

interface SeparatorProps {
  type?: "horizontal" | "vertical" | "dot" | "smallDot";
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({
  type = "horizontal",
  className = "",
}) => {
  const separatorClasses = {
    base: "flex-shrink-0 bg-lighter mx-2",
    types: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
      dot: "w-1.5 h-1.5 rounded-full",
      smallDot: "w-1 h-1 rounded-full",
    } as const,
  };

  const typeClass = separatorClasses.types[type];

  if (type === "dot") {
    return (
      <span className={`${separatorClasses.base} ${typeClass} ${className}`} />
    );
  }

  return (
    <span
      role="separator"
      aria-orientation={type === "horizontal" ? "horizontal" : "vertical"}
      className={`${separatorClasses.base} ${typeClass} ${className}`}
    />
  );
};

export default Separator;
