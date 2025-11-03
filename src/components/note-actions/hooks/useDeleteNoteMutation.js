import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId }) => {
      const response = await fetch(`http://localhost:8000/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Archiving note failed");
      }
      return { message: "Note deleted successfully", _id: noteId };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", "active"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((note) => note._id !== data._id);
      });
      queryClient.setQueryData(["notes", "archived"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((note) => note._id !== data._id);
      });
    },
  });

  return archiveNoteMutation;
};
