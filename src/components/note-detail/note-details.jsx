import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";

import { useNoteStore } from "../../store/useNoteStore";
import { useSaveNoteMutation } from "./hooks/useSaveNoteMutation";
import IconTag from "../../common-components/Icons/IconTag";
import IconClock from "../../common-components/Icons/IconClock";
import Editor from "../../common-components/editor";
import { Button } from "../../common-components/button";

const validateTags = (value) => {
  if (!value) return true;
  const tagsArray = value.split(",").map((tag) => tag.trim());
  const isValid = tagsArray.every((tag) => tag.length > 0);
  return isValid || "Tags must be non-empty strings separated by commas";
};

const NoteDetails = () => {
  const { mutate: saveNote } = useSaveNoteMutation();
  const { selectedNote, isCreateNote } = useNoteStore();
  const {
    reset,
    control,
    formState: { isDirty, errors },
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

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
    <div className="px-6 py-5 flex flex-col gap-4 h-full">
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
      <hr className="text-neutral-200" />
      <div className="flex flex-row">
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
