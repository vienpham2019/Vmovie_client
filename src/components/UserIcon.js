import { FiUser } from "react-icons/fi";
const UserIcon = ({ userIconUrl, width = "3rem" }) => {
  if (userIconUrl)
    return (
      <div
        className={`w-[${width}] aspect-square rounded-full overflow-hidden`}
      >
        <img src={userIconUrl} alt="pravatar" />
      </div>
    );

  return (
    <div
      className={`w-[${width}] aspect-square bg-gray-200 flex justify-center items-center text-cyan-950 text-[2rem] rounded-full`}
    >
      <FiUser />
    </div>
  );
};

export default UserIcon;
