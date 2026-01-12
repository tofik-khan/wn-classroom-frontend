//import { lazy, Suspense } from "react";
import { PublicLayout } from "@/components/layouts/public";
import { PageHome } from "@/pages/home";
import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "./protectedRoutes";
import { PageCallback } from "@/pages/callback";
import { PageSchedule } from "@/pages/schedule";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<PageHome />} />
          <Route path="/schedule" element={<PageSchedule />} />
          <Route path="/callback" element={<PageCallback />} />
          <Route path="/403" element={<p>403 UnAuthorized</p>} />
          {/* <Route path="*" element={<p>404 NOT FOUND</p>} /> */}
        </Route>
        <Route path="protected/*" element={<ProtectedRoutes />} />
      </Routes>
    </>
  );
};
