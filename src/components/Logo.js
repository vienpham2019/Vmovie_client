import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={logo}
      onClick={() => {
        navigate("/");
      }}
      alt="logo"
      className="cursor-pointer"
    />
  );
};

export default Logo;
