import NotesList from "../../components/notes-list/notes-list.jsx";

const Notes = () => {
  return (
    <div className="flex flex-col h-full">
      <section className="flex flex-row justify-between px-8 py-6 border-b border-neutral-200">
        <h3 className="text-preset-1">All Notes</h3>
      </section>
      <section className="flex flex-row flex-grow">
        <div className="md:w-72.5 border-r border-neutral-200">
          <NotesList />
        </div>
      </section>
    </div>
  );
};

export default Notes;
