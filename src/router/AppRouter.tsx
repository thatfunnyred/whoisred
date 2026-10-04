import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FilterDefs from "../pages/home/components/FilterDefs";
import SiteLoader from "../components/SiteLoader";
import { registerNavigator } from "./navigation";

const ContactPage = lazy(() => import("../pages/ContactPage"));
const CvPage = lazy(() => import("../pages/CvPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));

function RouteScrollReset() {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname, search]);

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
      <SiteLoader />

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
          <Route path="/cv" element={<CvPage />} />
          <Route path="/search" element={<SearchPage />} />
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
