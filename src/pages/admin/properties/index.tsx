import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterIcon from "../../../components/iconComponent/FilterIcon";
import NewPropertyModal from "./NewPropertyModal";
import PropertiesTableSkeleton from "../components/PropertiesTableSkeleton";
import { AuthApi, formatDateToDisplay } from "../../../utils";

interface Property {
  id: number;
  uuid: string | null;
  slug: string;
  propertyTitle: string;
  propertyLocation: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  propertyTag: string;
  categoryId: number;
  floorsNo: string;
  floodWarning: string;
  closestLandmark: string;
  isFeatured: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfKitchens: number;
  numberOfGarages: number;
  yearBuilt: number;
  propertyType: string;
  videoUrl: string;
  negotiable: string;
  coordinates: any;
  nearby: any[];
  photos: string[];
  amenities: string[];
  created_at: string;
  updated_at: string;
}

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showNewListingModal, setShowNewListingModal] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const itemsPerPage = 8;

  // Helper function to format property price
  const formatPropertyPrice = (property: Property) => {
    if (property.propertyTag === "rent") {
      if (property.monthlyPrice > 0) {
        return `₦${property.monthlyPrice.toLocaleString()}/month`;
      } else if (property.annualPrice > 0) {
        const monthlyRate = property.annualPrice / 12;
        return `₦${monthlyRate.toLocaleString()}/month`;
      }
    } else {
      return `₦${property.annualPrice?.toLocaleString() || "0"}`;
    }
    return "Price not available";
  };

  // Helper function to format property title (truncate if too long)
  const formatPropertyTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  // API call to fetch properties
  const getProperties = async () => {
    try {
      setPropertiesLoading(true);
      const res = (await AuthApi.AllProperties()) as any;
      setProperties(res.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    if (!searchTerm) return properties;
    return properties.filter(
      (property) =>
        property.propertyTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.propertyLocation
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, properties]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/admin/properties/${propertyId}`);
  };

  return (
    <div className="min-h-screen text-gray_text3 select-none">
      {/* Header Section with Search, Filter, and New Listing Button */}
      <div className="mb-6 sticky top-0 bg-white z-10 ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center w-full lg:w-1/2  gap-2">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md text-gray_text3 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
                placeholder="Search location..."
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                className="text-gray_text3 px-4 py-3 rounded-xl border border-gray-300 transition-colors flex items-center gap-2"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                Filter
                <FilterIcon />
              </button>
            </div>
          </div>

          {/* New Listing Button */}
          <button
            onClick={() => setShowNewListingModal(true)}
            className="w-fit  justify-center  px-6 py-3 border bg-primary_color rounded-xl text-white transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>New Listing</span>
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="rounded-lg overflow-hidden">
        {currentProperties.length === 0 && !propertiesLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray_text3">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No properties found</h3>
            <p className="text-sm text-gray-500 text-center">
              {searchTerm
                ? "No properties match your current search. Try adjusting your search criteria."
                : "No properties available at the moment."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="text-gray_text3 bg-gray-50 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left tracking-wider w-full">
                    Listed Date
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left tracking-wider w-full">
                    Property Type
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-gray_text3 divide-y divide-gray-100">
                {propertiesLoading ? (
                  <PropertiesTableSkeleton count={8} />
                ) : (
                  currentProperties.map((property) => (
                    <tr
                      key={property.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => handlePropertyClick(property.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              property.photos && property.photos.length > 0
                                ? property.photos[0]
                                : "/src/assets/property.jpg"
                            }
                            alt={property.propertyTitle}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/src/assets/property.jpg";
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium">
                              {formatPropertyTitle(property.propertyTitle)}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {property.propertyLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {formatDateToDisplay(property.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm capitalize">
                          {property.propertyTag}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          {formatPropertyPrice(property)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{property.propertyType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            property.isFeatured === "1"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {property.isFeatured === "1"
                            ? "Featured"
                            : "Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            className="border-gray-700 border text-gray_text3 size-10 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Show first page */}
          {currentPage > 3 && (
            <>
              <button
                className="rounded-lg transition-colors size-10 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {currentPage > 4 && (
                <button className="bg-gray-700 text-white size-10 flex items-center justify-center rounded-lg hover:bg-gray-600 transition-colors">
                  ...
                </button>
              )}
            </>
          )}

          {/* Show pages around current page */}
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
                className={`size-10 flex items-center justify-center rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? "bg-primary_color text-white"
                    : "border-gray-700 border text-gray_text3"
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Show last page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <button className="bg-gray-700 text-white size-10 flex items-center justify-center rounded-lg transition-colors">
                  ...
                </button>
              )}
              <button
                className="size-10 flex items-center justify-center rounded-lg transition-colors bg-gray-700 text-white"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="border-gray-700 border text-gray_text3 size-10 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
      {/* New Listing Modal */}
      <NewPropertyModal
        isOpen={showNewListingModal}
        onClose={() => setShowNewListingModal(false)}
      />
    </div>
  );
};

export default PropertiesPage;
