import { useQuery } from "@tanstack/react-query";

export const useNotesListQuery = ({ isArchieved } = {}) => {
  const queryData = useQuery({
    queryKey: ["notes", isArchieved ? "archived" : "active"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/notes/${isArchieved ? "archieved" : "active"}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();

      return data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    },
  });

  return queryData;
};
