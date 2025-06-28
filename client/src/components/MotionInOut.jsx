import { motion } from "motion/react";
const MotionInOut = ({ children, item = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      key={item}
    >
      {children}
    </motion.div>
  );
};

export default MotionInOut;
