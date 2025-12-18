import { adminAPI } from "./admins";
import { classroomAPI } from "./classrooms";
import { teacherAPI } from "./teachers";
import { userAPI } from "./users";

export const API = {
  ...adminAPI,
  ...userAPI,
  ...teacherAPI,
  ...classroomAPI,
};
