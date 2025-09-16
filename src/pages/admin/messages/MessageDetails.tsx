import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Message Details</h2>
        <button
          onClick={() => navigate("/admin/messages")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Messages
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Message ID: {id}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <p className="text-gray-900">john.doe@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <p className="text-gray-900">Inquiry about Property {id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900">
                Hello, I'm interested in learning more about this property.
                Could you please provide additional details about the amenities
                and schedule a viewing?
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Unread
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;
