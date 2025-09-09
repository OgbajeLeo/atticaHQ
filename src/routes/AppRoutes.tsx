import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalLoader from "../components/loaders/GlobalLoader";
import BuyPage from "../pages/buyPage";
import PropertyOverviewPage from "../pages/propertyPage";

const LandingPage = lazy(() => import("../pages/landingPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/buy" element={<BuyPage />} />
          {/* property overview page with id dynamic route*/}
          <Route path="/property/:id" element={<PropertyOverviewPage />} />
          {/* Protected admin route */}
          {/* <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
