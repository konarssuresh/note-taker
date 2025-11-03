import LogoIcon from "../../common-components/Icons/LogoIcon";
import IconArchive from "../../common-components/Icons/IconArchive";
import IconHome from "../../common-components/Icons/IconHome";
import IconRight from "../../common-components/Icons/IconChevronRight";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";

const NavItem = ({ label, icon, isSelected, onClick }) => {
  const selectedClass = isSelected ? "bg-neutral-100" : "";
  const iconClass = isSelected ? "text-blue-500" : "text-neutral-950";
  return (
    <div
      className={`px-3 py-2.5 flex flex-row gap-2 items-center rounded-lg cursor-pointer ${selectedClass}`}
      onClick={onClick}
    >
      <span className={iconClass}>{icon}</span>
      <span className="text-preset-4 text-neutral-950 flex-grow">{label}</span>
      {isSelected && <IconRight size={16} className="text-neutral-950" />}
    </div>
  );
};

const NavMenu = () => {
  const { selectedMenu, setSelectedMenu } = useNoteStore();
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
            isSelected={selectedMenu === MENU_NAMES.ALL_NOTES}
            onClick={() => setSelectedMenu(MENU_NAMES.ALL_NOTES)}
          />
          <NavItem
            label="Archived Notes"
            icon={<IconArchive />}
            isSelected={selectedMenu === MENU_NAMES.ARCHIEVED_NOTES}
            onClick={() => setSelectedMenu(MENU_NAMES.ARCHIEVED_NOTES)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
