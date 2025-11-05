import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";
import IconHome from "../../common-components/Icons/IconHome";
import IconSearch from "../../common-components/Icons/IconSearch";
import IconArchive from "../../common-components/Icons/IconArchive";
import IconTag from "../../common-components/Icons/IconTag";
import IconSettings from "../../common-components/Icons/IconSearch";
import { NavItem } from "./tags";

const MobileNav = () => {
  const { selectedMenu, selectedTag, setSelectedMenu } = useNoteStore();
  return (
    <div className="px-4 py-3 h-14 shadow-md flex flex-row items-center justify-between">
      <NavItem
        isMobile
        icon={<IconHome />}
        isSelected={selectedMenu === MENU_NAMES.ALL_NOTES && !selectedTag}
        onClick={() => {
          setSelectedMenu(MENU_NAMES.ALL_NOTES);
        }}
      />
      <NavItem isMobile icon={<IconSearch />} />
      <NavItem
        isMobile
        icon={<IconArchive />}
        isSelected={selectedMenu === MENU_NAMES.ARCHIEVED_NOTES}
        onClick={() => {
          setSelectedMenu(MENU_NAMES.ARCHIEVED_NOTES);
        }}
      />
      <NavItem isMobile icon={<IconTag />} isSelected={selectedTag} />
      <NavItem isMobile icon={<IconSettings />} />
    </div>
  );
};

export default MobileNav;
