import {
  User,
  Settings,
  Shield,
  Palette,
} from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { user } = useUser();

  return (
    <div className=" flex items-center gap-3">
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium text-(--text-primary)">
          {user?.fullName}
        </p>

        <p className="text-xs text-(--text-secondary)">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
        }}
      >
        <UserButton.MenuItems>

          <UserButton.Link
            label="My Profile"
            labelIcon={<User size={16} />}
            href="/profile"
          />

          <UserButton.Action
            label="Settings"
            labelIcon={<Settings size={16} />}
          />

          <UserButton.Action
            label="Security"
            labelIcon={<Shield size={16} />}
          />

          <UserButton.Action
            label="Appearance"
            labelIcon={<Palette size={16} />}
          />


        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default ProfileMenu;