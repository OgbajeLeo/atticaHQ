import React from "react";

interface TourRequestsSkeletonProps {
  count?: number;
}

const TourRequestsSkeleton: React.FC<TourRequestsSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <tr key={index} className="animate-pulse hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-40 animate-pulse"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TourRequestsSkeleton;
