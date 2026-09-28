import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FilterDefs from "../pages/home/components/FilterDefs";
import { registerNavigator } from "./navigation";

const ContactPage = lazy(() => import("../pages/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function RouteScrollReset() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
}

export default function AppRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    registerNavigator(navigate);
    return () => registerNavigator(null);
  }, [navigate]);

  return (
    <>
      <RouteScrollReset />
      <FilterDefs />
      <div id="background-grid" />

      <Suspense
        fallback={
          <div className="route-loading" role="status">
            Loading page…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* <FooterCommon /> */}
    </>
  );
}

// Retain the existing imperative navigation export for compatibility.
// eslint-disable-next-line react-refresh/only-export-components
export { reroute } from "./navigation";
