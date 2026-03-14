import { useEffect, useRef, useState } from "react";
import type { Position } from "../types";

const INTERACTIVE_SELECTOR = "a, button, .project-card, .nav-item";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const frameIdRef = useRef<number | null>(null);
  const latestPositionRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      latestPositionRef.current = { x: event.clientX, y: event.clientY };

      if (frameIdRef.current !== null) {
        return;
      }

      frameIdRef.current = window.requestAnimationFrame(() => {
        setPosition(latestPositionRef.current);
        frameIdRef.current = null;
      });
    };

    const handleMouseOver = (event: MouseEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const handleMouseOut = (event: MouseEvent): void => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Element && nextTarget.closest(INTERACTIVE_SELECTOR)) {
        return;
      }

      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isHovering
            ? "translate(-50%, -50%) scale(1.5)"
            : "translate(-50%, -50%) scale(1)",
          background: isHovering ? "rgba(0, 255, 204, 0.1)" : "transparent",
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
