import React from "react";

interface MessageSkeletonProps {
  count?: number;
}

const MessageSkeleton: React.FC<MessageSkeletonProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
              <div className="ml-4">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default MessageSkeleton;
