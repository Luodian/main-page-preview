import React from "react";

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

  return (
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
          transition-opacity duration-300
          hover:shadow-lg
          ${className}
        `}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
        }}
        loading="lazy"
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
  );
};

export default ResponsiveImage;
