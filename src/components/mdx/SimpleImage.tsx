import React from "react";

const SimpleImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div style={{ margin: "20px", border: "2px solid red", padding: "10px" }}>
      <h3>Simple Image Test</h3>
      <p>Source: {src}</p>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          border: "1px solid blue",
        }}
        onLoad={() => console.log("✅ SIMPLE IMAGE LOADED:", src)}
        onError={() => console.error("❌ SIMPLE IMAGE ERROR:", src)}
      />
    </div>
  );
};

export default SimpleImage;
