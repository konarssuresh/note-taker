import NotesList from "../../components/notes-list/notes-list.jsx";
import NoteDetails from "../../components/note-detail/note-details.jsx";
import NoteActions from "../../components/note-actions/note-actions.jsx";
import NavMenu from "../../components/nav-menu/nav-menu.jsx";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";

const TITLE_MAP = {
  [MENU_NAMES.ALL_NOTES]: "All Notes",
  [MENU_NAMES.ARCHIEVED_NOTES]: "Archived Notes",
};

const Notes = () => {
  const { selectedNote, isCreateNote, selectedMenu } = useNoteStore();
  return (
    <div className="flex flex-row h-full w-full">
      <div className="hidden md:flex ">
        <NavMenu />
      </div>
      <div className="flex-grow flex flex-col h-full px-4 border-l border-neutral-200">
        <section className="flex flex-row justify-between px-8 py-6 border-b border-neutral-200">
          <h3 className="text-preset-1">{TITLE_MAP[selectedMenu]}</h3>
        </section>
        <section className="flex flex-row flex-grow">
          <div className="md:w-72.5">
            <NotesList />
          </div>
          <div className="border-r border-l border-neutral-200 flex-grow">
            {(selectedNote || isCreateNote) && <NoteDetails />}
          </div>
          <div className="md:w-60">
            <NoteActions />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Notes;
