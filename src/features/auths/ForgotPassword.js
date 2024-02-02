import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/ModalSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]">
        <input type="text" className="input" placeholder="Email" />
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
        <button className="btn-blue">Recover</button>
      </div>
      <div className="text-center grid gap-[1rem]">
        <span className="text-gray-400 text-sm max-w-[20rem]">
          We will send a password to your Email
        </span>
        <div className="text-sm">
          <Link to={"/login"} className="text-cyan-500">
            Back to Login!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
