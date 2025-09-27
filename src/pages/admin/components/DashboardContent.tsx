import React, { useEffect, useState } from "react";
import { MapPin, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthApi, formatDateToDisplay } from "../../../utils";
import type { Message } from "../../../types/message";
import StatsSkeleton from "./StatsSkeleton";
import PropertiesTableSkeleton from "./PropertiesTableSkeleton";
import TourRequestsSkeleton from "./TourRequestsSkeleton";
interface Stat {
  title: string;
  value: string;
}
const DashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stat[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  const getState = async () => {
    try {
      setStatsLoading(true);
      const res = (await AuthApi.GetOverview()) as any;
      setStats(res.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    getState();
    getAllMessages();
    getProperties();
  }, []);

  const getAllMessages = async () => {
    try {
      setMessagesLoading(true);
      const res = (await AuthApi.AllMessages()) as any;
      setMessages(res.messages);
    } catch (error) {
      console.log(error);
    } finally {
      setMessagesLoading(false);
    }
  };
  const getProperties = async () => {
    try {
      setPropertiesLoading(true);
      const res = (await AuthApi.AllProperties()) as any;
      setProperties(res.properties);
    } catch (error) {
      console.log(error);
    } finally {
      setPropertiesLoading(false);
    }
  };

  useEffect(() => {}, []);

  const handleMessageClick = (messageId: number) => {
    navigate(`/admin/messages/${messageId}`);
  };

  // Helper function to format property price
  const formatPropertyPrice = (property: any) => {
    if (property.propertyTag === "rent") {
      if (property.monthlyPrice > 0) {
        return `₦${property.monthlyPrice.toLocaleString()}/month`;
      } else if (property.annualPrice > 0) {
        const monthlyRate = property.annualPrice / 12;
        return `₦${monthlyRate.toLocaleString()}/month`;
      }
    } else {
      return `₦${property.annualPrice?.toLocaleString() || "0"}`;
    }
    return "Price not available";
  };

  // Helper function to format property title (truncate if too long)
  const formatPropertyTitle = (title: string) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    }
    return title;
  };

  return (
    <div className="space-y-8 w-full">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
        {statsLoading ? (
          <StatsSkeleton count={4} />
        ) : (
          stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-[#FFF4F4] p-6 rounded-lg w-full h-[135px] flex flex-col  flex-grow`}
            >
              <h3 className="text-sm font-medium text-gray_text2 mb-5">
                {stat.title}
              </h3>
              <p className="text-[31px] font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Newly Listed Properties */}
      <div className="bg-white rounded-lg shadow-sm border border-gray_text1">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Newly Listed</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Listed Date
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Property Type
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {propertiesLoading ? (
                <PropertiesTableSkeleton count={3} />
              ) : (
                properties.slice(0, 5).map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={
                              property.photos && property.photos.length > 0
                                ? property.photos[0]
                                : "/src/assets/property.jpg"
                            }
                            alt={property.propertyTitle}
                            onError={(e) => {
                              e.currentTarget.src = "/src/assets/property.jpg";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {formatPropertyTitle(property.propertyTitle)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.propertyLocation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToDisplay(property.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {property.propertyTag}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPropertyPrice(property)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.propertyType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.isFeatured === "1"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {property.isFeatured === "1" ? "Featured" : "Available"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray_text2">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tour Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray_text1">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Tour Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Client's Name
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-sm text-gray_text3 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messagesLoading ? (
                <TourRequestsSkeleton count={4} />
              ) : (
                messages.slice(0, 4).map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleMessageClick(request.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateToDisplay(request.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 line-clamp-3">
                      {request.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-gray-400 hover:text-gray_text2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle more actions here if needed
                        }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
