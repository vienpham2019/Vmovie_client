import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import PasswordRule from "../../components/PasswordRule";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/ModalSlice";
import ConfirmPasswordRule from "../../components/ConfirmPasswordRule";
import { passwordValidate } from "../../util/formValidate";
import { setMessage } from "../../components/notificationMessage/notificationMessageSlice";
import { separatedWords } from "../../util/string";

const SignUp = () => {
  const dispatch = useDispatch();
  const initFormData = {
    name: { value: "", focus: false, validate: "", type: "text" },
    email: { value: "", focus: false, validate: "", type: "email" },
    password: { value: "", focus: false, validate: "", type: "password" },
    confirmPassword: {
      value: "",
      focus: false,
      validate: "",
      type: "password",
    },
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

  const handleFocus = (e) => {
    const { name } = e.target;
    const updatedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = {
        ...formData[key],
        focus: key === name,
        validate: "",
      };
      return acc;
    }, {});

    setFormData(updatedFormData);
  };

  const handleInvalid = ({ name, message }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        validate: "invalid",
      },
    }));
    dispatch(setMessage({ message, messageType: "Error", delayTime: 4000 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(passwordValidate(formData.password.value)).some(
        (value) => !value
      )
    ) {
      handleInvalid({
        name: "password",
        message: "Password does not meet requirements",
      });
      return;
    }

    if (formData.password.value !== formData.confirmPassword.value) {
      handleInvalid({
        name: "confirmPassword",
        message: "Password and confirm password not match!",
      });
      return;
    }
    setFormData(initFormData);
  };
  return (
    <>
      <form
        className="text-center grid gap-[1.5rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]"
        onSubmit={handleSubmit}
      >
        {Object.keys(formData).map((name) => (
          <div className="input_group" key={name}>
            <input
              type={formData[name].type}
              className={`input ${formData[name].validate}`}
              name={name}
              value={formData[name].value}
              onChange={handleChange}
              onFocus={handleFocus}
              required
            />
            <span>{separatedWords(name)} *</span>
            {name === "password" && formData.password.focus && (
              <PasswordRule password={formData.password.value} />
            )}
            {name === "confirmPassword" && formData.confirmPassword.focus && (
              <ConfirmPasswordRule />
            )}
          </div>
        ))}
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
        <button type="submit" className="btn-blue">
          Sign up
        </button>
      </form>
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
