import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useStudentsInJammatQuery = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    queryKey: ["studentsInJammat"],
    queryFn: async () => {
      const authToken = await getAccessTokenSilently();
      return API.getStudentsinJammat({ authToken });
    },
    select: (response) => response.data,
  });
};
