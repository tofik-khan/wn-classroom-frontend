import { API } from "@/api";
import { useAppSelector } from "@/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyLeaveRequestsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: ["myLeaveRequests"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getMyLeaveRequests({ authToken: token });
    },
    enabled:
      isAuthenticated && ["student", "parent"].includes(currentUser?.role),
    select: (response) => response.data,
  });
};

export const useClassroomLeaveRequestsQuery = (
  classroomId: string | undefined,
  date: string,
) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);

  return useQuery({
    queryKey: ["classroomLeaveRequests", classroomId, date],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getClassroomLeaveRequests({
        authToken: token,
        classroomId: classroomId!,
        date,
      });
    },
    enabled:
      isAuthenticated &&
      !!classroomId &&
      ["admin", "teacher", "substitute"].includes(currentUser?.role),
    select: (response) => response.data,
  });
};

export const useLeaveRequestMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { studentId: string; classroomIds: string[]; reason: string };
    }) => {
      const token = await getAccessTokenSilently();
      return API.createLeaveRequests({ authToken: token, data });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({ queryKey: ["myLeaveRequests"] });
      onSuccess(params);
    },
    onError,
  });
};

export const useCancelLeaveRequestMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const token = await getAccessTokenSilently();
      return API.cancelLeaveRequest({ authToken: token, id });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({ queryKey: ["myLeaveRequests"] });
      onSuccess(params);
    },
    onError,
  });
};
