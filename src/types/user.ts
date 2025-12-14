export type User = {
  _id: number;
  name?: string;
  email: string;
  image?: string | null;
  role: "parent" | "student" | "unregistered";
  isProfileComplete?: boolean;
  isAuthorized: boolean;
  gender?: string;
  jammat?: string;
  membercode?: string;
  phone?: string;
  parentEmail?: string;
  waqfenauId?: string;
  dob: {
    month: number;
    year: number;
  };
};
