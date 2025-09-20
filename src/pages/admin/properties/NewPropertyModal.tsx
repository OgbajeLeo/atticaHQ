import React, { useState } from "react";
import OverviewStep from "./steps/OverviewStep";
import ListingDetailsStep from "./steps/ListingDetailsStep";
import AmenitiesStep from "./steps/AmenitiesStep";
import LocationStep from "./steps/LocationStep";
import {
  validateOverviewStep,
  validateListingDetailsStep,
  validateAmenitiesStep,
  validateLocationStep,
} from "../../../utils/validation";

export interface PropertyFormData {
  propertyTitle: string;
  propertyType: string;
  category: string;
  annualPrice: string;
  monthlyPrice: string;
  description: string;
  photos: string[];
  sizeInFt: string;
  numberOfBathrooms: string;
  numberOfGarages: string;
  yearBuilt: string;
  floodWarning: string;
  negotiable: string;
  numberOfBedrooms: string;
  numberOfKitchens: string;
  isFeatured: string;
  floorsNo: string;
  architectureType: string;
  videoUrl: string;
  amenities: string[];
  propertyLocation: string;
  closestLandmark: string;
  coordinates?: string;
}

interface NewPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPropertyModal: React.FC<NewPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyTitle: "3 Bedroom Furnished Flat",
    propertyType: "Flat",
    category: "Buy",
    annualPrice: "₦160,000,000",
    monthlyPrice: "₦5,000,000",
    description: "",
    photos: [],
    sizeInFt: "3210",
    numberOfBathrooms: "3",
    numberOfGarages: "2",
    yearBuilt: "2001",
    floodWarning: "Yes",
    negotiable: "Yes",
    numberOfBedrooms: "4",
    numberOfKitchens: "2",
    isFeatured: "No",
    floorsNo: "3",
    architectureType: "Mid-Century Modern",
    videoUrl: "",
    amenities: ["Swimming Pool", "Parking", "Disabled Access", "Pet Friendly"],
    propertyLocation: "33 Road by Old Festac Town, Lagos Nigeria",
    closestLandmark: "Chicken Republic, Zone 5",
  });

  const steps = [
    { id: 1, title: "Overview", component: OverviewStep },
    { id: 2, title: "Listing Details", component: ListingDetailsStep },
    { id: 3, title: "Amenities/Features", component: AmenitiesStep },
    { id: 4, title: "Location", component: LocationStep },
  ];

  const updateFormData = (data: Partial<PropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = true;

    switch (currentStep) {
      case 1:
        isValid = validateOverviewStep(formData).isValid;
        break;
      case 2:
        isValid = validateListingDetailsStep(formData).isValid;
        break;
      case 3:
        isValid = validateAmenitiesStep(formData).isValid;
        break;
      case 4:
        isValid = validateLocationStep(formData).isValid;
        break;
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Final validation before submission
    const finalValidation = validateLocationStep(formData);

    if (!finalValidation.isValid) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    console.log(formData, "=== END OF FORM DATA ===");

    // Here you would typically send the data to your API endpoint
    alert(
      "Property data has been logged to console. Check the browser console for details."
    );
    onClose();
  };

  const getBreadcrumb = () => {
    const breadcrumbItems = steps
      .map((step, index) => {
        if (index + 1 < currentStep) {
          return (
            <span
              onClick={() => setCurrentStep(step.id)}
              key={step.id}
              className="text-gray-500 cursor-pointer"
            >
              {step.title} &nbsp; &gt;
            </span>
          );
        } else if (index + 1 === currentStep) {
          return (
            <span
              onClick={() => setCurrentStep(step.id)}
              key={step.id}
              className="text-primary_color font-semibold cursor-pointer"
            >
              {step.title} &nbsp; &gt;
            </span>
          );
        }
        return null;
      })
      .filter(Boolean);

    return breadcrumbItems.map((item, index) => (
      <React.Fragment key={index}>
        {item}
        {index < breadcrumbItems.length - 1 && (
          <span className="mx-2 text-gray-400"></span>
        )}
      </React.Fragment>
    ));
  };

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] no-scrollbar overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 py-4 border-b  border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            {currentStep > 1 && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                {getBreadcrumb()}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
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

        {/* Step Content */}
        <div className="p-6">
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPropertyModal;
