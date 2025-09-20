import React, { useRef, useState, useEffect } from "react";
import type { PropertyFormData } from "../NewPropertyModal";
import {
  validateOverviewStep,
  getFieldError,
  type ValidationError,
} from "../../../../utils/validation";

interface OverviewStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
}

const OverviewStep: React.FC<OverviewStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    base64: string | null;
    index: number;
  }>({ isOpen: false, base64: null, index: -1 });
  const [fileError, setFileError] = useState<string>("");

  // Validate form data whenever it changes
  useEffect(() => {
    const validationResult = validateOverviewStep(formData);
    setErrors(validationResult.errors);
  }, [formData]);

  const handleNext = () => {
    const validationResult = validateOverviewStep(formData);
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const getFieldErrorClass = (fieldName: string) => {
    const hasError = touched[fieldName] && getFieldError(errors, fieldName);
    return hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-primary_color";
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    setFileError(""); // Clear previous errors

    // Check if all files are images
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFiles.length > 0) {
      setFileError(
        `Please select only image files. Invalid files: ${invalidFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    try {
      // Convert all files to base64 strings
      const base64Strings = await Promise.all(files.map(convertFileToBase64));

      updateFormData({ photos: [...formData.photos, ...base64Strings] });
    } catch (error) {
      setFileError("Error converting files to base64. Please try again.");
    }
  };

  const removeFile = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  const openPreview = (base64: string, index: number) => {
    setPreviewModal({ isOpen: true, base64, index });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, base64: null, index: -1 });
  };

  const propertyTypes = [
    "Flat",
    "Apartment",
    "Villa",
    "House",
    "Office",
    "Land",
  ];
  const categories = ["Buy", "Rent"];

  return (
    <div className="space-y-6">
      {/* Property Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Title *
        </label>
        <input
          type="text"
          value={formData.propertyTitle}
          onChange={(e) => handleFieldChange("propertyTitle", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
            "propertyTitle"
          )}`}
          placeholder="Enter property title"
        />
        {touched.propertyTitle && getFieldError(errors, "Property Title") && (
          <p className="mt-1 text-sm text-red-600">
            {getFieldError(errors, "Property Title")}
          </p>
        )}
      </div>

      {/* Property Type and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type *
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleFieldChange("propertyType", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "propertyType"
            )}`}
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {touched.propertyType && getFieldError(errors, "Property Type") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Property Type")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
              "category"
            )}`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {touched.category && getFieldError(errors, "Category") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Category")}
            </p>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Price *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.annualPrice}
              onChange={(e) => handleFieldChange("annualPrice", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent pr-10 ${getFieldErrorClass(
                "annualPrice"
              )}`}
              placeholder="₦0"
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {touched.annualPrice && getFieldError(errors, "Annual Price") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Annual Price")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Price *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.monthlyPrice}
              onChange={(e) =>
                handleFieldChange("monthlyPrice", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent pr-10 ${getFieldErrorClass(
                "monthlyPrice"
              )}`}
              placeholder="₦0"
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {touched.monthlyPrice && getFieldError(errors, "Monthly Price") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError(errors, "Monthly Price")}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${getFieldErrorClass(
            "description"
          )}`}
          placeholder="Write about this property..."
        />
        {touched.description && getFieldError(errors, "Description") && (
          <p className="mt-1 text-sm text-red-600">
            {getFieldError(errors, "Description")}
          </p>
        )}
      </div>

      {/* Photos/Video */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Photos/Video *
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-primary_color text-white rounded-lg hover:bg-opacity-90 transition-colors"
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Upload File
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* File List */}
        {formData.photos.length > 0 && (
          <div className="space-y-3 overflow-auto h-[210px] ">
            {formData.photos.map((base64, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={base64}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Image {index + 1}
                  </p>
                  <p className="text-xs text-gray-500">Base64 Image</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openPreview(base64, index)}
                    className="text-sm text-primary_color hover:underline"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => removeFile(index)}
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
              </div>
            ))}
          </div>
        )}

        {/* File Error */}
        {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}

        {touched.photos && getFieldError(errors, "Photos") && (
          <p className="mt-1 text-sm text-red-600">
            {getFieldError(errors, "Photos")}
          </p>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={handleNext}
          className="w-full max-w-md bg-primary_color text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Continue
        </button>
      </div>

      {/* Preview Modal */}
      {previewModal.isOpen && previewModal.base64 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray_text3">
                Image {previewModal.index + 1}
              </h3>
              <button
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
            <div className="p-4">
              <img
                src={previewModal.base64}
                alt={`Image ${previewModal.index + 1}`}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewStep;
