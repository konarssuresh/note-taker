import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";

import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";
import { useSaveNoteMutation } from "./hooks/useSaveNoteMutation";
import { ArchiveModal, DeleteModal } from "../note-actions/note-actions";
import IconTag from "../../common-components/Icons/IconTag";
import IconClock from "../../common-components/Icons/IconClock";
import IconArrowLeft from "../../common-components/Icons/IconArrowLeft";
import IconDelete from "../../common-components/Icons/IconDelete";
import IconArchive from "../../common-components/Icons/IconArchive";
import Editor from "../../common-components/editor";
import { Button } from "../../common-components/button";
import { showDialog } from "../../common-components/dialog-container";

const validateTags = (value) => {
  if (!value) return true;
  const tagsArray = value.split(",").map((tag) => tag.trim());
  const isValid = tagsArray.every((tag) => tag.length > 0);
  return isValid || "Tags must be non-empty strings separated by commas";
};

const NoteActions = ({ saveNote, form = {}, note }) => {
  const { setSelectedMenu } = useNoteStore();

  const {
    formState: { errors, isDirty },
    getValues,
  } = form;

  const handleArchieve = () => {
    const closeDialog = showDialog(
      <ArchiveModal
        closeDialog={() => {
          closeDialog();
        }}
      />
    );
  };

  const handleDelete = () => {
    const closeDialog = showDialog(
      <DeleteModal closeDialog={() => closeDialog()} />
    );
  };

  const handleBackClick = () => {
    if (note.status === "archieved") {
      setSelectedMenu(MENU_NAMES.ARCHIEVED_NOTES);
    }
    if (note.status === "active") {
      setSelectedMenu(MENU_NAMES.ALL_NOTES);
    }
  };
  return (
    <div className="flex flex-row md:hidden text-neutral-600 pb-3 border-b border-neutral-200 justify-between">
      <button
        className="flex flex-row gap-1 items-center"
        onClick={handleBackClick}
      >
        <IconArrowLeft size={18} />
        <span className="text-preset-5">Go Back</span>
      </button>
      <div className="flex flex-row gap-4 items-center">
        <button onClick={handleDelete}>
          <IconDelete size={18} />
        </button>
        <button onClick={handleArchieve}>
          <IconArchive size={18} />
        </button>
        <button
          onClick={() => {
            saveNote(getValues());
          }}
          disabled={isDirty && !isEmpty(errors)}
          className="text-preset-5 text-blue-500 cursor-pointer disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const NoteDetails = () => {
  const { mutate: saveNote } = useSaveNoteMutation();
  const { selectedNote, isCreateNote } = useNoteStore();
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const {
    reset,
    control,
    formState: { isDirty, errors },
    getValues,
  } = form;

  useEffect(() => {
    if (isCreateNote) {
      reset({
        title: "",
        content: "",
        tags: "",
      });
    } else if (selectedNote) {
      reset({
        ...selectedNote,
        title: selectedNote.title,
        content: selectedNote.content,
        tags: selectedNote.tags.reduce((acc, value) => {
          if (acc === "") {
            return value;
          }
          return `${acc},${value}`;
        }, ""),
      });
    }
  }, [isCreateNote, selectedNote, reset]);

  const formattedDate = selectedNote
    ? dayjs(selectedNote?.updatedAt).format("D MMM YYYY")
    : "";

  return (
    <div className="px-4 py-3 md:px-6 md:py-5 flex flex-col gap-4 h-full">
      <NoteActions form={form} saveNote={saveNote} note={selectedNote} />
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <input
              className="text-preset-1"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter title here..."
              ref={ref}
            />
          );
        }}
        rules={{ required: "Title is required" }}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row">
          <div className="flex flex-row w-29 gap-1">
            <IconTag className="text-neutral-700" size={16} />
            <span className="text-preset-5 text-neutral-700">Tags</span>
          </div>
          <Controller
            control={control}
            name="tags"
            rules={{ validate: validateTags }}
            render={({ field: { value, onChange, onBlur, ref } }) => {
              return (
                <input
                  className="text-preset-5 flex-grow text-neutral-700 placeholder-neutral-400"
                  placeholder="Add tags separated by commas (e.g. Work, Planning)"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-row">
          <div className="flex flex-row w-29 gap-1">
            <IconClock className="text-neutral-700" size={16} />
            <span className="text-preset-5 text-neutral-700">Last Edited</span>
          </div>
          <span
            className={`text-preset-5 flex-grow  ${isCreateNote ? "text-neutral-400" : "text-neutral-700"}`}
          >
            {isCreateNote ? "Not yet saved" : formattedDate}
          </span>
        </div>
      </div>
      <hr className="text-neutral-200" />
      <Controller
        name="content"
        control={control}
        rules={{ required: "Note should not be empty" }}
        render={({ field: { value, onBlur, onChange } }) => {
          return (
            <Editor
              className="flex-grow md:max-h-[62.5vh] overflow-y-auto"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        }}
      />
      <hr className="text-neutral-200 md:flex hidden" />
      <div className="hidden md:flex flex-row">
        <Button
          variant="primary"
          disabled={!isDirty || !isEmpty(errors)}
          onClick={() => {
            saveNote(getValues());
          }}
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default NoteDetails;
