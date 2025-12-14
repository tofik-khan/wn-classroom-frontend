import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "@/types/user";

export const useUserQuery = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const email = user?.email ?? "";
  return useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getUser({ email, authToken: token });
    },
    enabled: !!isAuthenticated && email !== "",
    select: (response) => response.data && response.data[0],
  });
};

export const useUserMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: User }) =>
      API.updateUser({ authToken, data }),
    onSuccess: () => onSuccess(),
    onError,
  });
};
