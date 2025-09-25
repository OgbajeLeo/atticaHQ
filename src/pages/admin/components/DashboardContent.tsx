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

  const getState = async () => {
    try {
      setStatsLoading(true);
      const res = (await AuthApi.GetOverview()) as any;
      console.log(res.stats.shift());
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
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

  // Mock data for newly listed properties
  const newlyListedProperties = [
    {
      id: 1,
      image: "/src/assets/property.jpg",
      name: "Brand new luxury 9 Bedroom Dup...",
      location: "Guzape, Abuja",
      listedDate: "20 July, 2025",
      category: "Buy",
      price: "₦300,000,000",
      propertyType: "Apartment",
      status: "Available",
    },
    {
      id: 2,
      image: "/src/assets/property.jpg",
      name: "Modern 5 Bedroom Villa",
      location: "Asokoro, Abuja",
      listedDate: "19 July, 2025",
      category: "Buy",
      price: "₦250,000,000",
      propertyType: "Villa",
      status: "Available",
    },
    {
      id: 3,
      image: "/src/assets/property.jpg",
      name: "Luxury Penthouse",
      location: "Maitama, Abuja",
      listedDate: "18 July, 2025",
      category: "Rent",
      price: "₦5,000,000/month",
      propertyType: "Penthouse",
      status: "Unavailable",
    },
  ];

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
                newlyListedProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={property.image}
                            alt={property.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {property.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.listedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.propertyType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {property.status}
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
