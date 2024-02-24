import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";
import { useState } from "react";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const initFormData = {
    email: { value: "", validate: "", type: "email" },
  };
  const [formData, setFormData] = useState(initFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]"
      >
        {Object.keys(formData).map((name) => (
          <div className="input_group" key={name}>
            <input
              type={formData[name].type}
              className={`input ${formData[name].validate}`}
              name={name}
              value={formData[name].value}
              onChange={handleChange}
              required
            />
            <span>{name} *</span>
          </div>
        ))}
        <div className="flex items-center gap-[0.5rem] text-[1rem] text-gray-300">
          <CheckBox />
          <span>I agree to the</span>
          <span
            className="text-cyan-500 cursor-pointer"
            onClick={() => {
              dispatch(openModal(modalComponentEnum.PRIVATE_POLICY));
            }}
          >
            Privacy policy
          </span>
        </div>
        <button type="submit" className="btn-blue">
          Recover
        </button>
      </form>
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
