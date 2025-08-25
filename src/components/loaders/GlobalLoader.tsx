import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";


interface GlobalLoaderProps {
  loadingText?: string;
  backgroundColor?: string;
  spinnerColor?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  loadingText = "Loading premium properties...",
  backgroundColor = "bg-blue-50",
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${backgroundColor}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center p-8 rounded-xl bg-white/50"
      >
        {/* House icon loader */}
        <motion.div
          className="relative mb-6"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img src={logo} alt="logo" className="" />
        </motion.div>

        {/* Pulsing circles */}
        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary_color rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="text-gray-700 text-lg font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loadingText}
        </motion.p>

        {/* Subtle tagline */}
        <motion.p
          className="mt-2 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
        >
          Finding your dream property...
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary_color to-gray_text2"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "90%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
};

export default GlobalLoader;
