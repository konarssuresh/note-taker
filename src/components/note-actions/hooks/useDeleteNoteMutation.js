import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/constants";

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId }) => {
      const response = await fetch(`${API_BASE}/notes/${noteId}`, {
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
