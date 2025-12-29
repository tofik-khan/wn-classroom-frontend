import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "@/types/user";
import { useAppSelector } from "@/hooks";

export const useUserQuery = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const email = user?.email ?? "";
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getUser({ email, authToken: token });
    },
    enabled: !!isAuthenticated && email !== "",
    select: (response) => response.data && response.data[0],
  });
};

export const useUserMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: User }) => {
      const token = await getAccessTokenSilently();
      return API.updateUser({ authToken: token, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
    onError,
  });
};

export const useUnenrolledUserQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);
  return useQuery({
    queryKey: ["users/unenrolled"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getUnenrolledUsers({ authToken: token });
    },
    enabled: !!isAuthenticated && currentUser.role === "admin",
    select: (response) => response.data,
  });
};

export const useEnrollInClassMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ classrooms, id }: { classrooms: string[]; id }) => {
      const token = await getAccessTokenSilently();
      return API.enrollInClass({ authToken: token, classrooms, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
    onError,
  });
};
