import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const text = "LUXE DUBAI";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
        >
          <div className="relative overflow-hidden flex flex-col items-center">
            <div className="flex text-4xl md:text-6xl lg:text-8xl font-display font-light text-primary tracking-[0.2em] mb-4">
              {text.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className={letter === " " ? "w-4 md:w-8" : ""}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
              className="h-[1px] bg-primary/50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
