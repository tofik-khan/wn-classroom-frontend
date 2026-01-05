import { API_BASE } from "./constants";
import { Session } from "@/types/session";
import axios from "axios";

export const SessionAPI = {
  getSession: ({ authToken, classroomId }): Promise<{ data: Session }> => {
    return axios.get(`${API_BASE}/sessions/${classroomId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  createSession: ({ authToken, data }: { authToken: string; data: any }) => {
    return axios.post(`${API_BASE}/sessions`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateAttendance: ({
    authToken,
    data,
    sessionId,
  }: {
    authToken: string;
    data: {
      studentId: string;
      attendance: "present" | "tardy" | "absent";
    };
    sessionId: string;
  }) => {
    return axios.put(`${API_BASE}/sessions/${sessionId}/attendance`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
