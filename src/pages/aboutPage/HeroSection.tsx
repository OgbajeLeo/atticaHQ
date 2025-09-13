import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/AboutHero.webp";
import StatsCounter from "./Counter";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 lg:pr-8"
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline bg-[#EAEAEA1A] rounded-xl px-4 py-2"
            >
              <span className="text-gray_text2 text-sm font-medium tracking-wide ">
                About Us
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-gray_text3 leading-[150%]">
                Secure your family's
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray_text3 leading-tight">
                <span className="relative">Dream Home</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg lg:text-[20px] text-gray_text2  max-w-[636px]"
            >
              At Attica, we specialize in blending architectural elegance with
              smart living solutions to deliver high-end, sustainable
              properties.
            </motion.p>

         

          
          </motion.div>

          {/* Right Side - House Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Hero Image"
                className="w-full h-full object-cover"
              />
            </div>

            </motion.div>
              </div>
              
      </div>
              <StatsCounter />
    </div>
  );
};

export default HeroSection;
