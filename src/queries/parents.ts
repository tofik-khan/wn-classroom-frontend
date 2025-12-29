import { API } from "@/api";
import { User } from "@/types/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useParentsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["parents"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getParents({ authToken: token });
    },
    enabled: !!isAuthenticated,
    select: (response) => response.data,
  });
};

export const useOneParentsQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["parent", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getOneParent({ authToken: token, id });
    },
    enabled: !!isAuthenticated,
    select: (response) => response.data,
  });
};

export const useUpdateParentMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: User; id: string }) => {
      const token = await getAccessTokenSilently();
      return API.updateParent({
        authToken: token,
        id,
        data,
      });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({
        queryKey: ["parents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["parent"],
      });
      onSuccess(params);
    },
    onError,
  });
};

export const useMyStudentsQuery = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  return useQuery({
    queryKey: ["myStudents"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getMyStudents({ authToken: token, email: user?.email });
    },
    enabled: !!user?.email,
    select: (response) => response.data,
  });
};

export const useMyStudentsMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: User }) => {
      const token = await getAccessTokenSilently();
      return API.createStudent({
        authToken: token,
        data,
      });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({
        queryKey: ["myStudents"],
      });
      onSuccess(params);
    },
    onError,
  });
};
