import CheckBox from "../../components/CheckBox";
import Logo from "../../components/Logo";

const Login = () => {
  return (
    <div className=" border-t border-white rounded-lg flex flex-col items-center gap-[2rem] p-[1rem] pb-[2rem] bg-[#28282d] text-white">
      <div className="w-[6rem]">
        <Logo />
      </div>
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
          <a href="#" className="text-cyan-500">
            Sign up!
          </a>
        </div>
        <a href="#" className="text-cyan-500">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default Login;
