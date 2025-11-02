import { useMutation } from "@tanstack/react-query";

export const useSaveNoteMutation = () => {
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
  });

  return saveNoteMutation;
};
