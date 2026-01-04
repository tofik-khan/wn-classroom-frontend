import { API } from "@/api";
import { Announcement } from "@/types/announcement";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAnnouncementMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: Announcement }) => {
      const token = await getAccessTokenSilently();
      return API.createAnnouncement({ authToken: token, data });
    },
    onSuccess: (params) => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      onSuccess(params);
    },
    onError,
  });
};

export const useAnnouncementQuery = (id) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getAnnouncements({ authToken: token, classroomId: id });
    },
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
};
