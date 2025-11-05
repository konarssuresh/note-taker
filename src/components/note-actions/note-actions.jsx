import { useNoteStore } from "../../store/useNoteStore";
import { useArchiveNoteMutation } from "./hooks/useArchieveNoteMutation";
import { useDeleteNoteMutation } from "./hooks/useDeleteNoteMutation";
import { Button } from "../../common-components/button";
import IconArchive from "../../common-components/Icons/IconArchive";
import IconDelete from "../../common-components/Icons/IconDelete";
import { ModalDialog } from "../../common-components/dialog";
import { showDialog } from "../../common-components/dialog-container";

export const ArchiveModal = ({ closeDialog }) => {
  const { selectedNote, setSelectedNote } = useNoteStore();
  const { mutate: archieveNote } = useArchiveNoteMutation();
  return (
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
          text: `${selectedNote.status === "active" ? "Archive" : "Unarchive"} Note`,
          onClick: () => {
            archieveNote(
              {
                noteId: selectedNote._id,
                shouldArchieve: selectedNote.status === "active",
              },
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
      title={`${selectedNote.status === "active" ? "Archive" : "Unarchive"} Note`}
      onClose={() => closeDialog()}
    >
      Are you sure you want to{" "}
      {`${selectedNote.status === "active" ? "Archive" : "Unarchive"}`} this
      note? You can find it in the Archived Notes section and restore it
      anytime.
    </ModalDialog>
  );
};

export const DeleteModal = ({ closeDialog }) => {
  const { selectedNote, setSelectedNote } = useNoteStore();

  const { mutate: deleteNote } = useDeleteNoteMutation();

  return (
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
            deleteNote(
              {
                noteId: selectedNote._id,
              },
              {
                onSuccess: () => {
                  setSelectedNote(null);
                  closeDialog();
                },
                onError: (error) => {
                  console.error("Error deleting note:", error);
                },
              }
            );
          },
        },
      ]}
      icon={<IconDelete size={24} />}
      title="Delete Note"
      onClose={() => closeDialog()}
    >
      Are you sure you want to permanently delete this note? This action cannot
      be undone.
    </ModalDialog>
  );
};

const NoteActions = () => {
  const { selectedNote } = useNoteStore();

  if (!selectedNote) {
    return null;
  }

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

  return (
    <>
      <div className="flex flex-col gap-3  px-4 pt-5">
        <Button
          variant="border"
          className="flex flex-row items-center gap-2"
          onClick={handleArchieve}
        >
          <IconArchive size={16} />
          {selectedNote?.status === "archieved" ? "Unarchive" : "Archive"} Note
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
