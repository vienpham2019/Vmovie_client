import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src="https://storage.googleapis.com/vmovieimagebucket/theaterLogo.png"
      onClick={() => {
        navigate("/");
      }}
      alt="logo"
      className="cursor-pointer"
    />
  );
};

export default Logo;
