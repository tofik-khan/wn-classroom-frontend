import { API_BASE } from "@/api/constants";
import axios from "axios";

export const reportsAPI = {
  getSessionsInYear: ({ authToken, year }) => {
    return axios.get(`${API_BASE}/reports/${year}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getSessionReport: ({ authToken, date }) => {
    return axios.get(`${API_BASE}/reports/sessions/${date}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
