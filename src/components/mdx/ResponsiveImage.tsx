import React, { useState, useEffect } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  loading?: "lazy" | "eager";
  rounded?: boolean;
  aspectRatio?: string;
  caption?: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  variant?: "max" | "aligned";
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  maxWidth,
  className = "",
  rounded = true,
  caption,
  align = "center",
  variant = "aligned",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const alignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  const variantClasses: Record<NonNullable<ResponsiveImageProps["variant"]>, string> = {
    aligned: "w-full max-w-full md:max-w-3xl",
    max: "w-full max-w-full",
  };

  const computedMaxWidth =
    variant === "max"
      ? maxWidth ?? "100%"
      : "min(100%, 48rem)";

  // Handle escape key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const handleImageClick = () => {
    setIsExpanded(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close when clicking the overlay background (not the image)
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <figure
        className={`my-6 ${alignmentClasses[align]} ${variantClasses[variant]}`}
        style={computedMaxWidth ? { maxWidth: computedMaxWidth } : undefined}
      >
        <img
          src={src}
          alt={alt}
          className={`
            w-full h-auto max-w-full object-contain
            ${rounded ? "rounded-lg" : ""}
            transition-all duration-300
            hover:shadow-lg hover:cursor-pointer hover:opacity-90
            ${className}
          `}
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
          }}
          loading="lazy"
          onClick={handleImageClick}
          onLoad={() => console.log("✅ Image loaded:", src)}
          onError={() => console.error("❌ Image failed:", src)}
        />

        {/* Caption */}
        {caption && (
          <figcaption className="text-sm text-center italic mt-2 opacity-70">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleOverlayClick}
        >
          <div className="relative flex flex-col items-center max-w-[95vw] max-h-[95vh] animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-1 -right-2 md:-top-6 md:right-0 md:pb-1 z-10 text-black rounded-md w-8 h-8 md:w-8 md:h-8 flex items-center justify-center transition-colors duration-200 text-xl md:text-2xl font-bold"
              aria-label="Close image overlay"
            >
              ×
            </button>

            {/* Image */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: "95vw",
                maxHeight: caption ? "85vh" : "95vh",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveImage;
