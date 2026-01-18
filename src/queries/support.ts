import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSupportMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      return API.createSupportCase({ data });
    },
    onSuccess,
    onError,
  });
};

export const useSupportQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["support", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getSupportCase({ authToken: token, id });
    },
    enabled: isAuthenticated && !!id,
    select: (response) => response.data,
  });
};

export const useAllSupportCasesQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["supportcases"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getAllSupportCases({ authToken: token });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};

export const useUpdateSupportCaseMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Object }) => {
      const authToken = await getAccessTokenSilently();
      return API.updateSupportCase({ authToken, id, data });
    },
    onSuccess,
    onError,
  });
};
