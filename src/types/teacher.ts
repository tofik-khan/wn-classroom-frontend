export type Teacher = {
  _id: number;
  name: string;
  email: string;
  image: string;
  role: string;
  phone: string;
  jammat: string;
  timezone: string;
  classrooms?: {
    label: string;
    value: string;
  }[];
};
