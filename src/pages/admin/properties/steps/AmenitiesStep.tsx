import React, { useState, useEffect } from "react";
import type { PropertyFormData } from "../NewPropertyModal";
import {
  validateAmenitiesStep,
  getFieldError,
  type ValidationError,
} from "../../../../utils/validation";
import { AuthApi } from "../../../../utils";

interface AmenitiesStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

// Skeleton loader component for amenities
const AmenitiesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 animate-pulse"
        >
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded flex-1 max-w-[120px]"></div>
        </div>
      ))}
    </div>
  );
};

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({
  formData,
  updateFormData,
  onNext,
  //   onPrev,
}) => {
  const [newAmenity, setNewAmenity] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const getAmenities = async () => {
    setLoading(true);
    try {
      const res = (await AuthApi.getAmenities()) as any;
      setAmenities(res);
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  // Validate form data whenever it changes
  useEffect(() => {
    const validationResult = validateAmenitiesStep(formData);
    setErrors(validationResult.errors);
  }, [formData]);

  const handleNext = () => {
    const validationResult = validateAmenitiesStep(formData);
    if (validationResult.isValid) {
      onNext();
    } else {
      setErrors(validationResult.errors);
      setTouched((prev) => ({ ...prev, amenities: true }));
    }
  };

  const toggleAmenity = (amenity: string) => {
    const exists = formData.amenities.includes(amenity);
    const updated = exists
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    updateFormData({ amenities: updated });
    setTouched((prev) => ({ ...prev, amenities: true }));
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
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <AmenitiesSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {amenities.map((amenity) => (
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
        )}
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

      {/* Error Message */}
      {touched.amenities && getFieldError(errors, "Amenities") && (
        <div className="text-center">
          <p className="text-sm text-red-600">
            {getFieldError(errors, "Amenities")}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center pt-6">
        <button
          disabled={loading}
          onClick={handleNext}
          className={`w-full max-w-md ${loading ? "opacity-50 cursor-not-allowed" : ""} bg-primary_color text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium`}
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
