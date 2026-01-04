import { API_BASE } from "./constants";
import { Announcement } from "@/types/announcement";
import axios from "axios";

export const AnnouncementAPI = {
  createAnnouncement: ({
    authToken,
    data,
  }: {
    authToken: string;
    data: Announcement;
  }) => {
    return axios.post(`${API_BASE}/announcements`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getAnnouncements: ({
    authToken,
    classroomId,
  }: {
    authToken: string;
    classroomId: string;
  }): Promise<{ data: Announcement[] }> => {
    return axios.get(`${API_BASE}/announcements/${classroomId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
