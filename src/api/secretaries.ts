import axios from "axios";
import { API_BASE } from "./constants";
import { User } from "@/types/user";

export const secretariesAPI = {
  getStudentsinJammat: ({
    authToken,
  }): Promise<{ data: User[] | null; status: string }> => {
    return axios.get(`${API_BASE}/secretary/getStudents`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
