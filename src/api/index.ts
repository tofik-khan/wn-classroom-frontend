import { adminAPI } from "./admins";
import { AnnouncementAPI } from "./announcements";
import { classroomAPI } from "./classrooms";
import { parentsAPI } from "./parents";
import { reportsAPI } from "./reports";
import { secretariesAPI } from "./secretaries";
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
  ...secretariesAPI,
  ...reportsAPI,
};
