export type User = {
  _id: number;
  name: string;
  email: string;
  image?: string | null;
  role:
    | "parent"
    | "student"
    | "unregistered"
    | "admin"
    | "teacher"
    | "substitute";
  isProfileComplete?: boolean;
  isAuthorized: boolean;
  gender?: "male" | "female";
  jammat?: string;
  membercode?: string;
  phone?: string;
  parentEmail?: string;
  waqfenauId?: string;
  dob?: {
    month: number;
    year: number;
  };
  classrooms?: {
    label: string;
    value: string;
  }[];
  suggestedClass?: {
    label: string;
    value: string;
  }[];
  urduClass: "none" | "beginner" | "intermediate";
  verification?: {
    name: boolean;
    membercode: boolean;
    waqfenauId: boolean;
    age: boolean;
  };
};
