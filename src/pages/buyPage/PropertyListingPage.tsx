import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Bed,
  Bath,
  Square,
  MapPin,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Grid3X3,
  List,
  Mail,
  MessageCircle,
  Building,
} from "lucide-react";

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

type SortOption = "lowest-price" | "highest-price" | "newest" | "oldest";
type ViewType = "grid" | "list";

const PropertyListingPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchLocation, setSearchLocation] = useState("Abuja, Nigeria");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [rooms, setRooms] = useState("Rooms");
  const [priceRange, setPriceRange] = useState("Price");
  const [sortBy, setSortBy] = useState<SortOption>("lowest-price");
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(8);
  const [minBathrooms, setMinBathrooms] = useState("Any");
  const [minSqft, setMinSqft] = useState("Any");

  const properties: Property[] = [
    {
      id: 1,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 5 Bedroom Duplex with Green Area and Bq",
      beds: 5,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 2,
      price: "₦350,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 3 Bedroom Duplex with Green Area and Bq",
      beds: 3,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 3,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 4 Bedroom Duplex with Green Area and Bq",
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
      title: "Brand new luxury 5 Bedroom Duplex with Green Area and Bq",
      beds: 5,
      baths: 3,
      sqft: 1200,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 5,
      price: "₦300,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 3 Bedroom Duplex with Green Area and Bq",
      beds: 3,
      baths: 2,
      sqft: 900,
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 6,
      price: "₦450,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 4 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1400,
      image:
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 7,
      price: "₦280,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 3 Bedroom Duplex with Green Area and Bq",
      beds: 3,
      baths: 2,
      sqft: 1000,
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 8,
      price: "₦380,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 5 Bedroom Duplex with Green Area and Bq",
      beds: 5,
      baths: 4,
      sqft: 1600,
      image:
        "https://images.unsplash.com/photo-1600566752734-c1b6d75d3547?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
    {
      id: 9,
      price: "₦320,000,000",
      location: "Guzape, Abuja",
      title: "Brand new luxury 4 Bedroom Duplex with Green Area and Bq",
      beds: 4,
      baths: 3,
      sqft: 1300,
      image:
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=400&h=300&fit=crop&crop=center",
      forSale: true,
    },
  ];

  // Filter properties based on search and filter criteria
  const filteredProperties = properties.filter((property) => {
    // Location filter
    const locationMatch =
      property.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      searchLocation.toLowerCase().includes(property.location.toLowerCase());

    // Property type filter
    const typeMatch =
      propertyType === "Property Type" ||
      property.title.toLowerCase().includes(propertyType.toLowerCase());

    // Rooms filter
    const roomsMatch =
      rooms === "Rooms" ||
      (rooms === "1 Room" && property.beds === 1) ||
      (rooms === "2 Rooms" && property.beds === 2) ||
      (rooms === "3 Rooms" && property.beds === 3) ||
      (rooms === "4+ Rooms" && property.beds >= 4);

    // Price range filter
    const propertyPrice = parseInt(property.price.replace(/[₦,]/g, ""));
    const priceMatch =
      priceRange === "Price" ||
      (priceRange === "₦0 - ₦100M" && propertyPrice <= 100000000) ||
      (priceRange === "₦100M - ₦300M" &&
        propertyPrice > 100000000 &&
        propertyPrice <= 300000000) ||
      (priceRange === "₦300M - ₦500M" &&
        propertyPrice > 300000000 &&
        propertyPrice <= 500000000) ||
      (priceRange === "₦500M+" && propertyPrice > 500000000);

    // Bathrooms filter
    const bathroomsMatch =
      minBathrooms === "Any" ||
      (minBathrooms === "1+" && property.baths >= 1) ||
      (minBathrooms === "2+" && property.baths >= 2) ||
      (minBathrooms === "3+" && property.baths >= 3) ||
      (minBathrooms === "4+" && property.baths >= 4);

    // Square footage filter
    const sqftMatch =
      minSqft === "Any" ||
      (minSqft === "500+" && property.sqft >= 500) ||
      (minSqft === "1000+" && property.sqft >= 1000) ||
      (minSqft === "1500+" && property.sqft >= 1500) ||
      (minSqft === "2000+" && property.sqft >= 2000);

    return (
      locationMatch &&
      typeMatch &&
      roomsMatch &&
      priceMatch &&
      bathroomsMatch &&
      sqftMatch
    );
  });

  // Sort filtered properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[₦,]/g, ""));
    const priceB = parseInt(b.price.replace(/[₦,]/g, ""));

    switch (sortBy) {
      case "lowest-price":
        return priceA - priceB;
      case "highest-price":
        return priceB - priceA;
      case "newest":
        return b.id - a.id;
      case "oldest":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = sortedProperties.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchLocation,
    propertyType,
    rooms,
    priceRange,
    sortBy,
    minBathrooms,
    minSqft,
  ]);

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

  const DropdownSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
  }> = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <span
            className={
              value === placeholder ? "text-gray-500" : "text-gray-900"
            }
          >
            {value}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        viewType === "list" ? "flex h-64" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          viewType === "list" ? "w-1/2 flex-shrink-0" : ""
        }`}
      >
        <img
          src={property.image}
          alt={property.title}
          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
            viewType === "list" ? "w-full h-full" : "w-full h-48"
          }`}
        />

        {/* Heart Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              favorites.has(property.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div
        className={`p-6 ${
          viewType === "list" ? "w-1/2 flex flex-col justify-between" : ""
        }`}
      >
        {viewType === "list" ? (
          <>
            {/* List View Layout */}
            <div>
              {/* Price */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {property.price}
              </h3>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                {property.title}
              </p>

              {/* Property Attributes */}
              <div className="space-y-2 flex text-sm text-gray-600">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-2" />
                  <span>Bedrooms : {property.beds}</span>
                </div>

                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-2" />
                  <span>Bathrooms : {property.baths}</span>
                </div>

                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-2" />
                  <span>Property Size : {property.sqft} Sq. mtr</span>
                </div>

                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  <span>Property Type: Apartment</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-4">
              <button className="flex-1 bg-amber-800 text-white px-3 py-2 rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center text-sm">
                <Mail className="w-4 h-4 mr-1" />
                Request a Tour
              </button>
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-sm">
                <MessageCircle className="w-4 h-4 mr-1 text-green-600" />
                Chat With Us
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className="p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
              >
                <Heart
                  className={`w-4 h-4 transition-colors duration-200 ${
                    favorites.has(property.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </motion.button>
            </div>
          </>
        ) : (
          <>
            {/* Grid View Layout */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {property.price}
              </h3>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>

            <p className="text-gray-700 mb-4 text-sm line-clamp-2">
              {property.title}
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.beds} Beds</span>
              </div>

              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.baths} baths</span>
              </div>

              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.sqft} Sq. mtr</span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Filter Bar */}
          <div className="py-4">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Buy Button */}
              <div className="flex-shrink-0">
                <DropdownSelect
                  value="Buy"
                  onChange={() => {}}
                  options={["Buy", "Rent"]}
                  placeholder="Buy"
                />
              </div>

              {/* Location Search */}
              <div className="flex-1 lg:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Search location..."
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-1 space-x-2 lg:space-x-4">
                <div className="flex-1">
                  <DropdownSelect
                    value={propertyType}
                    onChange={setPropertyType}
                    options={["House", "Apartment", "Duplex", "Villa"]}
                    placeholder="Property Type"
                  />
                </div>

                <div className="flex-1">
                  <DropdownSelect
                    value={rooms}
                    onChange={setRooms}
                    options={["1 Room", "2 Rooms", "3 Rooms", "4+ Rooms"]}
                    placeholder="Rooms"
                  />
                </div>

                <div className="flex-1">
                  <DropdownSelect
                    value={priceRange}
                    onChange={setPriceRange}
                    options={[
                      "₦0 - ₦100M",
                      "₦100M - ₦300M",
                      "₦300M - ₦500M",
                      "₦500M+",
                    ]}
                    placeholder="Price"
                  />
                </div>
              </div>

              {/* More Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors lg:flex-shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">More Filters</span>
              </button>

              {/* Search Button */}
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center lg:flex-shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* More Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 py-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Bathrooms
                  </label>
                  <DropdownSelect
                    value={minBathrooms}
                    onChange={setMinBathrooms}
                    options={["Any", "1+", "2+", "3+", "4+"]}
                    placeholder="Any"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Square Feet
                  </label>
                  <DropdownSelect
                    value={minSqft}
                    onChange={setMinSqft}
                    options={["Any", "500+", "1000+", "1500+", "2000+"]}
                    placeholder="Any"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setMinBathrooms("Any");
                      setMinSqft("Any");
                    }}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Properties for Sale in{" "}
              <span className="text-red-600">ABUJA, NIGERIA</span>
            </h1>
            <p className="text-gray-600">
              <span className="font-semibold">{sortedProperties.length}</span>{" "}
              Available
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <DropdownSelect
                value={
                  sortBy === "lowest-price"
                    ? "Lowest Price"
                    : sortBy === "highest-price"
                    ? "Highest Price"
                    : sortBy === "newest"
                    ? "Newest"
                    : "Oldest"
                }
                onChange={(value) => {
                  setSortBy(
                    value === "Lowest Price"
                      ? "lowest-price"
                      : value === "Highest Price"
                      ? "highest-price"
                      : value === "Newest"
                      ? "newest"
                      : "oldest"
                  );
                }}
                options={["Lowest Price", "Highest Price", "Newest", "Oldest"]}
                placeholder="Sort by"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 ${
                  viewType === "grid"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 ${
                  viewType === "list"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        <motion.div
          layout
          className={`gap-6 ${
            viewType === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col space-y-6"
          }`}
        >
          <AnimatePresence>
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded ${
                    currentPage === pageNum
                      ? "bg-red-600 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
