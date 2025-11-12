import { Fragment, useMemo } from "react";
import dayjs from "dayjs";
import toLower from "lodash/toLower";
import some from "lodash/some";
import { useNotesListQuery } from "./hooks/useNotesList";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";
import { Button } from "../../common-components/button";
import IconPlus from "../../common-components/Icons/IconPlus";
import IconArrowLeft from "../../common-components/Icons/IconArrowLeft";
import IconSearch from "../../common-components/Icons/IconSearch";
import { TextField } from "../../common-components/text-field";

const Note = ({ note = {} }) => {
  const { setSelectedNote, selectedNote } = useNoteStore();
  const { title = "", tags = [], updatedAt } = note;
  const formattedDate = updatedAt ? dayjs(updatedAt).format("D MMM YYYY") : "";

  const handleNoteClick = () => {
    setSelectedNote(note);
  };

  const bgNeutral =
    selectedNote?._id === note._id ? "bg-neutral-200 rounded-md" : "";

  return (
    <div
      className={`${bgNeutral} flex flex-col gap-2 p-2 cursor-pointer`}
      onClick={handleNoteClick}
    >
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

const NotesList = ({ selectedTag = "", isSearch }) => {
  const {
    setIsCreateNote,
    selectedMenu,
    setSelectedMenu,
    setSelectedTag,
    searchText: searchTextCaseSensitive,
    setSearchText,
  } = useNoteStore();
  const {
    data = [],
    isLoading,
    isError,
  } = useNotesListQuery({
    isArchieved: selectedMenu === MENU_NAMES.ARCHIEVED_NOTES,
  });

  const searchText = toLower(searchTextCaseSensitive);

  const displayData = useMemo(() => {
    let filteredData = data;
    if (selectedTag && selectedMenu === MENU_NAMES.ALL_NOTES) {
      filteredData = filteredData.filter((note) =>
        note.tags.includes(selectedTag)
      );
    }

    if (searchText) {
      filteredData = filteredData.filter((note) => {
        if (toLower(note.content).includes(searchText)) {
          return true;
        }
        if (toLower(note.title).includes(searchText)) {
          return true;
        }
        if (some(note.tags, (tag) => toLower(tag).includes(searchText))) {
          return true;
        }
        return false;
      });
    }
    return filteredData;
  }, [data, selectedTag, selectedMenu, searchText]);

  const handleBackClick = () => {
    setSelectedMenu(MENU_NAMES.TAGS);
    setSelectedTag(null);
  };

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
      <div className="flex flex-col gap-4 md:p-4">
        {selectedMenu !== MENU_NAMES.ARCHIEVED_NOTES && (
          <Button
            vatiant="primary"
            className="hidden md:flex md:flex-row md:gap-2  md:visible"
            onClick={() => setIsCreateNote(true)}
          >
            <IconPlus size={16} />
            <span className="text-preset-4">Create New Note</span>
          </Button>
        )}
        <div className="text-preset-5 bg-neutral-100 p-2 rounded-md">
          You don’t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </div>
        <Button
          variant="primary"
          isRounded
          className="w-14 h-14 md:hidden flex items-center fixed bottom-20 right-5 rounded-full"
          onClick={() => setIsCreateNote(true)}
        >
          <IconPlus size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-5 md:p-4">
      {selectedMenu !== MENU_NAMES.ARCHIEVED_NOTES && (
        <Button
          vatiant="primary"
          className="hidden md:flex md:flex-row md:gap-2  md:visible"
          onClick={() => setIsCreateNote(true)}
        >
          <IconPlus size={16} />
          <span className="text-preset-4">Create New Note</span>
        </Button>
      )}
      {selectedTag && (
        <button
          className="flex flex-row gap-1 items-center"
          onClick={handleBackClick}
        >
          <IconArrowLeft size={18} />
          <span className="text-preset-5">Go Back</span>
        </button>
      )}
      <div className="flex flex-row">
        {isSearch ? (
          <span className="text-preset-1 h-7">Search</span>
        ) : (
          <span className="text-preset-1">
            {selectedMenu === MENU_NAMES.ALL_NOTES &&
              !selectedTag &&
              "All Notes"}
            {selectedTag && (
              <div className="flex flex-row gap-2">
                <span className="text-neutral-600">Notes Tagged:</span>
                <span>{selectedTag}</span>
              </div>
            )}
            {selectedMenu === MENU_NAMES.ARCHIEVED_NOTES && "Archived Notes"}
          </span>
        )}
      </div>

      {isSearch && (
        <>
          <div className="w-full">
            <TextField
              //className="w-75 h-11"
              startIcon={<IconSearch />}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search by title, content or tags"
            />
          </div>
          {searchText && (
            <span className="text-preset-5 text-neutral-600">
              All notes matching ”{searchTextCaseSensitive}” are displayed
              below.
            </span>
          )}
        </>
      )}

      <div className="flex flex-col">
        {displayData.map((note, index) => (
          <Fragment key={note?._id}>
            <Note key={note?._id} note={note} />
            {index !== data.length - 1 && <hr className="text-neutral-200" />}
          </Fragment>
        ))}
        <Button
          variant="primary"
          isRounded
          className="w-14 h-14 md:hidden flex items-center fixed bottom-20 right-5 rounded-full"
          onClick={() => setIsCreateNote(true)}
        >
          <IconPlus size={24} />
        </Button>
      </div>
    </div>
  );
};

export default NotesList;
