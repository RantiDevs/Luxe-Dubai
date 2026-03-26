import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updatePos = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName.toLowerCase() === "a" ||
        t.tagName.toLowerCase() === "button" ||
        !!t.closest("a") ||
        !!t.closest("button") ||
        t.classList.contains("hover-trigger")
      );
    };

    window.addEventListener("mousemove", updatePos);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#C9A84C] rounded-full pointer-events-none z-[10000]"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#C9A84C] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(201,168,76,0.08)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 1 }}
      />
    </>
  );
}
