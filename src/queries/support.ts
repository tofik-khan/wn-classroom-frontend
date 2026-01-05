import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";

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
