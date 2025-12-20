import { API } from "@/api";
import { User } from "@/types/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStudentsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getStudents({ authToken: token });
    },
    enabled: !!isAuthenticated,
    select: (response) => response.data,
  });
};

export const useOneStudentsQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getOneStudent({ authToken: token, id });
    },
    enabled: !!isAuthenticated,
    select: (response) => response.data,
  });
};

export const useStudentUpdateMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: User; id: string }) => {
      const token = await getAccessTokenSilently();
      return API.updateStudent({
        authToken: token,
        id,
        data,
      });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
      onSuccess(params);
    },
    onError,
  });
};
