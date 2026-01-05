import { adminAPI } from "./admins";
import { AnnouncementAPI } from "./announcements";
import { classroomAPI } from "./classrooms";
import { parentsAPI } from "./parents";
import { SessionAPI } from "./sessions";
import { studentsAPI } from "./students";
import { supportAPI } from "./support";
import { teacherAPI } from "./teachers";
import { userAPI } from "./users";

export const API = {
  ...adminAPI,
  ...userAPI,
  ...teacherAPI,
  ...classroomAPI,
  ...studentsAPI,
  ...parentsAPI,
  ...SessionAPI,
  ...AnnouncementAPI,
  ...supportAPI,
};
