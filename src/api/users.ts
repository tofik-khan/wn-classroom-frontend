import { API_BASE } from "@/api/constants";
import { User } from "@/types/user";
import axios from "axios";

export const userAPI = {
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
        { email },
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
  getUnenrolledUsers: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: User[]; status: string }> => {
    return axios.get(`${API_BASE}/users/unenrolled`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  enrollInClass: ({
    authToken,
    id,
    classrooms,
  }: {
    authToken: string;
    id: string;
    classrooms: string[];
  }) => {
    return axios.put(
      `${API_BASE}/users/${id}/enroll`,
      { classrooms },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  },
  getMembercodes: ({ authToken }) => {
    return axios.get(`${API_BASE}/users/membercodes`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
