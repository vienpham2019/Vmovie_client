import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const SignUp = () => {
  const passwordRule = [
    "Must contain at least one non-alphabetic character.",
    "Must contain at least 8 characters.",
    "Contains more than two repeated characters.",
    "Must contain at least four alphabetic characters",
  ];
  return (
    <>
      <div className="text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]">
        <input type="text" className="input" placeholder="Email" />
        <input type="text" className="input" placeholder="Password" />
        <ul className="text-gray-400 bg-[#2b2b31] p-2 text-[0.8rem] rounded-lg grid text-start">
          {passwordRule.map((r) => (
            <li className="flex items-center gap-1 ">
              <IoCheckmarkDoneOutline />
              {r}
            </li>
          ))}
        </ul>
        <input type="text" className="input" placeholder="Confirm Password" />
        <div className="flex items-center gap-[0.5rem] text-[1rem] text-gray-300">
          <CheckBox />
          <span>I agree to the</span>
          <Link to={"/privacy"} className="text-cyan-500">
            Privacy policy
          </Link>
        </div>
        <button className="btn-blue">Sign up</button>
      </div>
      <div className="text-center grid gap-[1rem]">
        <div className="text-sm">
          <span>Already have an account?</span>{" "}
          <Link to={"/login"} className="text-cyan-500">
            Login!
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
