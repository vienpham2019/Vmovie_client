import { Outlet } from "react-router-dom";
import bg from "../assets/bg1.jpeg";
const AuthLayout = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bg-bottom bg-no-repeat bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Outlet />;
    </div>
  );
};

export default AuthLayout;
