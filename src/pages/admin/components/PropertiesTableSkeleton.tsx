import React from "react";

interface PropertiesTableSkeletonProps {
  count?: number;
}

const PropertiesTableSkeleton: React.FC<PropertiesTableSkeletonProps> = ({
  count = 3,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <tr key={index} className="animate-pulse hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              {/* Image skeleton */}
              <div className="flex-shrink-0 h-12 w-12">
                <div className="h-12 w-12 rounded-lg bg-gray-200 animate-pulse"></div>
              </div>
              <div className="ml-4">
                {/* Property name skeleton */}
                <div className="h-4 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
                {/* Location skeleton */}
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-gray-200 rounded mr-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default PropertiesTableSkeleton;
