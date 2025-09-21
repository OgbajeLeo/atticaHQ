import React from "react";
import { LogOut, ChevronRight } from "lucide-react";
import Logo from "../../../components/iconComponent/Logo";
import CollapseIcon from "../../../components/iconComponent/CollapseIcon";
import DashboardIcon from "../../../components/iconComponent/DashboardIcon";
import PropertyIcon from "../../../components/iconComponent/PropertyIcon";
import MessageIcon from "../../../components/iconComponent/MessageIcon";
import SettingsIcon from "../../../components/iconComponent/SettingsIcon";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  onRouteChange: (route: string) => void;
  currentRoute: string;
  isMobile?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onToggle,
  onLogout,
  onRouteChange,
  currentRoute,
  isMobile = false,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
    },
    {
      id: "properties",
      label: "Manage Property",
      icon: PropertyIcon,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageIcon,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <div
      className={`bg-primary_color text-white transition-all duration-300 ${
        isMobile ? "w-64" : collapsed ? "w-20" : "w-64"
      } flex flex-col h-full`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-primary_color mb-12">
        <div className="flex items-center justify-between">
          {(!collapsed || isMobile) && (
            <div>
              <Logo />
            </div>
          )}
          {!isMobile ? (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-primary_color transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <CollapseIcon />
              )}
            </button>
          ) : (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg rotate-180 hover:bg-primary_color transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onRouteChange(item.id)}
                  className={`w-full flex gap-3 items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-primary_color"
                      : "text-gray_text1 hover:text-white"
                  }`}
                >
                  <Icon
                    isActive={isActive}
                    className={`w-5 h-5 mr-3 ${
                      collapsed && !isMobile ? "" : "mr-3"
                    }`}
                  />
                  {(!collapsed || isMobile) && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-primary_color">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-white  hover:text-white rounded-lg transition-colors"
        >
          <LogOut
            className={`w-5 h-5 ${collapsed && !isMobile ? "" : "mr-3"}`}
          />
          {(!collapsed || isMobile) && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
