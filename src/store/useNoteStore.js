import { create } from "zustand";

export const useNoteStore = create((set) => ({
  selectedNote: null,
  setSelectedNote: (v) => set({ selectedNote: v, isCreateNote: false }),
  isCreateNote: false,
  setIsCreateNote: (value) => set({ selectedNote: null, isCreateNote: value }),
}));
