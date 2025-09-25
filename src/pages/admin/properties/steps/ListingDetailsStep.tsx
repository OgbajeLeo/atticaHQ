import React, { useState, useEffect } from "react";
import type { PropertyFormData } from "../NewPropertyModal";
import {
  validateListingDetailsStep,
  getFieldError,
  type ValidationError,
} from "../../../../utils/validation";

interface ListingDetailsStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const ListingDetailsStep: React.FC<ListingDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const yesNo = ["Yes", "No"];
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form data whenever it changes
  useEffect(() => {
    const validationResult = validateListingDetailsStep(formData);
    setErrors(validationResult.errors);
  }, [formData]);

  const handleNext = () => {
    const validationResult = validateListingDetailsStep(formData);
    if (validationResult.isValid) {
      onNext();
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

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      {/* <div className="flex items-center text-sm text-gray-500 mb-4">
        <button onClick={onPrev} className="text-primary_color hover:underline">
          &lt; Back to Overview
        </button>
        <span className="mx-2">&gt;</span>
        <span className="text-primary_color font-semibold">
          Listing Details
        </span>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size in ft *
          </label>
          <input
            type="text"
            value={formData.sizeInFt}
            onChange={(e) => handleFieldChange("sizeInFt", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "sizeInFt"
            )}`}
            placeholder="0"
          />
          {touched.sizeInFt && getFieldError(errors, "Size") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Size")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bedrooms *
          </label>
          <input
            type="text"
            value={formData.numberOfBedrooms}
            onChange={(e) =>
              handleFieldChange("numberOfBedrooms", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "numberOfBedrooms"
            )}`}
            placeholder="0"
          />
          {touched.numberOfBedrooms &&
            getFieldError(errors, "Number of Bedrooms") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError(errors, "Number of Bedrooms")}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bathroom *
          </label>
          <input
            type="text"
            value={formData.numberOfBathrooms}
            onChange={(e) =>
              handleFieldChange("numberOfBathrooms", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "numberOfBathrooms"
            )}`}
            placeholder="0"
          />
          {touched.numberOfBathrooms &&
            getFieldError(errors, "Number of Bathrooms") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError(errors, "Number of Bathrooms")}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Kitchens *
          </label>
          <input
            type="text"
            value={formData.numberOfKitchens}
            onChange={(e) =>
              handleFieldChange("numberOfKitchens", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "numberOfKitchens"
            )}`}
            placeholder="0"
          />
          {touched.numberOfKitchens &&
            getFieldError(errors, "Number of Kitchens") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError(errors, "Number of Kitchens")}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Garages *
          </label>
          <input
            type="text"
            value={formData.numberOfGarages}
            onChange={(e) =>
              handleFieldChange("numberOfGarages", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "numberOfGarages"
            )}`}
            placeholder="0"
          />
          {touched.numberOfGarages &&
            getFieldError(errors, "Number of Garages") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError(errors, "Number of Garages")}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is this a Featured Property?
          </label>
          <select
            value={formData.isFeatured}
            onChange={(e) => updateFormData({ isFeatured: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            {["No", "Yes"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Built *
          </label>
          <input
            type="number"
            value={formData.yearBuilt}
            onChange={(e) =>
              handleFieldChange("yearBuilt", Number(e.target.value))
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "yearBuilt"
            )}`}
            placeholder="YYYY"
          />
          {touched.yearBuilt && getFieldError(errors, "Year Built") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Year Built")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floors No *
          </label>
          <input
            type="text"
            value={formData.floorsNo}
            onChange={(e) => handleFieldChange("floorsNo", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "floorsNo"
            )}`}
            placeholder="0"
          />
          {touched.floorsNo && getFieldError(errors, "Number of Floors") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Number of Floors")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Flood Warning
          </label>
          <select
            value={formData.floodWarning}
            onChange={(e) => updateFormData({ floodWarning: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            {yesNo.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Architecture Type *
          </label>
          <input
            type="text"
            value={formData.architectureType}
            onChange={(e) =>
              handleFieldChange("architectureType", e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "architectureType"
            )}`}
            placeholder="e.g., Mid-Century Modern"
          />
          {touched.architectureType &&
            getFieldError(errors, "Architecture Type") && (
              <p className="mt-1 text-sm text-red-600">
                {getFieldError(errors, "Architecture Type")}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Negotiable?
          </label>
          <select
            value={formData.negotiable}
            onChange={(e) => updateFormData({ negotiable: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            {yesNo.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Url
          </label>
          <input
            type="text"
            value={formData.videoUrl}
            onChange={(e) => handleFieldChange("videoUrl", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "videoUrl"
            )}`}
            placeholder="Paste a YouTube Video ID"
          />
          {touched.videoUrl && getFieldError(errors, "Video URL") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Video URL")}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-4 py-3 rounded-lg border text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-lg bg-primary_color text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ListingDetailsStep;
