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
  attendance: {
    studentId: string;
    studentName: string;
    attendance: "absent" | "tardy" | "present";
  }[];
  link: string;
  createdAt: string;
};
