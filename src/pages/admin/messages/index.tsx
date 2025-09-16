import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const itemsPerPage = 10;

  // Sample messages data with more variety for testing
  const allMessages = [
    {
      id: 1,
      clientName: "Chizoba Odita",
      date: "20 July, 2025",
      email: "strongestavenger@example.com",
      message:
        "hello I have an issue with registering for the property viewing. Can you please help me with this?",
      status: "Unread",
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      date: "19 July, 2025",
      email: "sarah.j@example.com",
      message:
        "I'm interested in scheduling a property tour for next week. What are your available times?",
      status: "Read",
    },
    {
      id: 3,
      clientName: "Michael Chen",
      date: "18 July, 2025",
      email: "m.chen@example.com",
      message:
        "Could you please send me more information about the property amenities and nearby facilities?",
      status: "Unread",
    },
    {
      id: 4,
      clientName: "Emily Rodriguez",
      date: "17 July, 2025",
      email: "emily.r@example.com",
      message:
        "I have questions about the lease terms and deposit requirements. Can we discuss this?",
      status: "Read",
    },
    {
      id: 5,
      clientName: "David Thompson",
      date: "16 July, 2025",
      email: "david.t@example.com",
      message:
        "Is the property pet-friendly? I have two small dogs and need to know the pet policy.",
      status: "Unread",
    },
    {
      id: 6,
      clientName: "Lisa Wang",
      date: "15 July, 2025",
      email: "lisa.w@example.com",
      message:
        "I'm looking for a 2-bedroom apartment. Do you have any available units in my budget range?",
      status: "Read",
    },
    {
      id: 7,
      clientName: "James Wilson",
      date: "14 July, 2025",
      email: "james.w@example.com",
      message:
        "What are the parking options available for residents? Is there covered parking?",
      status: "Unread",
    },
    {
      id: 8,
      clientName: "Maria Garcia",
      date: "13 July, 2025",
      email: "maria.g@example.com",
      message:
        "I'm interested in the property but need to know about the application process and timeline.",
      status: "Read",
    },
    {
      id: 9,
      clientName: "Robert Brown",
      date: "12 July, 2025",
      email: "robert.b@example.com",
      message:
        "Can you provide information about the neighborhood safety and local schools?",
      status: "Unread",
    },
    {
      id: 10,
      clientName: "Jennifer Lee",
      date: "11 July, 2025",
      email: "jennifer.l@example.com",
      message:
        "I'd like to know about the maintenance policies and how to report issues.",
      status: "Read",
    },
    {
      id: 11,
      clientName: "Christopher Davis",
      date: "10 July, 2025",
      email: "chris.d@example.com",
      message:
        "What utilities are included in the rent? I need to budget for additional expenses.",
      status: "Unread",
    },
    {
      id: 12,
      clientName: "Amanda Taylor",
      date: "9 July, 2025",
      email: "amanda.t@example.com",
      message:
        "Is there a gym or fitness center in the building? What are the hours?",
      status: "Read",
    },
    {
      id: 13,
      clientName: "Kevin Martinez",
      date: "8 July, 2025",
      email: "kevin.m@example.com",
      message:
        "I'm moving from out of state. Can you recommend any local moving companies?",
      status: "Unread",
    },
    {
      id: 14,
      clientName: "Rachel Anderson",
      date: "7 July, 2025",
      email: "rachel.a@example.com",
      message:
        "What is the policy on subletting? I may need to travel for work occasionally.",
      status: "Read",
    },
    {
      id: 15,
      clientName: "Daniel White",
      date: "6 July, 2025",
      email: "daniel.w@example.com",
      message:
        "Are there any upcoming renovations or construction that might affect residents?",
      status: "Unread",
    },
    {
      id: 16,
      clientName: "Nicole Harris",
      date: "5 July, 2025",
      email: "nicole.h@example.com",
      message:
        "I work from home. Is the internet speed reliable and what providers are available?",
      status: "Read",
    },
    {
      id: 17,
      clientName: "Matthew Clark",
      date: "4 July, 2025",
      email: "matthew.c@example.com",
      message:
        "What are the quiet hours and noise policies? I need a peaceful environment.",
      status: "Unread",
    },
    {
      id: 18,
      clientName: "Stephanie Lewis",
      date: "3 July, 2025",
      email: "stephanie.l@example.com",
      message:
        "Is there a package delivery system? I receive many online orders.",
      status: "Read",
    },
    {
      id: 19,
      clientName: "Andrew Walker",
      date: "2 July, 2025",
      email: "andrew.w@example.com",
      message:
        "What are the guest policies? I have family visiting from time to time.",
      status: "Unread",
    },
    {
      id: 20,
      clientName: "Michelle Hall",
      date: "1 July, 2025",
      email: "michelle.h@example.com",
      message:
        "Can you tell me about the building's security features and access control?",
      status: "Read",
    },
  ];

  // Filter and search logic
  const filteredMessages = useMemo(() => {
    let filtered = allMessages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((message) => message.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleMessageClick = (messageId: number) => {
    navigate(`/admin/messages/${messageId}`);
  };

  return (
    <div className="min-h-screen text-gray_text3">
      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full  text-gray_text3 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Search messages..."
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <button
              className=" text-gray_text3 px-4 py-2 rounded-xl border border-gray-300 transition-colors flex items-center gap-2"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              Filter 
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 12.75L20.25 12.75C20.6642 12.75 21 12.4142 21 12C21 11.5858 20.6642 11.25 20.25 11.25L18.75 11.25C18.3358 11.25 18 11.5858 18 12C18 12.4142 18.3358 12.75 18.75 12.75Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M12 6C12 5.58579 12.3358 5.25 12.75 5.25L20.25 5.25002C20.6642 5.25002 21 5.5858 21 6.00002C21 6.41423 20.6642 6.75002 20.25 6.75002L12.75 6.75C12.3358 6.75 12 6.41421 12 6Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M12 18C12 17.5858 12.3358 17.25 12.75 17.25L20.25 17.25C20.6642 17.25 21 17.5858 21 18C21 18.4142 20.6642 18.75 20.25 18.75L12.75 18.75C12.3358 18.75 12 18.4142 12 18Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M3.75001 6.75001L5.25001 6.75C5.66422 6.75 6 6.41421 6 5.99999C6 5.58578 5.66421 5.25 5.24999 5.25L3.74999 5.25001C3.33578 5.25002 3 5.58581 3 6.00002C3 6.41424 3.33579 6.75002 3.75001 6.75001Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M5.25001 18.75L3.75001 18.75C3.33579 18.75 3 18.4142 3 18C3 17.5858 3.33578 17.25 3.74999 17.25L5.24999 17.25C5.66421 17.25 6 17.5858 6 18C6 18.4142 5.66422 18.75 5.25001 18.75Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M3 12C3 11.5858 3.33579 11.25 3.75 11.25H11.25C11.6642 11.25 12 11.5858 12 12C12 12.4142 11.6642 12.75 11.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M9 3.75C7.75736 3.75 6.75 4.75736 6.75 6C6.75 7.24264 7.75736 8.25 9 8.25C10.2426 8.25 11.25 7.24264 11.25 6C11.25 4.75736 10.2426 3.75 9 3.75Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M12.75 12C12.75 10.7574 13.7574 9.75 15 9.75C16.2426 9.75 17.25 10.7574 17.25 12C17.25 13.2426 16.2426 14.25 15 14.25C13.7574 14.25 12.75 13.2426 12.75 12Z"
                  fill="#6E6D6D"
                />
                <path
                  d="M9 15.75C7.75736 15.75 6.75 16.7574 6.75 18C6.75 19.2426 7.75736 20.25 9 20.25C10.2426 20.25 11.25 19.2426 11.25 18C11.25 16.7574 10.2426 15.75 9 15.75Z"
                  fill="#6E6D6D"
                />
              </svg>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    statusFilter === "All" ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("All");
                    setShowFilterDropdown(false);
                  }}
                >
                  All Messages
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    statusFilter === "Unread" ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("Unread");
                    setShowFilterDropdown(false);
                  }}
                >
                  Unread Messages
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    statusFilter === "Read" ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("Read");
                    setShowFilterDropdown(false);
                  }}
                >
                  Read Messages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className=" rounded-lg overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray_text3">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-sm text-gray-500 text-center">
              {searchTerm || statusFilter !== "All"
                ? "No messages match your current filters. Try adjusting your search or filter criteria."
                : "When clients send you messages, they will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="!text-gray_text3 bg-gray-50 !font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Client's Name
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="!text-gray_text3 divide-y divide-gray-100">
                {currentMessages.map((message) => (
                  <tr
                    key={message.id}
                    className=" cursor-pointer transition-colors"
                    onClick={() => handleMessageClick(message.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium ">
                        {message.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">{message.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">{message.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm  max-w-xs truncate">
                        {message.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-white">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            className="border-gray-700 border text-gray_text3 size-10 flex items-center justify-center rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Show first page */}
          {currentPage > 3 && (
            <>
              <button
                className=" rounded-lg transition-colors size-10 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {currentPage > 4 && (
                <button className="bg-gray-700 text-white size-10 flex items-center justify-centerpx-3 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                  ...
                </button>
              )}
            </>
          )}

          {/* Show pages around current page */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                className={`size-10 flex items-center justify-center rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? "bg-primary_color text-white"
                    : "border-gray-700 border text-gray_text3"
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Show last page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <button className="bg-gray-700 text-white size-10 flex items-center justify-center rounded-lg  transition-colors">
                  ...
                </button>
              )}
              <button
                className="size-10 flex items-center justify-center rounded-lg transition-colors bg-gray-700 text-white "
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="border-gray-700 border text-gray_text3 size-10 flex items-center justify-center rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
