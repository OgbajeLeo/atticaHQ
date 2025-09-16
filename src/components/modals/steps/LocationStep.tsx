import React, { useState } from "react";
import type { PropertyFormData } from "../NewPropertyModal";

interface LocationStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
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
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLandmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ closestLandmark: e.target.value });
    setShowSuggestions(e.target.value.length > 0);
  };

  const selectLandmark = (landmark: string) => {
    updateFormData({ closestLandmark: landmark });
    setShowSuggestions(false);
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
          Property Location
        </label>
        <input
          type="text"
          value={formData.propertyLocation}
          onChange={(e) => updateFormData({ propertyLocation: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
          placeholder="Enter address"
        />
      </div>

      {/* Closest Landmark */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Closest Landmark
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.closestLandmark}
            onChange={handleLandmarkChange}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
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

      {/* Map */}
      <div className="rounded-lg overflow-hidden border">
        <div className="bg-gray-100 h-96 flex items-center justify-center text-gray-500 text-sm relative">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p>Interactive Map</p>
            <p className="text-xs mt-1">Map integration would go here</p>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <button className="px-3 py-1 bg-white rounded text-sm font-medium shadow">
              Map
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-600">
              Satellite
            </button>
          </div>

          <div className="absolute top-4 right-4">
            <button className="p-2 bg-white rounded shadow">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-1">
            <button className="p-2 bg-white rounded shadow">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button className="p-2 bg-white rounded shadow">
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
                  d="M18 12H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onSubmit}
          className="w-full max-w-md bg-primary_color text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Save Property
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
