import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ProfileIcon from "../iconComponent/ProfileIcon";
import WhatsapIcon from "../iconComponent/WhatsapIcon";
import HamburgerIcon from "../iconComponent/HamburgerIcon";
import { useAuth } from "../../contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    // { label: "Buy", href: "/buy" },
    { label: "Rent", href: "/rent" },
    // { label: "Sell", href: "/sell" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-2">
        <div className="flex justify-between items-center h-[96px]">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 hidden md:block"
          >
            <img src={logo} alt="logo" className="" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className={`px-3 py-2 text-lg font-medium transition-colors duration-200 relative group ${
                    location.pathname === item.href
                      ? "text-primary_color font-semibold"
                      : "text-[#6E6D6D] hover:text-primary_color"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FAFAFA] text-primary_color px-4 py-3 border border-[#E7E7E7] rounded-xl text-sm font-medium flex items-center space-x-2 text-[15px]"
            >
              <WhatsapIcon />
              <span>Chat With Us</span>
            </motion.button>

            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center space-x-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary_color text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </motion.button>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </span>
                  
                  <button
                    onClick={logout}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => navigate("/admin/login")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary_color text-white px-4 py-3 rounded-xl text-[15px] font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <ProfileIcon />
                <span>Log In</span>
              </motion.button>
            )}
          </div>

          {/* Mobile profile button - Right side */}
          <div className="md:hidden flex w-full justify-between items-center">
            {/* Mobile menu button - Left side */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <HamburgerIcon />}
              </motion.button>
            </div>
            <motion.div className="flex-shrink-0 md:hidden mx-auto">
              <img src={logo} alt="logo" className="max-h-10" />
            </motion.div>

            {isAuthenticated ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-primary_color text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </motion.button>
            ) : (
                <motion.button
                onClick={() => navigate("/admin/login")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary_color text-white px-4 py-3 rounded-xl text-[15px] font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <ProfileIcon />
                <span>Log In</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-50 bg-white overflow-hidden"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className=" flex items-center justify-center">
                  <img src={logo} alt="logo" className="w-full" />
                </div>
              </div>
              <motion.button
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* User Profile Section */}
            {isAuthenticated ? (
              <div className="px-6 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary_color rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user?.name || "User"}
                      </h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 hidden py-6 border-b border-gray-100">
                {/* <motion.button
                  onClick={() => navigate("/admin")}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary_color text-white px-4 py-3 rounded-xl text-[15px] font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <ProfileIcon />
                  <span>Log In</span>
                </motion.button> */}
              </div>
            )}

            {/* Navigation Items */}
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === item.href
                      ? "text-primary_color bg-[#F5F5DC]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
