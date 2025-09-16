import React, { useState, useRef } from "react";

const SettingsPage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Chizoba Odita",
    email: "strongestavenger@emample.com",
  });

  const [currentPassword, setCurrentPassword] = useState("********");
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = () => {
    setIsPasswordEditable(true);
    setCurrentPassword(""); // Clear the masked password when editing
  };

  const handlePasswordCancel = () => {
    setIsPasswordEditable(false);
    setCurrentPassword("********"); // Restore masked password
  };

  const handleProfilePhotoChange = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send the data to your backend
      console.log("Saving profile data:", {
        ...profileData,
        password: isPasswordEditable ? currentPassword : undefined,
        profileImage: profileImage,
      });

      // Reset password field if it was being edited
      if (isPasswordEditable) {
        setIsPasswordEditable(false);
        setCurrentPassword("********");
      }

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-2">
      <div className="max-w-4xl mx-auto">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
              <img
                src={profileImage || "/api/placeholder/128/128"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a default profile image or placeholder
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23374151'/%3E%3Ccircle cx='64' cy='45' r='20' fill='%236B7280'/%3E%3Cpath d='M32 100c0-17.7 14.3-32 32-32s32 14.3 32 32' fill='%236B7280'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
          <button
            onClick={handleProfilePhotoChange}
            className="text-[#A60F01] font-semibold transition-colors duration-200 text-sm "
          >
            Change Profile Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Management Section */}
          <div className="space-y-6">
            <h2 className="text-gray_text3 text-lg font-semibold">
              Profile Management
            </h2>

            <div className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-gray_text3 text-sm block">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border-0 focus:ring-2 focus:ring-primary_color font-semibold focus:outline-none text-gray-900 placeholder-gray_text3"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="space-y-2">
                <label className="text-gray_text3 text-sm block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-lg shadow-sm border-0 focus:ring-2 focus:ring-primary_color font-semibold focus:outline-none text-gray-900 placeholder-gray_text3"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password Management Section */}
          <div className="space-y-6">
            <h2 className="text-gray_text3 text-lg font-semibold">
              Manage Password
            </h2>

            <div className="space-y-4">
              {/* Current Password Field */}
              <div className="space-y-2">
                <label className="text-gray_text3 text-sm block">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={!isPasswordEditable}
                    className={`w-full px-4 py-3 rounded-lg shadow-sm border-0 focus:ring-2 focus:ring-primary_color  focus:outline-none text-gray-900 placeholder-gray_text3 font-semibold pr-20 ${
                      isPasswordEditable
                        ? "bg-white"
                        : "bg-gray-100 cursor-not-allowed text-gray_text3"
                    }`}
                    placeholder={
                      isPasswordEditable
                        ? "Enter current password"
                        : "Click Change to edit"
                    }
                  />
                  {isPasswordEditable ? (
                    <button
                      onClick={handlePasswordCancel}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray_text3 hover:text-gray_text3 transition-colors duration-200 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={handlePasswordChange}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent font-semibold  transition-colors duration-200 text-sm"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSaveChanges}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm ${
              isLoading
                ? "bg-primary_color cursor-not-allowed text-gray_text1"
                : "bg-primary_color font-semibold  text-white"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
