import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../constants/constants";

export const useNotesListQuery = ({ isArchieved } = {}) => {
  const navigate = useNavigate();
  const queryData = useQuery({
    queryKey: ["notes", isArchieved ? "archived" : "active"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE}/notes/${isArchieved ? "archieved" : "active"}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        }
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();

      return data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    },
  });

  return queryData;
};
