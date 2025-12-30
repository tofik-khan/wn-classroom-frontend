import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Teacher } from "@/types/teacher";
import { useAppSelector } from "@/hooks";

export const useTeacherQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getTeachers({ authToken: token });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};

export const useOneTeacherQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getOneTeacher({ authToken: token, id });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};

export const useTeachersMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: Teacher }) => {
      const token = await getAccessTokenSilently();
      return API.createTeacher({ authToken: token, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      onSuccess();
    },
    onError,
  });
};

export const useTeacherUpdateMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: any; id: string }) => {
      const token = await getAccessTokenSilently();
      return API.updateTeacher({
        authToken: token,
        id,
        data,
      });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacher"],
      });
      onSuccess(params);
    },
    onError,
  });
};

export const useTeacherByClassIdQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);
  return useQuery({
    queryKey: ["teacherByClassId", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getTeacherByClassId({ authToken: token, id });
    },
    enabled: isAuthenticated && currentUser.role !== "teacher",
    select: (response) => response.data,
  });
};
