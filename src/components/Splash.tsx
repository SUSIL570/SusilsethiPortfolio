import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Splash({ onComplete }: { onComplete: () => void, key?: string | number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill up smoothly in about ~1.2s - 1.5s
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Leave at 100% briefly before transitioning out
          return 100;
        }
        return p + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <h1 className="text-7xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 mb-8">
          SS.
        </h1>
        
        <div className="w-48 h-[2px] overflow-hidden bg-slate-800/50 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
