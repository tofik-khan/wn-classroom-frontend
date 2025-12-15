import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";
import { PageRegister } from "@/pages/protected/register";
import { PageClass } from "@/pages/protected/dashboard/class";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/admins" element={<PageAdmins />} />
          <Route path="/register" element={<PageRegister />} />
        </Route>
      </Routes>
    </>
  );
};

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageDashboard />} />
      <Route path="/class" element={<PageClass />} />
      <Route path="/class/:id" element={<h1>Class with ID</h1>} />
    </Routes>
  );
};
