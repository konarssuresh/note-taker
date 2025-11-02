import { Fragment } from "react";
import dayjs from "dayjs";
import { useNotesListQuery } from "./hooks/useNotesList";
import { Button } from "../../common-components/button";
import IconPlus from "../../common-components/Icons/IconPlus";
const Note = ({ note = {} }) => {
  const { title = "", tags = [], updatedAt } = note;
  const formattedDate = updatedAt ? dayjs(updatedAt).format("D MMM YYYY") : "";

  return (
    <div className="flex flex-col gap-2 p-2">
      <h4 className="text-preset-3 text-neutral-950">{title}</h4>
      <div className="flex flex-row gap-1">
        {tags?.map((tag) => {
          return (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-preset-6 bg-neutral-200 text-neutral-950 rounded-md"
            >
              {tag}
            </span>
          );
        })}
      </div>
      <span className="text-neutral-700 text-preset-6">{formattedDate}</span>
    </div>
  );
};

const NotesList = ({ selectedTag = "" }) => {
  const { data = [], isLoading, isError } = useNotesListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div className="text-preset-5 bg-red-200 p-2 rounded-md">
        Error loading notes.
      </div>
    );
  }
  if (!isLoading && data.length === 0) {
    return (
      <div className="text-preset-5 bg-neutral-200 p-2 rounded-md">
        You don’t have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </div>
    );
  }

  console.log("selectedTag:", selectedTag);

  return (
    <div className="flex flex-col gap-4 md:p-4">
      <Button
        vatiant="primary"
        className="hidden md:flex md:flex-row md:gap-2  md:visible"
      >
        <IconPlus size={16} />
        <span className="text-preset-4">Create New Note</span>
      </Button>
      <div className="flex flex-col">
        {data.map((note, index) => (
          <Fragment key={note?._id}>
            <Note key={note?._id} note={note} />
            {index !== data.length - 1 && <hr className="text-neutral-200" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
