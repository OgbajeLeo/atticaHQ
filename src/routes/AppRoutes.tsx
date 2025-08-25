import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalLoader from "../components/loaders/GlobalLoader";

const LandingPage = lazy(() => import("../pages/landingPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected admin route */}
          {/* <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
