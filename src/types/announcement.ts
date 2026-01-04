export type Announcement = {
  _id?: string;
  title: string;
  duration: {
    time: number;
    unit: "day" | "week" | "month";
  };
  content: string;
  classroomId: string;
  teacher: {
    id: string;
    name: string;
    email: string;
  };
};
