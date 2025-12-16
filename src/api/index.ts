import { adminAPI } from "./admins";
import { teacherAPI } from "./teachers";
import { userAPI } from "./users";

export const API = {
  ...adminAPI,
  ...userAPI,
  ...teacherAPI,
};
