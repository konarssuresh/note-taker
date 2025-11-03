import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useArchiveNoteMutation = () => {
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId, shouldArchieve }) => {
      const response = await fetch(
        `http://localhost:8000/notes/${noteId}/${shouldArchieve ? "archieve" : "unarchieve"}`,
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
