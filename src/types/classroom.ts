export type Classroom = {
  _id?: string;
  name: string;
  description: string;
  googleDrive: string;
  schedule: any[];
  start: {
    label: string;
    value: string;
  };
  end: {
    label: string;
    value: string;
  };
};
