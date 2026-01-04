import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Navigate, Route, Routes } from "react-router";
import { PageRegister } from "@/pages/protected/register";
import { PageClass } from "@/pages/protected/dashboard/class";
import { useAppSelector } from "@/hooks";
import { PageTeachers } from "@/pages/protected/teachers";
import { PageEditTeacher } from "@/pages/protected/teachers/edit";
import { PageClassroom } from "@/pages/protected/classrooms";
import { PageEditClassroom } from "@/pages/protected/classrooms/edit";
import { PageUnenrolled } from "@/pages/protected/unenrolled";
import { PageStudents } from "@/pages/protected/students";
import { PageEditStudent } from "@/pages/protected/students/edit";
import { PageParents } from "@/pages/protected/parents";
import { PageEditParents } from "@/pages/protected/parents/edit";

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
          <Route path="/classrooms/*" element={<ClassroomRoute />} />
          <Route path="/unenrolled/*" element={<UnEnrolledRoute />} />
          <Route path="/students/*" element={<StudentsRoute />} />
          <Route path="/parents/*" element={<ParenstsRoute />} />
        </Route>
      </Routes>
    </>
  );
};

const ParenstsRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageParents />} />
        <Route path="/:id" element={<PageEditParents />} />
      </Routes>
    );
  else return <></>;
};

const StudentsRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageStudents />} />
        <Route path="/:id" element={<PageEditStudent />} />
      </Routes>
    );
  else return <></>;
};

const UnEnrolledRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageUnenrolled />} />
        <Route path="/:id" element={<h2>Edit Unenrolled Person</h2>} />
      </Routes>
    );
  else return <></>;
};

const ClassroomRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const allowList = ["admin"];
  if (allowList.includes(currentUser.role))
    return (
      <Routes>
        <Route path="/" element={<PageClassroom />} />
        <Route path="/:id" element={<PageEditClassroom />} />
      </Routes>
    );
  else return <></>;
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
      <Route path="/class" element={<Navigate to={"/protected/Dashboard"} />} />
      <Route path="/class/:id" element={<PageClass />} />
    </Routes>
  );
};
