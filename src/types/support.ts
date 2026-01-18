import { User } from "./user";

export type Support = {
  _id: string;
  name?: string;
  email?: string;
  message: string;
  currentUser?: User;
  location: any;
  createdAt: string;
  assignedTo: string;
  updatedAt: string;
  status: "pending" | "responded" | "resolved";
};
