import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "../../../store/useNoteStore";

export const useSaveNoteMutation = () => {
  const { setSelectedNote } = useNoteStore();
  const queryClient = useQueryClient();
  const saveNoteMutation = useMutation({
    mutationFn: async (data) => {
      const { _id = null, title, content, tags } = data;
      const response = await fetch(
        `http://localhost:8000/notes${_id ? "/" + _id : ""}`,
        {
          method: _id ? "PATCH" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Save note failed");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes", "active"], (oldData) => {
        if (!oldData) return [data];
        const existingNoteIndex = oldData.findIndex(
          (note) => note._id === data._id
        );
        if (existingNoteIndex !== -1) {
          const updatedNotes = [...oldData];
          updatedNotes[existingNoteIndex] = data;
          updatedNotes.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          return updatedNotes;
        } else {
          return [data, ...oldData];
        }
      });
      setSelectedNote(data);
    },
  });

  return saveNoteMutation;
};
