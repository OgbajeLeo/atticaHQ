import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FilterIcon from "../../../components/iconComponent/FilterIcon";
import NewPropertyModal from "../../../components/modals/NewPropertyModal";

interface Property {
  id: number;
  name: string;
  location: string;
  listedDate: string;
  category: "Buy" | "Rent";
  price: string;
  propertyType: string;
  status: "Available" | "Unavailable";
  image: string;
}

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("Guzape");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showNewListingModal, setShowNewListingModal] = useState(false);
  const itemsPerPage = 8;

  const properties: Property[] = [
    {
      id: 1,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Unavailable",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Rent",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 7,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Unavailable",
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 9,
      name: "Modern 5 Bedroom Villa",
      location: "Asokoro, Abuja",
      listedDate: "19 July, 2025",
      category: "Buy",
      price: "₦450,000,000",
      propertyType: "Villa",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 10,
      name: "Luxury Penthouse Suite",
      location: "Maitama, Abuja",
      listedDate: "18 July, 2025",
      category: "Rent",
      price: "₦2,500,000",
      propertyType: "Penthouse",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 11,
      name: "Executive Office Space",
      location: "Wuse 2, Abuja",
      listedDate: "17 July, 2025",
      category: "Rent",
      price: "₦1,200,000",
      propertyType: "Office",
      status: "Unavailable",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 12,
      name: "Family Townhouse",
      location: "Gwarinpa, Abuja",
      listedDate: "16 July, 2025",
      category: "Buy",
      price: "₦180,000,000",
      propertyType: "Townhouse",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=100&fit=crop&crop=center",
    },
  ];

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    if (!searchTerm) return properties;
    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/admin/properties/${propertyId}`);
  };

  return (
    <div className="min-h-screen text-gray_text3">
      {/* Header Section with Search, Filter, and New Listing Button */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center w-1/2  gap-2">
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
        {currentProperties.length === 0 ? (
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
                  <th className="px-6 py-3 text-left tracking-wider">
                    Listed Date
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Property Type
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-gray_text3 divide-y divide-gray-100">
                {currentProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium">
                            {property.name}
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
                            {property.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{property.listedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{property.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {property.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{property.propertyType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {property.status}
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
                ))}
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
