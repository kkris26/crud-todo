import { motion } from "motion/react";
export const MotionSlide = ({ children, item = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay:0.2
      }}
      key={item}
    >
      {children}
    </motion.div>
  );
};

export const MotionUp = ({ children, item = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.8,
      }}
      key={item}
    >
      {children}
    </motion.div>
  );
};
