//import { lazy, Suspense } from "react";
import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";
import { PageImageLibrary } from "@/pages/protected/images";
import { PageProjects } from "@/pages/protected/waqfeardhi/projects";
import { PageCreateEditProject } from "@/pages/protected/waqfeardhi/projects/CreateEditProject";
import { PageApplicants } from "@/pages/protected/waqfeardhi/applicants";
import { PageApplicant } from "@/pages/protected/waqfeardhi/applicants/applicant";
import { PageWaqfeardhiDashboard } from "@/pages/protected/waqfeardhi/dashboard";
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
          <Route path="/images" element={<PageImageLibrary />} />
          <Route path="/waqfeardhi/*" element={<WaqfeArdhiRoutes />} />
          <Route path="/expo/*" element={<ExpoRoutes />} />
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

const WaqfeArdhiRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWaqfeardhiDashboard />} />
        <Route path="/projects/*" element={<WaqfeArdhiProjectRoutes />} />
        <Route path="/applicants/*" element={<WaqfeArdhiApplicantRoutes />} />
      </Routes>
    </>
  );
};

const WaqfeArdhiProjectRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageProjects />} />
        <Route path="/:id" element={<PageCreateEditProject />} />
      </Routes>
    </>
  );
};

const WaqfeArdhiApplicantRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageApplicants />} />
        <Route path="/:id" element={<PageApplicant />} />
      </Routes>
    </>
  );
};

const ExpoRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Expo Dashboard</p>} />
      </Routes>
    </>
  );
};
