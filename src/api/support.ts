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
};
