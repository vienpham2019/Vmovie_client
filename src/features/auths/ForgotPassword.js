import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { useEffect, useState } from "react";
import { emailValidate } from "../../util/formValidate";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useForgotPasswordMutation } from "./authApiSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const initFormData = {
    email: { value: "", validate: "", type: "email" },
  };
  const [forgotPassword] = useForgotPasswordMutation();
  const [isChecked, setIsChecked] = useState(true);
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    if (formData.email.validate === "invalid") {
      setFormData((prevData) => ({
        ...prevData,
        email: {
          ...prevData.email,
          validate: "",
        },
      }));
    }
  }, [formData.email.value]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: {
        ...prevData["email"],
        value: value,
      },
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleInvalid = ({ name, message }) => {
    setFormData((prevData) => ({
      ...prevData,
      email: {
        ...prevData["email"],
        validate: name === "email" ? "invalid" : "",
      },
    }));
    dispatch(
      setMessage({ message, messageType: notificationMessageEnum.ERROR })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValidate(formData.email.value)) {
      handleInvalid({ name: "email", message: "Invalid Email" });
      return;
    }
    if (isChecked === false) {
      handleInvalid({
        message: "Please agree to the Privacy Policy.",
      });
      return;
    }

    try {
      await forgotPassword({
        email: formData.email.value,
        clientUrl: `${process.env.REACT_APP_BASE_URL}/resetpassword`,
      }).unwrap();
      setFormData(initFormData);
      dispatch(openModal(modalComponentEnum.RESET_PASSWORD));
      dispatch(setModalParams({ email: formData.email.value }));
    } catch (error) {
      if (error.data.message.toLowerCase().includes("email")) {
        setFormData((prevData) => ({
          ...prevData,
          email: {
            ...prevData["email"],
            validate: "invalid",
          },
        }));
      }
    }
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
          <CheckBox
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          />
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
