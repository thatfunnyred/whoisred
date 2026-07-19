import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

let navigate: any = null;

export default function AppRouter() {
  navigate = useNavigate();

  return (
    <div className="content-container">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 404 fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      {/* <FooterCommon /> */}
    </div>
  );
}

export function reroute(location: string): void {
  navigate(location);
}
