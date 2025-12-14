import { API_BASE } from "@/api/constants";
import { MongoDBUpdateResponseType } from "@/types";
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
      `${API_BASE}/mudir/admins`,
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
      `${API_BASE}/mudir/admins`,
      { ...data, email: `${data.email}@ahmadiyya.us` },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  updateAdminImage: ({
    _id,
    image,
  }): Promise<{ data: MongoDBUpdateResponseType; status: string }> => {
    return axios.put(`${API_BASE}/mudir/admins/image`, {
      _id,
      image,
    });
  },
  updateLastLogin: ({
    _id,
  }): Promise<{ data: MongoDBUpdateResponseType; status: string }> => {
    return axios.put(`${API_BASE}/mudir/admins/lastlogin`, {
      _id,
    });
  },
};
