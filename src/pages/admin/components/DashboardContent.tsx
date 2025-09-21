import React from "react";
import { MapPin, MoreVertical } from "lucide-react";

const DashboardContent: React.FC = () => {
  // Mock data for statistics
  const stats = [
    {
      title: "Total Listed Properties",
      value: "12,456",
    },
    {
      title: "Total Properties for Sale",
      value: "8,602",
    },
    // {
    //   title: "Total Properties for Rent",
    //   value: "3,234",
    // },
    {
      title: "Total Tour Request",
      value: "16",
    },
  ];

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

  // Mock data for tour requests
  const tourRequests = [
    {
      id: 1,
      clientName: "Chizoba Odita",
      date: "20 July, 2025",
      email: "strongestavenger@example.co...",
      message: "hello I have an issue with regist...",
    },
    {
      id: 2,
      clientName: "John Doe",
      date: "19 July, 2025",
      email: "johndoe@example.com",
      message: "I would like to schedule a tour...",
    },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-[#FFF4F4] p-6 rounded-lg w-full h-[135px] flex flex-col  flex-grow`}>
            <h3 className="text-sm font-medium text-gray_text2 mb-5">
              {stat.title}
            </h3>
            <p className="text-[31px] font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
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
              {newlyListedProperties.map((property) => (
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
              ))}
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
              {tourRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {request.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray_text2">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
