import { create } from "zustand";

export const MENU_NAMES = {
  ALL_NOTES: "all-notes",
  ARCHIEVED_NOTES: "archieved-notes",
  TAGS: "tags",
  SETTINGS: "settings",
};
export const useNoteStore = create((set) => ({
  selectedNote: null,
  setSelectedNote: (v) => set({ selectedNote: v, isCreateNote: false }),
  isCreateNote: false,
  setIsCreateNote: (value) => set({ selectedNote: null, isCreateNote: value }),
  selectedMenu: MENU_NAMES.ALL_NOTES,
  setSelectedMenu: (menuName) =>
    set({ selectedNote: null, isCreateNote: false, selectedMenu: menuName }),
  selectedTag: null,
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  reset: () =>
    set({
      selectedNote: null,
      isCreateNote: false,
      selectedMenu: MENU_NAMES.ALL_NOTES,
      selectedTag: null,
    }),
}));
