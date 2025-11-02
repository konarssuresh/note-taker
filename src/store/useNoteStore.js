import { create } from "zustand";

export const useNoteStore = create((set) => ({
  selectedNote: null,
  setSelectedNote: (id) => set({ selectedNote: id, isCreateNote: false }),
  isCreateNote: false,
  setIsCreateNote: (value) => set({ selectedNote: null, isCreateNote: value }),
}));
