import { API_BASE } from "./constants";
import { User } from "@/types/user";
import axios from "axios";

export const studentsAPI = {
  getStudents: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: User[] | null; status: string }> => {
    return axios.get(`${API_BASE}/students`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
