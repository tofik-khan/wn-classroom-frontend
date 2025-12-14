import { adminAPI } from "./mudir/admins";
import { mudirDashboardAPI } from "./mudir/dashboard";
import { imagesAPI } from "./mudir/images";
import { UserAPI } from "./users";
import { applicantsAPI } from "./waqfeardhi/applicants";
import { dashboardAPI } from "./waqfeardhi/dashboard";
import { projectsAPI } from "./waqfeardhi/projects";

export const API = {
  ...adminAPI,
  ...imagesAPI,
  ...projectsAPI,
  ...applicantsAPI,
  ...dashboardAPI,
  ...mudirDashboardAPI,
  ...UserAPI,
};
