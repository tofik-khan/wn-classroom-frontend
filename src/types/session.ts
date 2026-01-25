export type Session = {
  _id: string;
  date: string;
  classroomId: string;
  teacherId: string;
  teacherRole: "teacher" | "substitute";
  startTime: {
    scheduled: string;
    actual: string;
  };
  endTime: string;
  attendance: {
    studentId: string;
    studentName: string;
    attendance: "absent" | "tardy" | "present" | "excused";
  }[];
  link: string;
  createdAt: string;
};
