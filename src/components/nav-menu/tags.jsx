import { useMemo } from "react";
import { useNotesListQuery } from "../notes-list/hooks/useNotesList";
import { useNoteStore, MENU_NAMES } from "../../store/useNoteStore";
import IconTag from "../../common-components/Icons/IconTag";
import IconRight from "../../common-components/Icons/IconChevronRight";

const NavItem = ({ label, icon, isSelected, onClick, isMobile = false }) => {
  const selectedClass = isSelected ? "bg-neutral-100" : "";
  const iconClass = isSelected ? "text-blue-500" : "text-neutral-950";
  return (
    <div
      className={`px-3 py-2.5 flex flex-row gap-2 items-center rounded-lg cursor-pointer hover:bg-neutral-100 ${selectedClass}`}
      onClick={onClick}
    >
      <span className={iconClass}>{icon}</span>
      {!isMobile && (
        <span className="text-preset-4 text-neutral-950 flex-grow">
          {label}
        </span>
      )}
      {!isMobile && isSelected && (
        <IconRight size={16} className="text-neutral-950" />
      )}
    </div>
  );
};

const Tags = () => {
  const { data = [] } = useNotesListQuery();
  const { selectedMenu, selectedTag, setSelectedMenu, setSelectedTag } =
    useNoteStore();

  const tagsSet = useMemo(() => {
    const allTags = new Set();
    data.forEach((note) => {
      note.tags.forEach((tag) => allTags.add(tag));
    });
    return allTags;
  }, [data]);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-neutral-500 text-preset-4 px-2">Tags</span>
      {[...tagsSet].map((tag) => (
        <NavItem
          key={tag}
          label={tag}
          isSelected={
            selectedMenu === MENU_NAMES.ALL_NOTES && selectedTag === tag
          }
          icon={<IconTag />}
          onClick={() => {
            setSelectedMenu(MENU_NAMES.ALL_NOTES);
            setSelectedTag(tag);
          }}
        />
      ))}
    </div>
  );
};

export { Tags, NavItem };
