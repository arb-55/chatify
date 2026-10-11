import { useEffect, useRef } from "react";

const BorderAnimatedContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="animated-border-container"
    >
      {/* Rotating conic gradient border */}
      <div className="animated-border-glow" />
      {/* Mouse-follow radial glow */}
      <div className="animated-border-mouse-glow" />
      {/* Inner content */}
      <div className="animated-border-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimatedContainer;