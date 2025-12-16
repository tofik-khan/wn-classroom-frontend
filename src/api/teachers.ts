import { API_BASE } from "./constants";
import { Teacher } from "@/types/teacher";
import axios from "axios";

export const teacherAPI = {
  getTeachers: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: Teacher[]; status: string }> => {
    return axios.get(`${API_BASE}/teachers`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  createTeacher: ({
    authToken,
    data,
  }): Promise<{ data: string; status: string }> => {
    return axios.post(
      `${API_BASE}/teachers`,
      { ...data, email: `${data.email}@ahmadiyya.us` },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  getOneTeacher: ({
    authToken,
    id,
  }: {
    authToken: string;
    id: string;
  }): Promise<{ data: Teacher; status: string }> => {
    return axios.get(`${API_BASE}/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateTeacher: ({
    authToken,
    id,
    data,
  }: {
    authToken: string;
    id: string;
    data: any;
  }): Promise<{ status: string }> => {
    return axios.put(`${API_BASE}/teachers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
