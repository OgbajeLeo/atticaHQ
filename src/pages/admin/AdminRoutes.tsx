import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./dashboard";
import PropertiesPage from "./properties";
import MessagesPage from "./messages";
import SettingsPage from "./settings";
import PropertyDetails from "./properties/PropertyDetails";
import MessageDetails from "./messages/MessageDetails";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default redirect to dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Admin sub-routes */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Dynamic routes */}
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/messages/:id" element={<MessageDetails />} />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
