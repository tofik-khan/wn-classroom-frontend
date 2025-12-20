import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useStudentsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getStudents({ authToken: token });
    },
    enabled: !!isAuthenticated,
    select: (response) => response.data,
  });
};
