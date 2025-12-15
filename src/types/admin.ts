export type Admin = {
  _id: number;
  name: string;
  email: string;
  image: string | null;
  title: string;
  isSuperuser: boolean;
};
