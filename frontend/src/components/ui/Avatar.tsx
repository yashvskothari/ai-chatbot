interface AvatarProps {
  initials: string;
  ai?: boolean;
}

const Avatar = ({ initials, ai }: AvatarProps) => {
  return (
    <div
      className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold
      ${
        ai
          ? "bg-linear-to-br from-blue-500 to-indigo-600"
          : "bg-slate-700"
      }`}
    >
      {initials}
    </div>
  );
};

export default Avatar;