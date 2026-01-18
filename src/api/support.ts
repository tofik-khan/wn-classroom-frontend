import { Support } from "@/types/support";
import { API_BASE } from "./constants";
import axios from "axios";

export const supportAPI = {
  createSupportCase: ({ data }) => {
    return axios.post(`${API_BASE}/support`, data);
  },
  getSupportCase: ({ authToken, id }) => {
    return axios.get(`${API_BASE}/support/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getAllSupportCases: ({ authToken }): Promise<{ data: Support[] }> => {
    return axios.get(`${API_BASE}/support`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateSupportCase: ({ authToken, id, data }) => {
    return axios.put(`${API_BASE}/support/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
