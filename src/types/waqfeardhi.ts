export type Project = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  audience: string;
  sponsor: {
    name: string;
    email: string;
    department: string;
  };
  slug: string;
  badge?: string;
  published: boolean;
  thumbnail: string;
  createdBy: string;
  createdAt: string;
  editedBy: string;
  editedAt: string;
  sortOrder: number;
};

export type Applicant = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  jammat: string;
  auxiliary: string;
  isWaqfenau: boolean;
  comments: string;
  slug: string;
  timestamp: string;
  date: string;
  adminNote: string;
  status: ApplicationStatus;
  membercode: string;
};

export type ApplicationStatus =
  | "pending"
  | "intro-made"
  | "in-progress"
  | "completed"
  | "never-started";
