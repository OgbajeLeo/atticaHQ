import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SqrMtr from "./iconComponent/SqrMtr";
import BathIcon from "./iconComponent/BathIcon";
import BedIcon from "./iconComponent/BedIcon";

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

interface FeaturedPropertyAdProps {
  showHeader?: boolean;
  maxProperties?: number;
}

const FeaturedPropertyAd: React.FC<FeaturedPropertyAdProps> = ({
  showHeader = true,
  maxProperties = 4,
}) => {
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

  const displayedProperties = properties.slice(0, maxProperties);

  return (
    <div className="bg-[#FFF4F4] py-8 px-4 sm:px-6 lg:px-8 my-8 w-full">
      <div className="w-full">
        {/* Header - only show if showHeader is true */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-8"
          >
            <div>
              <h2 className="text-[31px] lg:text-[45px] font-bold text-black">
                Featured Properties
              </h2>
              <p className="text-lg text-gray_text3 max-w-2xl">
                We offer a full range of services to help you find a property,
                rent or sell as needed.
              </p>
            </div>

            <motion.div
              whileHover={{ x: 5 }}
              className="hidden lg:flex items-center text-primary_color cursor-pointer"
            >
              <span className="text-lg font-semibold mr-2">
                View All Properties
              </span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        )}

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleCardClick(property.id)}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Sale/Rent Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className={` rounded-[4px] w-[69px] h-[30px] flex items-center justify-center text-xs font-semibold ${
                      property.forSale
                        ? "bg-[#FFF4F4] text-accent font-bold border border-accent"
                        : "bg-[#FFF4F4] text-accent font-bold border border-accent"
                        // : "bg-[#20B2AA] text-white"
                    }`}
                  >
                    {property.forSale ? "For Sale" : "For Rent"}
                  </span>
                </div>

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
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors duration-200 ${
                      favorites.has(property.id)
                        ? "fill-primary_color text-primary_color"
                        : "text-gray-400 hover:text-primary_color"
                    }`}
                  />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-black">
                    {property.price}
                  </h3>
                  <div className="flex items-center text-gray_text2">
                    <span className="text-sm">{property.location}</span>
                    <MapPin className="w-3 h-3 ml-1" />
                  </div>
                </div>

                <p className="text-gray_text2 mb-4 text-sm line-clamp-2">
                  {property.title}
                </p>

                <div className="flex items-center justify-between text-sm text-gray_text2">
                  <div className="flex gap-2 items-center">
                    <BedIcon />
                    <span>{property.beds} Beds</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <BathIcon />
                    <span>{property.baths} Baths</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <SqrMtr />
                    <span>{property.sqft} Sq. mtr</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedPropertyAd;
