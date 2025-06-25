import { API_BASE } from "../constants";
import { Project } from "@/types/waqfeardhi";
import axios from "axios";

export const projectsAPI = {
  getProjects: (): Promise<{ data: Project[]; status: string }> => {
    return axios
      .get(`${API_BASE}/waqfeardhi/projects`)
      .then((response) => response.data);
  },
  createProject: ({
    authToken,
    data,
  }): Promise<{ data: string; status: string }> => {
    return axios.post(`${API_BASE}/waqfeardhi/projects`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
  updateProject: ({
    authToken,
    data,
  }: {
    authToken: string;
    data: Project;
  }) => {
    return axios.put(`${API_BASE}/waqfeardhi/projects`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
  updateProjectsSortOrder: ({
    authToken,
    data,
  }: {
    authToken: string;
    data: { _id: string; sortOrder: number }[];
  }) => {
    return axios.put(`${API_BASE}/waqfeardhi/projects/sortOrder`, data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
};
