import { API_BASE } from "@/api/constants";
import { Admin } from "@/types/admin";
import axios from "axios";

export const adminAPI = {
  getAdmins: (): Promise<{ data: Admin[]; status: string }> => {
    return axios.get(`${API_BASE}/admins`).then((response) => response.data);
  },
  createAdmin: ({
    authToken,
    data,
  }): Promise<{ data: string; status: string }> => {
    return axios.post(
      `${API_BASE}/admins`,
      { ...data, email: `${data.email}@ahmadiyya.us` },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  updateAdmin: ({
    authToken,
    data,
  }): Promise<{ data: string; status: string }> => {
    return axios.put(
      `${API_BASE}/admins`,
      { ...data, email: `${data.email}@ahmadiyya.us` },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
};
