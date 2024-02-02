import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import PasswordRule from "../../components/PasswordRule";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/ModalSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [password, changePassword] = useState("");
  return (
    <>
      <div className="text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]">
        <input type="text" className="input" placeholder="Name" />
        <input type="text" className="input" placeholder="Email" />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => changePassword(e.target.value)}
        />
        <PasswordRule password={password} />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
        />
        <div className="flex items-center gap-[0.5rem] text-[1rem] text-gray-300">
          <CheckBox />
          <span>I agree to the</span>
          <span
            className="text-cyan-500 cursor-pointer"
            onClick={() => {
              dispatch(openModal("PRIVATE_POLICY_MODAL"));
            }}
          >
            Privacy policy
          </span>
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
