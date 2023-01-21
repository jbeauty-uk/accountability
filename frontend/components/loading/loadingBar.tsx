import { motion } from "framer-motion";

const LoadingBar = () => {
  return (
    <motion.div
      initial={{
        opacity: 100,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 10,
        ease: "easeInOut",
      }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <p className="text-sm">Loading</p>
      <div className="w-full p-6">
        <motion.div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            className="bg-purple-600 w-1/4 h-full rounded-full"
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "400%",
            }}
            transition={{
              delay: 0.5,
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingBar;
