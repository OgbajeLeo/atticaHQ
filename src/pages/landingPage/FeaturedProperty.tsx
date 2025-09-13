import React, { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SqrMtr from "../../components/iconComponent/SqrMtr";
import BathIcon from "../../components/iconComponent/BathIcon";
import BedIcon from "../../components/iconComponent/BedIcon";

interface Property {
  id: number;
  price: string;
  location: string;
  title: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  forSale: boolean;
}

const FeaturedProperties: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const properties: Property[] = [
    {
      id: 1,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 2,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center",
      forSale: false,
    },
    {
      id: 3,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 4,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center",
      forSale: false,
    },
  ];

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleCardClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const heartVariants: Variants = {
    initial: { scale: 1 },
    tap: { scale: 0.8 },
    hover: { scale: 1.1 },
  };

  return (
    <div className="bg-[#FFF4F4] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-[45px] font-bold text-black">
              Featured Properties
            </h2>
            <p className="text-lg text-gray_text3 max-w-2xl">
              We offer a full range of services to help you find a property,
              rent or sell as needed.
            </p>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center text-accent font-semibold cursor-pointer group"
          >
            <span className="mr-2">View All Properties</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleCardClick(property.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Sale/Rent Badge */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-4 left-4"
                >
                  <span
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold ${
                      property.forSale
                        ? "bg-[#FFF4F4] text-primary_color"
                        : "bg-[#FFF4F4] text-primary_color"
                    }`}
                  >
                    {property.forSale ? "For Sale" : "For Rent"}
                  </span>
                </motion.div>

                {/* Heart Button */}
                <motion.button
                  variants={heartVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={favorites.has(property.id) ? "filled" : "empty"}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                          favorites.has(property.id)
                            ? "fill-accent text-accent"
                            : "text-gray-400 hover:text-accent"
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Property Details */}
              <div className="p-[15px]">
                {/* Price and Location */}
                <div className="mb-4 flex justify-between items-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-bold text-gray-900 mb-2"
                  >
                    {property.price}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center text-gray_text3 mb-3"
                  >
                    <span className="text-xs">{property.location}</span>
                    <MapPin className="w-3 h-3 ml-1" />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray_text2 mb-4 text-sm line-clamp-2 leading-relaxed"
                >
                  {property.title}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between text-[13px] text-gray_text2"
                >
                  <div className="flex items-center justify-between w-full space-x-4">
                    <div className="flex items-center">
                      <BedIcon />
                      <span>{property.beds} Beds</span>
                    </div>

                    <div className="flex items-center">
                      <BathIcon />
                      <span>{property.baths} baths</span>
                    </div>

                    <div className="flex items-center">
                      <SqrMtr />
                      <span>{property.sqft} Sq. mtr</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Hover overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="md:hidden mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            View All Properties
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default FeaturedProperties;
