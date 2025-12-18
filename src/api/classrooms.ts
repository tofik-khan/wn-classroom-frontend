import { API_BASE } from "./constants";
import { Classroom } from "@/types/classroom";
import axios from "axios";

export const classroomAPI = {
  getClassrooms: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: Classroom[]; status: string }> => {
    return axios.get(`${API_BASE}/classrooms`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  createClassroom: ({
    authToken,
    data,
  }): Promise<{ acknowledged: string; insertedId: string }> => {
    return axios.post(`${API_BASE}/classrooms`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getOneClass: ({
    authToken,
    id,
  }: {
    authToken: string;
    id: string;
  }): Promise<{ data: Classroom; status: string }> => {
    return axios.get(`${API_BASE}/classrooms/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateClassroom: ({
    authToken,
    data,
    id,
  }: {
    authToken: string;
    data: Partial<Classroom>;
    id: string;
  }) => {
    return axios.put(`${API_BASE}/classrooms/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
