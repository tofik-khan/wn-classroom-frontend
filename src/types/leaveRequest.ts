export type LeaveRequest = {
  _id: string;
  studentId: string;
  studentName: string;
  classroomId: string;
  classroomName: string;
  date: string;
  scheduledStart: string;
  reason: string;
  status: "active" | "cancelled";
  requestedBy: {
    email: string;
    role: "student" | "parent";
  };
  createdAt: string;
  cancelledAt?: string;
};

export type LeaveRequestResult = {
  created: LeaveRequest[];
  skipped: { classroomId: string; reason: string }[];
};
