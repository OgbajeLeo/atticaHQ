import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthApi } from "../../../utils";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  CameraIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BedIcon from "../../../components/iconComponent/BedIcon";
import BathIcon from "../../../components/iconComponent/BathIcon";
import PropertyIcon from "../../../components/iconComponent/PropertyIcon";
import SqrMtr from "../../../components/iconComponent/SqrMtr";

interface PropertyDetails {
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
  floodWarning: boolean;
  closestLandmark: string;
  isFeatured: boolean;
  isMainFeatured: boolean;
  isSold: boolean;
  status: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfKitchens: number;
  numberOfGarages: number;
  yearBuilt: number;
  propertyType: string;
  videoUrl: string;
  negotiable: boolean;
  coordinates: any;
  nearby: any[];
  photos: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    specifications: true,
    amenities: false,
    location: false,
    meta: false,
  });
  const navigate = useNavigate();

  const getPropertyDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = (await AuthApi.GetPropertyByID(id)) as any;
      setPropertyDetails(res.property);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyDetails();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const openGallery = () => {
    setGalleryImageIndex(activeImage);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    if (!propertyDetails?.photos) return;
    setGalleryImageIndex((prev) =>
      prev === propertyDetails.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!propertyDetails?.photos) return;
    setGalleryImageIndex((prev) =>
      prev === 0 ? propertyDetails.photos.length - 1 : prev - 1
    );
  };

  const selectGalleryImage = (index: number) => {
    setGalleryImageIndex(index);
  };

  const toggleShowAllThumbnails = () => {
    setShowAllThumbnails(!showAllThumbnails);
  };

  const CollapsibleSection = ({
    title,
    isExpanded,
    onToggle,
    children,
  }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-accent">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  if (!propertyDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-gray_text2">Property not found</p>
        <button
          onClick={() => navigate("/admin/properties")}
          className="mt-4 px-4 py-2 bg-primary_color text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary_color">
          Property Details
        </h2>
        <button
          onClick={() => navigate("/admin/properties")}
          className="px-4 py-2 text-gray_text2 border border-gray_text2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to Properties
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          {propertyDetails.photos && propertyDetails.photos.length > 0 && (
            <div className="mb-8">
              <div className="relative">
                <img
                  src={propertyDetails.photos[activeImage]}
                  alt="Property main view"
                  className="w-full h-96 object-cover rounded-lg"
                />

                <div className="absolute bottom-4 left-4 flex items-center gap-5">
                  <button
                    onClick={openGallery}
                    className="flex items-center gap-2 bg-primary_color bg-opacity-70 text-white px-3 py-3 rounded-xl text-sm hover:bg-opacity-80 transition-all duration-200"
                  >
                    <CameraIcon className="w-4 h-4" />
                    Show {propertyDetails.photos.length} photos
                  </button>
                  <div className="bg-[#F6F7FF4D]/50 border border-white text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    View on map
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  {(showAllThumbnails
                    ? propertyDetails.photos
                    : propertyDetails.photos.slice(0, 2)
                  ).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Property view ${index + 1}`}
                      className={`w-20 h-16 sm:w-24 sm:h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                        activeImage === index
                          ? "border-gray_text2 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray_text2"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>

                {!showAllThumbnails && propertyDetails.photos.length > 2 && (
                  <button
                    onClick={toggleShowAllThumbnails}
                    className="mt-3 text-sm text-gray_text2 font-medium transition-colors duration-200"
                  >
                    Show {propertyDetails.photos.length - 2} more photos
                  </button>
                )}

                {showAllThumbnails && propertyDetails.photos.length > 2 && (
                  <button
                    onClick={toggleShowAllThumbnails}
                    className="mt-3 text-sm text-gray_text2 hover:text-gray-700 font-medium transition-colors duration-200"
                  >
                    Show less
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Property Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-primary_color">
                {formatPrice(propertyDetails.annualPrice)}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray_text2">
                <div
                  className={`border px-3 py-1 rounded text-sm font-medium ${
                    propertyDetails.propertyTag === "rent"
                      ? "bg-[#FFF4F4] border-accent text-accent"
                      : "bg-[#F0F8FF] border-blue-500 text-blue-600"
                  }`}
                >
                  For {propertyDetails.propertyTag === "rent" ? "Rent" : "Sale"}
                </div>
                <div className="flex items-center gap-2">
                  {propertyDetails.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                  {propertyDetails.negotiable && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Negotiable
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-gray_text2 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="size-3" />
                <span>{propertyDetails.propertyLocation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatDate(propertyDetails.createdAt)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 lg:p-4 rounded-lg">
              <div className="text-center flex items-center text-gray_text2 gap-1">
                <PropertyIcon />
                <div className="text-sm text-gray_text2">Property Type</div>
                <div className="font-semibold text-accent">
                  {propertyDetails.propertyType}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <BedIcon />
                <div className="text-sm text-gray_text2">Bedrooms</div>
                <div className="font-semibold flex text-accent items-center justify-center gap-1">
                  {propertyDetails.numberOfBedrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <BathIcon />
                <div className="text-sm text-gray_text2">Bathrooms</div>
                <div className="font-semibold text-accent flex items-center justify-center gap-1">
                  {propertyDetails.numberOfBathrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <SqrMtr />
                <div className="text-sm text-gray_text2">Floors</div>
                <div className="font-semibold text-accent flex items-center justify-center gap-1">
                  {propertyDetails.floorsNo}
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-0">
            <CollapsibleSection
              title="Description"
              isExpanded={expandedSections.description}
              onToggle={() => toggleSection("description")}
            >
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {propertyDetails.description}
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Property Specifications"
              isExpanded={expandedSections.specifications}
              onToggle={() => toggleSection("specifications")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li>• Bedrooms: {propertyDetails.numberOfBedrooms}</li>
                  <li>• Bathrooms: {propertyDetails.numberOfBathrooms}</li>
                  <li>• Kitchens: {propertyDetails.numberOfKitchens}</li>
                  <li>• Garages: {propertyDetails.numberOfGarages}</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Property Type: {propertyDetails.propertyType}</li>
                  <li>• Year Built: {propertyDetails.yearBuilt}</li>
                  <li>• Number of Floors: {propertyDetails.floorsNo}</li>
                  <li>• Property Tag: {propertyDetails.propertyTag}</li>
                </ul>
              </div>
            </CollapsibleSection>

            {propertyDetails.amenities &&
              propertyDetails.amenities.length > 0 && (
                <CollapsibleSection
                  title="Amenities and Features"
                  isExpanded={expandedSections.amenities}
                  onToggle={() => toggleSection("amenities")}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {propertyDetails.amenities.map((amenity, index) => (
                      <div key={index} className="text-sm py-1">
                        • {amenity}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

            <CollapsibleSection
              title="Location Information"
              isExpanded={expandedSections.location}
              onToggle={() => toggleSection("location")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Property Location
                  </label>
                  <p className="text-gray-900">
                    {propertyDetails.propertyLocation}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Closest Landmark
                  </label>
                  <p className="text-gray-900">
                    {propertyDetails.closestLandmark}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Flood Warning
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      propertyDetails.floodWarning
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {propertyDetails.floodWarning ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Property Information"
              isExpanded={expandedSections.meta}
              onToggle={() => toggleSection("meta")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Property ID
                  </label>
                  <p className="text-gray-900">{propertyDetails.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Slug
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {propertyDetails.slug}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Category ID
                  </label>
                  <p className="text-gray-900">{propertyDetails.categoryId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      propertyDetails.status === "public"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {propertyDetails.status.charAt(0).toUpperCase() +
                      propertyDetails.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Is Sold
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      propertyDetails.isSold
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {propertyDetails.isSold ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray_text2 mb-1">
                    Created At
                  </label>
                  <p className="text-gray-900">
                    {formatDate(propertyDetails.createdAt)}
                  </p>
                </div>
              </div>
            </CollapsibleSection>

            {propertyDetails.videoUrl && (
              <CollapsibleSection
                title="Property Video"
                isExpanded={false}
                onToggle={() => {}}
              >
                <a
                  href={propertyDetails.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Watch Video
                </a>
              </CollapsibleSection>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border shadow-md border-gray-200 rounded-lg p-6 sticky top-[110px]">
            <h3 className="text-lg font-semibold mb-4 text-primary_color">
              Property Summary
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="text-2xl font-bold text-primary_color mb-2">
                  {formatPrice(propertyDetails.annualPrice)}
                </div>
                <div className="text-sm text-gray_text2">Annual Price</div>
                {propertyDetails.monthlyPrice > 0 && (
                  <div className="text-lg text-gray-600 mt-1">
                    {formatPrice(propertyDetails.monthlyPrice)}/month
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray_text2">Property Type:</span>
                  <span className="font-medium">
                    {propertyDetails.propertyType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray_text2">Bedrooms:</span>
                  <span className="font-medium">
                    {propertyDetails.numberOfBedrooms}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray_text2">Bathrooms:</span>
                  <span className="font-medium">
                    {propertyDetails.numberOfBathrooms}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray_text2">Year Built:</span>
                  <span className="font-medium">
                    {propertyDetails.yearBuilt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray_text2">Status:</span>
                  <span
                    className={`font-medium ${
                      propertyDetails.status === "public"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {propertyDetails.status.charAt(0).toUpperCase() +
                      propertyDetails.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {isGalleryOpen && propertyDetails.photos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={propertyDetails.photos[galleryImageIndex]}
                alt={`Property view ${galleryImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {galleryImageIndex + 1} of {propertyDetails.photos.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto pb-2">
              {propertyDetails.photos.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-12 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                    galleryImageIndex === index
                      ? "border-white"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  onClick={() => selectGalleryImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
