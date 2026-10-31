import { API_BASE } from "./constants";
import { LeaveRequest, LeaveRequestResult } from "@/types/leaveRequest";
import axios from "axios";

export const leaveRequestAPI = {
  createLeaveRequests: ({
    authToken,
    data,
  }: {
    authToken: string;
    data: { studentId: string; classroomIds: string[]; reason: string };
  }): Promise<{ data: { status: string; data: LeaveRequestResult } }> => {
    return axios.post(`${API_BASE}/leave-requests`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getMyLeaveRequests: ({
    authToken,
  }: {
    authToken: string;
  }): Promise<{ data: LeaveRequest[] }> => {
    return axios.get(`${API_BASE}/leave-requests/mine`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  cancelLeaveRequest: ({ authToken, id }: { authToken: string; id: string }) => {
    return axios.delete(`${API_BASE}/leave-requests/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getClassroomLeaveRequests: ({
    authToken,
    classroomId,
    date,
  }: {
    authToken: string;
    classroomId: string;
    date: string;
  }): Promise<{ data: LeaveRequest[] }> => {
    return axios.get(
      `${API_BASE}/leave-requests/classroom/${classroomId}/${date}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  },
};
