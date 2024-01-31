import { Outlet } from "react-router-dom";
import bg from "../assets/bg1.jpeg";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bg-bottom bg-no-repeat bg-cover overflow-hidden font-normal"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className=" border-t border-white rounded-lg flex flex-col items-center gap-[2rem] p-[1rem] pb-[2rem] bg-[#28282d] text-white">
        <div className="w-[6rem]">
          <Logo />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
