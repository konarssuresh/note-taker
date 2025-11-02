import { useNoteStore } from "../../store/useNoteStore";
import { useArchiveNoteMutation } from "./hooks/useArchieveNoteMutation";
import { Button } from "../../common-components/button";
import IconArchive from "../../common-components/Icons/IconArchive";
import IconDelete from "../../common-components/Icons/IconDelete";
import { ModalDialog } from "../../common-components/dialog";
import { showDialog } from "../../common-components/dialog-container";

const NoteActions = () => {
  const { selectedNote, setSelectedNote } = useNoteStore();
  const { mutate: archieveNote } = useArchiveNoteMutation();

  if (!selectedNote) {
    return null;
  }

  const handleArchieve = () => {
    const closeDialog = showDialog(
      <ModalDialog
        open
        actions={[
          {
            variant: "secondary",
            onClick: () => {
              closeDialog();
            },
            text: "Cancel",
          },
          {
            variant: "primary",
            text: "Archieve Note",
            onClick: () => {
              archieveNote(
                { noteId: selectedNote._id, shouldArchieve: true },
                {
                  onSuccess: () => {
                    setSelectedNote(null);
                    closeDialog();
                  },
                }
              );
            },
          },
        ]}
        icon={<IconArchive size={24} />}
        title="Archieve Note"
        onClose={() => closeDialog()}
      >
        Are you sure you want to archive this note? You can find it in the
        Archived Notes section and restore it anytime.
      </ModalDialog>
    );
  };

  const handleDelete = () => {
    const closeDialog = showDialog(
      <ModalDialog
        open
        actions={[
          {
            variant: "secondary",
            onClick: () => {
              closeDialog();
            },
            text: "Cancel",
          },
          {
            variant: "danger",
            text: "Delete Note",
            onClick: () => {
              console.log("delete button is clicked");
            },
          },
        ]}
        icon={<IconDelete size={24} />}
        title="Delete Note"
        onClose={() => closeDialog()}
      >
        Are you sure you want to permanently delete this note? This action
        cannot be undone.
      </ModalDialog>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3  px-4 pt-5">
        <Button
          variant="border"
          className="flex flex-row items-center gap-2"
          onClick={handleArchieve}
        >
          <IconArchive size={16} />
          Archieve Note
        </Button>
        <Button
          variant="border"
          className="flex flex-row items-center gap-2"
          onClick={handleDelete}
        >
          <IconDelete size={16} /> Delete Note
        </Button>
      </div>
    </>
  );
};

export default NoteActions;
