import { API_BASE } from "./constants";
import { User } from "@/types/user";
import axios from "axios";

export const parentsAPI = {
  getParents: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: User[] | null; status: string }> => {
    return axios.get(`${API_BASE}/parents`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getOneParent: ({
    authToken,
    id,
  }: {
    authToken: string;
    id: string;
  }): Promise<{ data: User; status: string }> => {
    return axios.get(`${API_BASE}/parents/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateParent: ({
    authToken,
    id,
    data,
  }: {
    authToken: string;
    id: string;
    data: User;
  }) => {
    return axios.put(`${API_BASE}/parents/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
