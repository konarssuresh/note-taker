import { useQuery } from "@tanstack/react-query";

export const useNotesListQuery = () => {
  const queryData = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/notes/active", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      return response.json();
    },
  });

  return queryData;
};
