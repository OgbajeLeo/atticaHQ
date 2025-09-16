import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Sample message data matching the UI
  const messageData = {
    id: id,
    clientName: "Chizoba Odita",
    date: "20 July, 2025",
    email: "strongestavenger@example.com",
    message:
      "Hello, I have an issue with registering for the property viewing. Can you please help me with this? I've been trying to book a viewing for the property at 123 Main Street, but I keep getting an error message when I try to submit the form. I'm very interested in this property and would like to schedule a viewing as soon as possible. Could you please assist me with this issue? Thank you for your time and I look forward to hearing from you soon.",
    status: "Unread",
  };

  return (
    <div className="min-h-screen text-gray_text3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray_text3">
            Message Details
          </h2>
          <button
            onClick={() => navigate("/admin/messages")}
            className="px-6 py-3  text-gray_text3 rounded-xl  transition-colors flex items-center gap-2"
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
            Back to Messages
          </button>
        </div>

        <div className=" rounded-lg shadow-md border border-gray-200 p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray_text3">
                Message #{id}
              </h3>
              <span className="inline-block px-3 py-1 bg-yellow-600 text-yellow-100 rounded-full text-sm font-medium">
                {messageData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Client's Name
                </label>
                <p className="text-gray_text3 text-lg font-medium">
                  {messageData.clientName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Date
                </label>
                <p className="text-gray_text3 text-lg">{messageData.date}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Email Address
                </label>
                <p className="text-gray_text3 text-lg">{messageData.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray_text3 mb-3">
                Message
              </label>
              <div className=" p-6 rounded-lg border border-gray-200">
                <p className="text-gray_text3 text-lg leading-relaxed whitespace-pre-wrap">
                  {messageData.message}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6 !text-white">
              <button className="px-6 py-3 bg-amber-600  rounded-lg  transition-colors flex items-center gap-2">
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
              <button className="px-6 py-3 bg-green-900  rounded-lg  transition-colors flex items-center gap-2">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Mark as Read
              </button>
              <button className="px-6 py-3 bg-red-900  rounded-lg  transition-colors flex items-center gap-2">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;
