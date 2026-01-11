import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { Admin } from "@/types/admin";
import { useAuth0 } from "@auth0/auth0-react";

//TODO: Update the Mutation and Query function to generate authToken here instead of the component

export const useAdminsQuery = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getAdmins({ authToken: token });
    },
    select: (response) => response.data,
  });
};

/** MUTATIONS */

export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: Admin }) =>
      API.createAdmin({ authToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};

export const useUpdateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: Admin }) =>
      API.updateAdmin({
        authToken,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
};
