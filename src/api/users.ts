import { API_BASE } from "@/api/constants";
import { User } from "@/types/user";
import axios from "axios";

export const UserAPI = {
  getUser: ({
    email,
    authToken,
  }: {
    email: string;
    authToken: string;
  }): Promise<{ data: User[] | null; status: string }> => {
    return axios
      .post(
        `${API_BASE}/users/byEmail`,
        { email, authToken },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => response.data);
  },
  updateUser: ({
    authToken,
    data,
  }): Promise<{ data: User[] | null; status: string }> => {
    return axios.put(`${API_BASE}/users`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
