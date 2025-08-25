import { motion } from 'framer-motion';
import banner from "../../assets/banner.jpg"
import { ExternalLink } from 'lucide-react';

const Banner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-gray_text3 p-8 md:p-12 lg:p-16 flex flex-col items-end">
          <div className=" bg-white px-6 py-10 max-w-[440px] rounded-3xl w-full ">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-[32px] text-primary_color font-semibold mb-3"
            >
              Do you own a property? List with us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg  mb-6 max-w-[392px]"
            >
              Showcase your luxury property and gain premium exposure for your
              property investment
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" text-accent font-semibold p-4 w-full flex items-center gap-3 transition-colors"
            >
              List your Property
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </motion.button>
         
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;