import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useArchiveNoteMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const archiveNoteMutation = useMutation({
    mutationFn: async ({ noteId, shouldArchieve }) => {
      const response = await fetch(
        `${API_BASE}/notes/${noteId}/${shouldArchieve ? "archieve" : "unarchieve"}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }
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
