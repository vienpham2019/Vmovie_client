import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import {
  LuLogOut,
  LuStar,
  LuUsers,
  LuTicket,
  LuMessagesSquare,
  LuLayoutGrid,
  LuFilm,
} from "react-icons/lu";
import UserIcon from "../components/UserIcon";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../features/auths/authApiSlice";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const initSideBar = {
    dashboard: { active: true, icon: <LuLayoutGrid />, path: "" },
    catalog: { active: false, icon: <LuFilm />, path: "catalog" },
    users: { active: false, icon: <LuUsers />, path: "" },
    comments: { active: false, icon: <LuMessagesSquare />, path: "" },
    reviews: { active: false, icon: <LuStar />, path: "" },
    tikets: { active: false, icon: <LuTicket />, path: "" },
  };
  const { username } = useAuth();
  const [sideBar, setSideBar] = useState(initSideBar);
  const [logOut, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleClick = (key) => {
    setSideBar((prevState) => {
      const updatedState = {};
      for (const [k, v] of Object.entries(prevState)) {
        updatedState[k] = {
          ...v,
          active: k === key,
        };
      }
      return updatedState;
    });
  };

  const displaySideBar = () => {
    return (
      <div className="grid w-full text-gray-400">
        {Object.entries(sideBar).map(([key, value]) => (
          <Link
            key={key}
            className={`flex gap-[1rem] pl-[1.4rem] py-[0.8rem] items-center cursor-pointer hover:bg-cyan-800 ${
              value.active ? "text-cyan-400" : ""
            }`}
            onClick={() => handleClick(key)}
            to={value.path}
          >
            {value.icon}
            <span className="uppercase font-thin">{key}</span>
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div className="flex h-screen p-0">
      <div
        className="w-[15rem] tablet:hidden text-white bg-[rgb(33,37,41)] flex items-center flex-col gap-[1rem]"
        style={{
          boxShadow: "inset -5px 0 5px -5px rgba(0,0,0, 0.6)",
        }}
      >
        <div
          className="bg-[rgb(35,47,66)] w-full flex flex-col items-center"
          style={{
            boxShadow: "inset -5px 0 5px -5px rgba(0,0,0, 0.6)",
          }}
        >
          <div className="w-[5rem] pb-[1rem]">
            <Logo />
          </div>{" "}
          <div
            className="w-full h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{
              boxShadow: "inset -5px 0 5px -5px rgba(0,0,0, 0.6)",
            }}
          />
        </div>
        <div className="flex justify-around items-center w-full border-b pt-2 pb-5 border-gray-500 px-2">
          <div className="flex gap-[0.5rem]">
            <UserIcon userIconUrl={"https://i.pravatar.cc/300?img=47"} />
            <div className="grid">
              <small className="text-[0.8rem] text-gray-300">Admin</small>{" "}
              <span>{username}</span>
            </div>
          </div>
          <span
            className="cursor-pointer bg-gray-600 p-2 rounded-lg"
            onClick={logOut}
          >
            <LuLogOut />
          </span>
        </div>
        {displaySideBar()}
      </div>
      <div
        className="bg-[rgb(40,40,45)] flex-grow overflow-x-hidden"
        style={{
          boxShadow: "inset 5px 0 7px -5px rgba(0,0,0, 0.6)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
