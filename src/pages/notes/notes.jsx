import NotesList from "../../components/notes-list/notes-list.jsx";
import NoteDetails from "../../components/note-detail/note-details.jsx";
import NoteActions from "../../components/note-actions/note-actions.jsx";
import { useNoteStore } from "../../store/useNoteStore";

const Notes = () => {
  const { selectedNote, isCreateNote } = useNoteStore();
  return (
    <div className="flex flex-col h-full px-4">
      <section className="flex flex-row justify-between px-8 py-6 border-b border-neutral-200">
        <h3 className="text-preset-1">All Notes</h3>
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
  );
};

export default Notes;
