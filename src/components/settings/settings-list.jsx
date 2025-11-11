import IconLock from "../../common-components/Icons/IconLock";
import IconLogout from "../../common-components/Icons/IconLogout";
import { NavItem } from "../nav-menu/tags";
import { useLogout } from "../../hooks/useLogout";
import { useNoteStore } from "../../store/useNoteStore";
export const SettingsList = () => {
  const { reset } = useNoteStore();
  const { mutate, isPending } = useLogout();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 p-2 w-full md:w-64.5">
      <NavItem
        label="Logout"
        icon={<IconLogout />}
        onClick={handleLogout}
        disabled={isPending}
      />
    </div>
  );
};
