import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminRoutes from "./AdminRoutes";
import { Bell, Mail, User } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import HamburgerIcon from "../../components/iconComponent/HamburgerIcon";

const AdminDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleRouteChange = (route: string) => {
    navigate(`/admin/${route}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const getCurrentRoute = () => {
    const pathSegments = location.pathname.split("/");
    const adminRoutes = pathSegments.filter(
      (segment) => segment && segment !== "admin"
    );

    if (adminRoutes.length > 1) {
      return adminRoutes[0];
    }

    return adminRoutes[0] || "dashboard";
  };

  const getPageTitle = (route: string) => {
    switch (route) {
      case "dashboard":
        return "Dashboard";
      case "properties":
        return "Manage Property";
      case "messages":
        return "Messages";
      case "settings":
        return "Account Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }
      `}
      >
        <AdminSidebar
          collapsed={isMobile ? false : sidebarCollapsed}
          onToggle={toggleSidebar}
          onLogout={logout}
          onRouteChange={handleRouteChange}
          currentRoute={getCurrentRoute()}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger Menu */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <HamburgerIcon />
                </button>
              )}
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {getPageTitle(getCurrentRoute())}
              </h1>
            </div>

            {/* User Profile and Notifications */}
            <div className="flex items-center space-x-2 md:space-x-7">
              {/* Notifications */}
              <div className="relative">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  9
                </span>
              </div>

              <div className="relative">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  1
                </span>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base hidden sm:block">
                  {user?.name || "Admin User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar">
          <AdminRoutes />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
