import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import propertyImg from "../../assets/property.jpg";
import SqrMtr from "../../components/iconComponent/SqrMtr";
import BathIcon from "../../components/iconComponent/BathIcon";
import BedIcon from "../../components/iconComponent/BedIcon";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  price: string;
  location: string;
  title: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  isFavorite: boolean;
}

// type Tab = "Buy" | "Rent";

const PropertyListings: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<Tab>("Buy");
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 2,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 3,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 4,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 5,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 6,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 7,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
    {
      id: 8,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 9 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      area: 1200,
      image: propertyImg,
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (propertyId: number) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
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
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };


  const handleCardClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 lg:px-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 lg:mb-0"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold text-gray_text3 mb-1">
              Explore Diverse Property Listings
            </h2>
            <p className="text-lg text-gray_text3 font-normal">
              Discover properties for every need, from cozy homes to luxury
              estates.
            </p>
          </motion.div>

          {/* Tabs */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex bg-gray_text1 rounded-xl w-fit"
          >
            {(["Buy", "Rent"] as Tab[]).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-[123px] h-[47px] flex items-center justify-center ${
                  activeTab == "Buy" ? "rounded-l-xl" : "rounded-r-xl"
                } font-semibold text-[15px] ease-in-out transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary_color text-white shadow-md"
                    : "text-gray_text3 hover:text-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div> */}
        </div>

        {/* Property Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              onClick={() => handleCardClick(property.id)}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Favorite Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-4 right-4 size-[34px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={property.isFavorite ? "filled" : "outline"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${
                          property.isFavorite
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Content */}
              <div className="py-3 px-3">
                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center justify-between mb-3"
                >
                  <h3 className="text-lg font-semibold text-gray_text3">
                    {property.price}
                  </h3>
                  <div className="flex items-center text-gray_text3 text-xs">
                    <span>{property.location}</span>
                    <MapPin className="w-3 h-3 ml-1" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
                  className="text-gray_text2 text-[13.5px] leading-relaxed mb-2 line-clamp-2"
                >
                  {property.title}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                  className="flex items-center justify-between text-gray-500 text-xs"
                >
                  <div className="flex items-center justify-between space-x-4 w-full">
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
                      <span>{property.area} Sq. mtr</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary_color hover:bg-amber-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View More Properties
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default PropertyListings;
