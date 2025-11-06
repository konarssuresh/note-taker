import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useDeleteNoteMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId }) => {
      const response = await fetch(`${API_BASE}/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }
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
