import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthApi } from "../../../utils";
import type { Message } from "../../../types/message";

const MessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markAsReadLoading, setMarkAsReadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getMessage = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const res = (await AuthApi.GetMessageByID(id)) as any;
      setMessageData(res.message);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError("Failed to load message details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMessage();
  }, [id]);

  const MarkAsRead = async () => {
    if (!id) return;
    try {
      setMarkAsReadLoading(true);
      const res = await AuthApi.MarkAsRead(id, { isRead: true });
      console.log(res);
      // Refresh the message data to show updated status
      await getMessage();
    } catch (error) {
      console.log(error);
    } finally {
      setMarkAsReadLoading(false);
    }
  };

  const DeleteMessage = async () => {
    if (!id) return;
    try {
      setDeleteLoading(true);
      const res = await AuthApi.DeleteMessage(id);
      console.log(res);
      // Navigate back to messages list after successful deletion
      navigate("/admin/messages");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="min-h-screen text-gray_text3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        <div className="rounded-lg shadow-md border border-gray-200 p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="p-6 rounded-lg border border-gray-200">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen text-gray_text3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray_text3">
              Message Details
            </h2>
            <button
              onClick={() => navigate("/admin/messages")}
              className="px-6 py-3 text-gray_text3 rounded-xl transition-colors flex items-center gap-2"
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
          <div className="rounded-lg shadow-md border border-gray-200 p-8">
            <div className="text-center">
              <div className="text-red-500 text-lg font-medium mb-4">
                {error}
              </div>
              <button
                onClick={getMessage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!messageData) {
    return (
      <div className="min-h-screen text-gray_text3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray_text3">
              Message Details
            </h2>
            <button
              onClick={() => navigate("/admin/messages")}
              className="px-6 py-3 text-gray_text3 rounded-xl transition-colors flex items-center gap-2"
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
          <div className="rounded-lg shadow-md border border-gray-200 p-8">
            <div className="text-center">
              <div className="text-gray-500 text-lg font-medium">
                Message not found
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray_text3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray_text3">Message Details</h2>
          <button
            onClick={() => navigate("/admin/messages")}
            className="px-6 py-3 text-gray_text3 rounded-xl transition-colors flex items-center gap-2"
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
                {messageData?.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Client's Name
                </label>
                <p className="text-gray_text3 text-lg font-medium">
                  {messageData?.name || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Date
                </label>
                <p className="text-gray_text3 text-lg">
                  {messageData?.created_at
                    ? new Date(messageData.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "N/A"}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray_text3 mb-2">
                  Email Address
                </label>
                <p className="text-gray_text3 text-lg">
                  {messageData?.email || "N/A"}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray_text3 mb-3">
                Message
              </label>
              <div className="p-6 rounded-lg border border-gray-200">
                <p className="text-gray_text3 text-lg leading-relaxed whitespace-pre-wrap">
                  {messageData?.message || "No message content available"}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6 !text-white">
              {!messageData?.isRead && (
                <button
                  onClick={MarkAsRead}
                  disabled={markAsReadLoading}
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    markAsReadLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-900 hover:bg-green-800"
                  }`}
                >
                  {markAsReadLoading ? (
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
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
                  )}
                  {markAsReadLoading ? "Marking..." : "Mark as Read"}
                </button>
              )}
              <button
                onClick={DeleteMessage}
                disabled={deleteLoading}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  deleteLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-900 hover:bg-red-800"
                }`}
              >
                {deleteLoading ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
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
                )}
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;
