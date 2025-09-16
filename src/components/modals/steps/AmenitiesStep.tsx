import React, { useState } from "react";
import type { PropertyFormData } from "../NewPropertyModal";

interface AmenitiesStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
}

const defaultAmenities = [
  "A/C & Heating",
  "Garages",
  "Swimming Pool",
  "Parking",
  "Lake View",
  "Garden",
  "Disabled Access",
  "Pet Friendly",
  "Ceiling Height",
  "Outdoor Shower",
  "Refrigerator",
  "Fireplace",
  "Wifi",
  "TV Cable",
  "Barbeque",
  "Laundry",
  "Dryer",
  "Lawn",
  "Elevator",
  "Brand New & Tastefully Finished",
  "Modern Contemporary Architecture",
  "Two Floor With Spacious Layout",
  "All Room En-suite",
  "Ante Room & Dining Area",
  "Family Lounge (Upstairs & Downstairs)",
  "Guest Toilet",
  "Boy's Quarters(BQ)",
  "Fully Fitted Kitchen",
  "POP Ceiling",
  "Italian Bathroom Fittings",
  "Water Heaters",
  "Contemporary Lighting",
  "Fire Alarm Systems",
  "Smart Home Automation",
  "CCTV Surveillance",
  "Voice Command Integration",
  "Fully Equipped Gym",
  "Rooftop Lounge",
  "Table Tennis Court",
  "Gated Estate",
  "Access Control",
  "Borehole & Treatment",
  "Stamped Concrete Floors",
  "Ample Car Parking (5-6 Cars)",
  "Built-in Wardrobes",
  "High Ceilings",
  "Jacuzzi & Bathtub",
  "Bluetooth Audio System",
  "Top-Quality Tiles",
  "TV Console & Stayway Lights",
  "Motion Sensor Lighting",
  "Intercom System",
  "Automated Security",
  "Private Cinema Room",
  "Children's Playground",
  "Green Area / Turf",
  "24/7 Security",
  "Security House",
  "24 Hours Electricity",
  "Serene Neighborhood",
];

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({
  formData,
  updateFormData,
  onNext,
//   onPrev,
}) => {
  const [newAmenity, setNewAmenity] = useState("");

  const toggleAmenity = (amenity: string) => {
    const exists = formData.amenities.includes(amenity);
    const updated = exists
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    updateFormData({ amenities: updated });
  };

  const addNewAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      updateFormData({ amenities: [...formData.amenities, newAmenity.trim()] });
      setNewAmenity("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addNewAmenity();
    }
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
        <span className="text-primary_color font-semibold">
          Amenities/Features
        </span>
      </div> */}

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {defaultAmenities.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={formData.amenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
              className="w-4 h-4 text-primary_color accent-primary_color border-gray-300 rounded focus:ring-primary_color"
            />
            <span className="text-sm text-gray_text3">{amenity}</span>
          </label>
        ))}
      </div>

      {/* Add New Feature */}
      <div className="pt-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add custom amenity..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
          />
          <button
            onClick={addNewAmenity}
            className="px-4 py-2 bg-primary_color text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onNext}
          className="w-full max-w-md bg-primary_color text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Continue
        </button>
      </div>

      {/* Add New Feature Link */}
      <div className="text-center">
        <button
          onClick={addNewAmenity}
          className="text-primary_color hover:underline text-sm"
        >
          + Add New Feature
        </button>
      </div>
    </div>
  );
};

export default AmenitiesStep;
