import { useUser } from "@clerk/clerk-react";
import { User, Bot, Shield} from "lucide-react";
import { useClerk } from "@clerk/clerk-react";

const ProfilePage = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div
      className="
    h-screen
    overflow-y-auto

    bg-(--bg-primary)

    text-(--text-primary)

    px-6
    py-8
  "
    >
      <div
        className="
    mx-auto
    max-w-5xl

    pb-20
  "
      >
        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        <div
          className="
            rounded-3xl
            border
            border-(--border-color)
            bg-(--bg-card)
            p-8
          "
        >
          <div
            className="
    mt-8
    rounded-3xl
    border
    border-(--border-color)
    bg-(--bg-card)
    p-8
  "
          >
            <div
              className="flex items-center py-10 justify-center"
            >
              <img
                src={user?.imageUrl}
                alt="avatar"
                className="w-28 h-28 rounded-full border object-cover"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <User size={22} />
                <h2 className="text-2xl font-semibold">Personal Information</h2>
              </div>

            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-(--text-secondary)">Full Name</p>

                <p>{user?.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Email</p>

                <p>{user?.primaryEmailAddress?.emailAddress}</p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Username</p>

                <p>{user?.username ?? "Not Set"}</p>
              </div>
            </div>
          </div>
          <div
            className="
    mt-8
    rounded-3xl
    border
    border-(--border-color)
    bg-(--bg-card)
    p-8
  "
          >
            <div className="flex items-center gap-3 mb-6">
              <Bot size={22} />
              <h2 className="text-2xl font-semibold">AI Preferences</h2>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-(--text-secondary)">
                    Default Model
                  </p>

                  <p>Llama 3.3 70B</p>
                </div>

              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-(--text-secondary)">
                    Default Voice
                  </p>

                  <p>Aria</p>
                </div>

              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-(--text-secondary)">Theme</p>

                  <p>Dark</p>
                </div>

              </div>
            </div>
          </div>
          <div
            className="
    mt-8
    rounded-3xl
    border
    border-(--border-color)
    bg-(--bg-card)
    p-8
  "
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield size={22} />
              <h2 className="text-2xl font-semibold">Security</h2>
            </div>

            <button
              onClick={() => openUserProfile()}
              className="
      rounded-xl
      bg-blue-600
      px-5
      py-3
      text-white
      hover:bg-blue-700
      transition
    "
            >
              Manage Account
            </button>
          </div>
          <hr className="my-8 border-(--border-color)" />

          <div className="space-y-3">
            <div>
              <p className="text-sm text-(--text-secondary)">Username</p>

              <p className="text-lg">{user?.username ?? "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-(--text-secondary)">User ID</p>

              <p className="text-lg break-all">{user?.id}</p>
            </div>

            <div>
              <p className="text-sm text-(--text-secondary)">Joined</p>

              <p className="text-lg">{user?.createdAt?.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
