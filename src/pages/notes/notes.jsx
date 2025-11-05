import { Fragment } from "react";
import NotesList from "../../components/notes-list/notes-list.jsx";
import NoteDetails from "../../components/note-detail/note-details.jsx";
import NoteActions from "../../components/note-actions/note-actions.jsx";
import NavMenu from "../../components/nav-menu/nav-menu.jsx";
import MobileNav from "../../components/nav-menu/mobile-nav.jsx";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";
import LogoIcon from "../../common-components/Icons/LogoIcon.jsx";

const TITLE_MAP = {
  [MENU_NAMES.ALL_NOTES]: "All Notes",
  [MENU_NAMES.ARCHIEVED_NOTES]: "Archived Notes",
};

const Notes = () => {
  const { selectedNote, isCreateNote, selectedMenu, selectedTag } =
    useNoteStore();
  return (
    <Fragment>
      <div className="hidden md:flex flex-row h-full w-full">
        <div className="hidden md:flex ">
          <NavMenu />
        </div>
        <div className="hidden md:flex flex-grow flex-col h-full px-4 border-l border-neutral-200">
          <section className="flex flex-row justify-between px-8 py-6 border-b border-neutral-200">
            {selectedTag ? (
              <h3 className="text-preset-1">
                <span className="text-neutral-600">Notes Tagged: </span>
                {selectedTag}
              </h3>
            ) : (
              <h3 className="text-preset-1">{TITLE_MAP[selectedMenu]}</h3>
            )}
          </section>

          <section className="flex flex-row flex-grow">
            <div className="md:w-72.5">
              <NotesList selectedTag={selectedTag} />
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
      <div className="w-full h-full flex flex-col md:hidden">
        <div className="h-13 px-4 py-3 bg-neutral-100 fixed w-full top-0">
          <LogoIcon />
        </div>
        <div className="pt-13 pb-18 flex-grow flex-col h-full">
          {!selectedNote &&
            !isCreateNote &&
            [MENU_NAMES.ALL_NOTES, MENU_NAMES.ARCHIEVED_NOTES].includes(
              selectedMenu
            ) && <NotesList />}
          {(selectedNote || isCreateNote) && <NoteDetails />}
        </div>
        <div className="fixed bottom-0 w-full z-10 bg-white">
          <MobileNav />
        </div>
      </div>
    </Fragment>
  );
};

export default Notes;
