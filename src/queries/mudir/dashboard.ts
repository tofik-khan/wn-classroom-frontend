import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useImageKitUsageQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/imageKitUsage"],
    queryFn: API.getImageKitUsage,
    select: (response) => response.data,
  });

export const useDigitalOceanQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/status/digitalocean"],
    queryFn: API.getDigitalOceanStatus,
    select: (response) => response.data,
  });

export const useMongoDbQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/status/mongodb"],
    queryFn: API.getMongoDbStatus,
    select: (response) => response.data,
  });

export const useDashboardNotificationsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["mudir/notifications"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getDashboardNotifications({ authToken: token });
    },
    select: (response) => response.data,
    enabled: !!isAuthenticated,
  });
};
