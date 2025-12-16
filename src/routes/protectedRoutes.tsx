import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";
import { PageRegister } from "@/pages/protected/register";
import { PageClass } from "@/pages/protected/dashboard/class";
import { useAppSelector } from "@/hooks";
import { PageTeachers } from "@/pages/protected/teachers";
import { PageEditTeacher } from "@/pages/protected/teachers/edit";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/admins/*" element={<AdminRoute />} />
          <Route path="/teachers/*" element={<TeachersRoute />} />
        </Route>
      </Routes>
    </>
  );
};

const AdminRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageAdmins />} />
      </Routes>
    );
  else return <></>;
};

const TeachersRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageTeachers />} />
        <Route path="/:id" element={<PageEditTeacher />} />
      </Routes>
    );
  else return <></>;
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
