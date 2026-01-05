import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Classroom } from "@/types/classroom";

export const useClassroomQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getClassrooms({ authToken: token });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};

export const useOneClassroomQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["classroom", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getOneClass({ authToken: token, id });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};

export const useClassroomMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: Classroom }) => {
      const token = await getAccessTokenSilently();
      return API.createClassroom({ authToken: token, data });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
      onSuccess(params);
    },
    onError,
  });
};

export const useUpdateClassroomMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ data, id }: { data: Classroom; id: string }) => {
      const token = await getAccessTokenSilently();
      return API.updateClassroom({ authToken: token, data, id });
    },
    onSuccess: (params) => {
      onSuccess(params);
    },
    onError,
  });
};

export const useClassroomResourceMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: { link: string; title: string };
      id?: string;
    }) => {
      const token = await getAccessTokenSilently();
      return API.addClassroomResource({ authToken: token, data, id });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({ queryKey: ["classroom"] });
      onSuccess(params);
    },
    onError,
  });
};
