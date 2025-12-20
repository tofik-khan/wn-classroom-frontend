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
  getOneStudent: ({
    authToken,
    id,
  }: {
    authToken: string;
    id: string;
  }): Promise<{ data: User; status: string }> => {
    return axios.get(`${API_BASE}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateStudent: ({
    authToken,
    id,
    data,
  }: {
    authToken: string;
    id: string;
    data: User;
  }) => {
    return axios.put(`${API_BASE}/students/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
