import React, { useState, useEffect } from "react";
import type { PropertyFormData } from "../NewPropertyModal";
import InteractiveMap from "../../../../components/InteractiveMap";
import {
  validateLocationStep,
  getFieldError,
  type ValidationError,
} from "../../../../utils/validation";

interface LocationStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const suggestedLandmarks = [
  {
    name: "Restaurant Henrik",
    description: "Restaurant Henrik og kompani, Mogouli",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=center",
  },
  {
    name: "Restaurant Henrik",
    description: "Restaurant Henrik og kompani, Mogouli",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=center",
  },
  {
    name: "Restaurant Henrik",
    description: "Restaurant Henrik og kompani, Mogouli",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=center",
  },
];

const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  updateFormData,
  //   onPrev,
  onSubmit,
  isSubmitting = false,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
    address: "New York, NY, USA",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form data whenever it changes
  useEffect(() => {
    const validationResult = validateLocationStep(formData);
    setErrors(validationResult.errors);
  }, [formData]);

  const handleSubmit = () => {
    const validationResult = validateLocationStep(formData);
    if (validationResult.isValid) {
      onSubmit();
    } else {
      setErrors(validationResult.errors);
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldErrorClass = (fieldName: string) => {
    const hasError = touched[fieldName] && getFieldError(errors, fieldName);
    return hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-primary_color";
  };

  // Geocoding function to convert address to coordinates
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lng),
          address: data[0].display_name,
        };
        setCurrentLocation(location);
        updateFormData({
          propertyLocation: data[0].display_name,
          coordinates: `${location.lat},${location.lng}`,
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle location input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.propertyLocation && formData.propertyLocation.length > 3) {
        geocodeAddress(formData.propertyLocation);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.propertyLocation]);

  const handleLandmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange("closestLandmark", e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const selectLandmark = (landmark: string) => {
    updateFormData({ closestLandmark: landmark });
    setShowSuggestions(false);
  };

  const handleLocationChange = (location: any) => {
    setCurrentLocation(location);
    updateFormData({
      propertyLocation: location.address,
      coordinates: `${location.lat},${location.lng}`,
    });
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      {/* <div className="flex items-center text-sm text-gray-500 mb-4">
        <button onClick={onPrev} className="text-primary_color hover:underline">
          &lt; Back to Overview
        </button>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-400">Listing Details</span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-400">Amenities/Features</span>
        <span className="mx-2">&gt;</span>
        <span className="text-primary_color font-semibold">Location</span>
      </div> */}

      {/* Property Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Location *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.propertyLocation}
            onChange={(e) =>
              handleFieldChange("propertyLocation", e.target.value)
            }
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "propertyLocation"
            )}`}
            placeholder="Enter address or landmark"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-primary_color border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        {touched.propertyLocation &&
          getFieldError(errors, "Property Location") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Property Location")}
            </p>
          )}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  const location = {
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    address: result.display_name,
                  };
                  handleLocationChange(location);
                  setSearchResults([]);
                }}
              >
                <p className="font-medium text-gray-900">
                  {result.display_name}
                </p>
                {result.address && (
                  <p className="text-sm text-gray-500">
                    {Object.values(result.address).filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Closest Landmark */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Closest Landmark *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.closestLandmark}
            onChange={handleLandmarkChange}
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "closestLandmark"
            )}`}
            placeholder="Type to search..."
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
        {touched.closestLandmark &&
          getFieldError(errors, "Closest Landmark") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Closest Landmark")}
            </p>
          )}

        {/* Suggested Landmarks */}
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestedLandmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{landmark.name}</p>
                  <p className="text-sm text-gray-500">
                    {landmark.description}
                  </p>
                </div>
                <button
                  onClick={() => selectLandmark(landmark.name)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Map */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Location Map
        </label>
        <InteractiveMap
          propertyLocation={currentLocation}
          onLocationChange={handleLocationChange}
          searchQuery={formData.propertyLocation}
          onSearchResults={handleSearchResults}
          height="400px"
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full max-w-md bg-primary_color text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSubmitting ? "Creating..." : "Save Property"}
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
