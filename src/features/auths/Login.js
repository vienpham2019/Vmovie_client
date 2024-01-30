import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import Logo from "../../components/Logo";

const Login = () => {
  return (
    <>
      <div className="text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]">
        <input type="text" className="input" placeholder="Email" />
        <input type="text" className="input" placeholder="Password" />
        <div className="flex items-center gap-[0.5rem] text-[1rem] text-gray-300">
          <CheckBox />
          <span>Remember me</span>
        </div>
        <button className="btn-blue">Sign in</button>
      </div>
      <div className="text-center grid gap-[1rem]">
        <div className="text-sm">
          <span>Don't have an account?</span>{" "}
          <Link to={"/signup"} className="text-cyan-500">
            Sign up!
          </Link>
        </div>
        <Link to={"/forgotpassword"} className="text-cyan-500">
          Forgot password ?
        </Link>
      </div>
    </>
  );
};

export default Login;
