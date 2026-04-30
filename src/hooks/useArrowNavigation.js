import { useEffect } from "react";

function isTypingTarget(target) {
  const tagName = target?.tagName?.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select" || target?.isContentEditable;
}

export function useArrowNavigation({ currentIndex, total, onMove }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isTypingTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onMove(Math.max(0, currentIndex - 1));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onMove(Math.min(total - 1, currentIndex + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, total, onMove]);
}
