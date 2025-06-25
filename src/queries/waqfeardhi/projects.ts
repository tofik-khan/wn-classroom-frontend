import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { Project } from "@/types/waqfeardhi";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export const useProjectsQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/projects"],
    queryFn: API.getProjects,
    select: (response) => response.data,
  });

/** MUTATIONS */

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: Project }) =>
      API.createProject({ authToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waqfeardhi/projects"] });
      navigate("/protected/waqfeardhi/projects");
    },
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: Project }) =>
      API.updateProject({ authToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waqfeardhi/projects"] });
      navigate("/protected/waqfeardhi/projects");
    },
  });
};

export const useUpdateProjectSortOrderMutation = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { _id: string; sortOrder: number }[];
    }) =>
      API.updateProjectsSortOrder({
        authToken: await getAccessTokenSilently(),
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waqfeardhi/projects"] });
    },
  });
};
