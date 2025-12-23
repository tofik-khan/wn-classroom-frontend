import { Dayjs } from "dayjs";

export type Classroom = {
  _id?: string;
  name: string;
  description: string;
  googleDrive: string;
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
