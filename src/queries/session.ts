import { API } from "@/api";
import { Session } from "@/types/session";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSessionQuery = (classroomId) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["session", classroomId],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getSession({ authToken: token, classroomId });
    },
    enabled: isAuthenticated && !!classroomId,
    select: (response) => response.data,
    refetchInterval: (data) => (!!data ? 10000 : false),
  });
};

export const useSessionMutation = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      const token = await getAccessTokenSilently();
      return API.createSession({ authToken: token, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
