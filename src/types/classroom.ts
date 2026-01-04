import { Dayjs } from "dayjs";

export type Classroom = {
  _id?: string;
  name: string;
  description: string;
  type: "syllabus" | "urdu";
  schedule: Dayjs[];
  start: {
    label: string;
    value: string;
  };
  end: {
    label: string;
    value: string;
  };
};
