import React, { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  rounded?: boolean;
  aspectRatio?: string;
  skeletonClass?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  fetchPriority,
  rounded = false,
  aspectRatio,
  skeletonClass = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const skeletonWidth = width ? `${width}px` : "100%";
  const skeletonHeight = height
    ? `${height}px`
    : aspectRatio
      ? "auto"
      : "200px";

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  return (
    <div
      className="relative"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* Skeleton */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-0 bg-gray-200 animate-pulse ${
          rounded ? "rounded-lg" : ""
        } ${skeletonClass} ${isLoaded ? "hidden" : "block"}`}
        style={{
          width: skeletonWidth,
          height: skeletonHeight,
          aspectRatio: aspectRatio || undefined,
        }}
      />

      {/* Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 relative z-0 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading={loading}
        // @ts-ignore - fetchpriority is valid but TypeScript doesn't know about it yet
        fetchpriority={fetchPriority}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default LazyImage;
