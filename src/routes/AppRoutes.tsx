import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalLoader from "../components/loaders/GlobalLoader";
import BuyPage from "../pages/buyPage";
import PropertyOverviewPage from "../pages/propertyPage";
import ContactPage from "../pages/contactPage";
import AboutPage from "../pages/aboutPage";
import PrivacyPage from "../pages/privacyPage";
import TermsPage from "../pages/termsPage";
import RentPage from "../pages/rentPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { ToastProvider } from "../contexts/ToastContext";

const LandingPage = lazy(() => import("../pages/landingPage"));
const AdminDashboard = lazy(() => import("../pages/admin"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* property overview page with id dynamic route*/}
            <Route path="/property/:id" element={<PropertyOverviewPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}
