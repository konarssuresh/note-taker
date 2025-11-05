import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/constants";

export const useArchiveNoteMutation = () => {
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId, shouldArchieve }) => {
      const response = await fetch(
        `${API_BASE}notes/${noteId}/${shouldArchieve ? "archieve" : "unarchieve"}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Archiving note failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", "active"] });
      queryClient.invalidateQueries({ queryKey: ["notes", "archived"] });
    },
  });

  return archiveNoteMutation;
};
