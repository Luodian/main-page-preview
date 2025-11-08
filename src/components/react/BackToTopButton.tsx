import React, { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetHeader = document.querySelector("header");

    if (!targetHeader) {
      // Fallback: show button after scrolling 300px if no header found
      const handleScroll = () => {
        setIsVisible(window.scrollY > 300);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Use IntersectionObserver to watch the header
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Show the scroll to top button when the <header> is out of view
        setIsVisible(!entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback);
    observer.observe(targetHeader);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <div className="left-0 right-12 z-50 ml-auto w-fit md:absolute">
      <button
        onClick={scrollToTop}
        className={`fixed bottom-14 flex h-12 w-12 text-light items-center justify-center rounded-full bg-bgColor text-3xl drop-shadow-xl transition-all duration-300 hover:text-accent-two ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-28 opacity-0"
        }`}
        aria-label="Back to Top"
        style={{
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        <span
          className="absolute inset-0 rounded-full bg-special-lighter flex items-center justify-center"
          aria-hidden="true"
        >
          <HiArrowUp className="h-6 w-6" />
        </span>
      </button>
    </div>
  );
};

export default BackToTopButton;
