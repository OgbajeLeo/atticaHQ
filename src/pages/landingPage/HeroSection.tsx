import React, { useState } from "react";
import { motion } from "framer-motion";
import bg from "../../assets/heroBG.jpg";
import OpenClose from "../../components/iconComponent/OpenClose";

interface SearchFilters {
  type: "Buy" | "Rent";
  lookingFor: string;
  location: string;
  price: string;
}

const Hero: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<"Buy" | "Rent" >("Buy");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    type: "Buy",
    lookingFor: "",
    location: "Abuja",
    price: "₦25,500,000",
  });

  // const tabs = ["Buy", "Rent"] as const;
  const locations = ["Abuja", "Lagos", "Kano", "Port Harcourt", "Ibadan"];
  const priceRanges = [
    "₦5,000,000",
    "₦10,000,000",
    "₦25,500,000",
    "₦50,000,000",
    "₦100,000,000+",
  ];

  // const handleTabChange = (tab: "Buy" | "Rent" ) => {
  //   setActiveTab(tab);
  //   setSearchFilters((prev) => ({ ...prev, type: tab }));
  // };

  const handleSearch = () => {
    console.log("Searching with filters:", searchFilters);
    // Add your search logic here
  };

  return (
    <div className="relative overflow-hidden mt-11 min-h-[700px] ">
      <div className="absolute rounded-[20px] max-w-7xl h-[700px] mx-auto" />
      <div
        className="absolute rounded-[12px] lg:rounded-[20px] max-w-7xl h-[700px] mx-auto inset-0 bg-black bg-cover bg-center opacity-80 bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/50  rounded-[20px] max-w-7xl h-[700px] mx-auto" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center  px-4 sm:px-6 lg:px-8 mt-20">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center "
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-[54px] font-medium text-white mb-4 leading-[150%]"
          >
            Discover your Dream Home,
            <br />
            Right at Your Fingertips
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-300 max-w-[800px] mx-auto leading-relaxed"
          >
            With customized searches, we help you find properties that match
            your desired location, price and type. Start your journey today!
          </motion.p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-5xl mt-[100px]"
        >
          {/* Tabs */}
          {/* <div className="flex bg-white rounded-t-lg w-[144px] max-w-[251px]">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-2.5 lg:py-6 px-6 lg:px-12 ${
                  index == 0
                    ? "rounded-tl-lg"
                    : index == 1
                    ? "rounded-tr-lg"
                    : ""
                } text-xs lg:text-[15px] font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary_color text-white shadow-md"
                    : "text-gray_text2 bg-white hover:text-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                {tab}
              </motion.button>
            ))}
          </div> */}

          {/* Search Form */}
          <div className="flex items-end gap-6 bg-white rounded-b-[12px] lg:rounded-b-2xl rounded-r-[12px] lg:rounded-r-2xl shadow-xl p-4 lg:p-6 lg:py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:gap-4 w-full">
              {/* Looking For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="col-span-1 md:col-span-2"
              >
                <label className="block text-sm font-semibold text-black mb-2">
                  Looking For
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Type, Location... etc"
                    value={searchFilters.lookingFor}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        lookingFor: e.target.value,
                      }))
                    }
                    className=" bg-[#FAFAFA] text-xs lg:text-base px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent transition-all max-w-[397px] w-full duration-300 text-black placeholder-[#6E6D6D]"
                  />
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="hidden lg:block"
              >
                <label className="block text-sm font-semibold text-black mb-2">
                  Location
                </label>
                <div className="relative ">
                  <select
                    value={searchFilters.location}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-transparent outline-none transition-all duration-300 text-black max-w-[190px] appearance-none cursor-pointer"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <OpenClose />
                  </div>
                </div>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="hidden lg:block"
              >
                <label className="block text-sm font-semibold text-black mb-2">
                  Price
                </label>
                <div className="relative">
                  <select
                    value={searchFilters.price}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-transparent transition-all max-w-[190px] duration-300 text-black appearance-none cursor-pointer"
                  >
                    {priceRanges.map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <OpenClose />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Apply Filter Button */}

            <motion.button
              onClick={handleSearch}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className=" flex justify-center items-center bg-primary_color text-white px-4 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-semibold text-xs lg:text-[15px]  transition-all duration-300 shadow w-[210px]"
            >
              Apply Filter
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Hero;
