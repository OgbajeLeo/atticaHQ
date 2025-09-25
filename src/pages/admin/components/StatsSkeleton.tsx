import React from "react";

interface StatsSkeletonProps {
  count?: number;
}

const StatsSkeleton: React.FC<StatsSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="bg-[#FFF4F4] p-6 rounded-lg w-full h-[135px] flex flex-col flex-grow animate-pulse"
        >
          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded w-24 mb-5 animate-pulse"></div>

          {/* Value skeleton */}
          <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default StatsSkeleton;
