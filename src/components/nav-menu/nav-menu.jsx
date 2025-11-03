import LogoIcon from "../../common-components/Icons/LogoIcon";
import IconArchive from "../../common-components/Icons/IconArchive";
import IconHome from "../../common-components/Icons/IconHome";
import { Tags, NavItem } from "./tags";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";

const NavMenu = () => {
  const { selectedMenu, selectedTag, setSelectedMenu, setSelectedTag } =
    useNoteStore();
  return (
    <div className="px-4 py-3 w-68 flex flex-col gap-4">
      <span className="py-3">
        <LogoIcon />
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <NavItem
            label="All Notes"
            icon={<IconHome />}
            isSelected={
              selectedMenu === MENU_NAMES.ALL_NOTES && selectedTag === null
            }
            onClick={() => {
              setSelectedMenu(MENU_NAMES.ALL_NOTES);
              setSelectedTag(null);
            }}
          />
          <NavItem
            label="Archived Notes"
            icon={<IconArchive />}
            isSelected={
              selectedMenu === MENU_NAMES.ARCHIEVED_NOTES &&
              selectedTag === null
            }
            onClick={() => {
              setSelectedMenu(MENU_NAMES.ARCHIEVED_NOTES);
              setSelectedTag(null);
            }}
          />
        </div>
        <hr className="text-neutral-200" />
        <Tags />
      </div>
    </div>
  );
};

export default NavMenu;
