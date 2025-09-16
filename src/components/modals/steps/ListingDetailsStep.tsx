import React from "react";
import type { PropertyFormData } from "../NewPropertyModal";

interface ListingDetailsStepProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
}

const ListingDetailsStep: React.FC<ListingDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const yesNo = ["Yes", "No"];

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
            Size in ft
          </label>
          <input
            type="text"
            value={formData.sizeInFt}
            onChange={(e) => updateFormData({ sizeInFt: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bedrooms
          </label>
          <input
            type="text"
            value={formData.numberOfBedrooms}
            onChange={(e) =>
              updateFormData({ numberOfBedrooms: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bathroom
          </label>
          <input
            type="text"
            value={formData.numberOfBathrooms}
            onChange={(e) =>
              updateFormData({ numberOfBathrooms: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Kitchens
          </label>
          <input
            type="text"
            value={formData.numberOfKitchens}
            onChange={(e) =>
              updateFormData({ numberOfKitchens: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Garages
          </label>
          <input
            type="text"
            value={formData.numberOfGarages}
            onChange={(e) =>
              updateFormData({ numberOfGarages: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
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
            Year Built
          </label>
          <input
            type="text"
            value={formData.yearBuilt}
            onChange={(e) => updateFormData({ yearBuilt: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="YYYY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floors No
          </label>
          <input
            type="text"
            value={formData.floorsNo}
            onChange={(e) => updateFormData({ floorsNo: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="0"
          />
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
            Architecture Type
          </label>
          <input
            type="text"
            value={formData.architectureType}
            onChange={(e) =>
              updateFormData({ architectureType: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="e.g., Mid-Century Modern"
          />
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
            onChange={(e) => updateFormData({ videoUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="Paste a YouTube Video ID"
          />
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
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-primary_color text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ListingDetailsStep;
