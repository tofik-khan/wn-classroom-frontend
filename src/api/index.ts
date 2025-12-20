import { adminAPI } from "./admins";
import { classroomAPI } from "./classrooms";
import { studentsAPI } from "./students";
import { teacherAPI } from "./teachers";
import { userAPI } from "./users";

export const API = {
  ...adminAPI,
  ...userAPI,
  ...teacherAPI,
  ...classroomAPI,
  ...studentsAPI,
};
