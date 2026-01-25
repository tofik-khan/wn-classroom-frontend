import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useSessionInYearQuery = (year) => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    queryKey: ["sessionInYear"],
    queryFn: async () => {
      const authToken = await getAccessTokenSilently();
      return API.getSessionsInYear({ authToken, year });
    },
    select: (response) => response.data,
  });
};

export const useSessionReportQuery = (date) => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    queryKey: ["sessionReport", date],
    queryFn: async () => {
      const authToken = await getAccessTokenSilently();
      return API.getSessionReport({ authToken, date });
    },
    select: (response) => response.data,
  });
};
