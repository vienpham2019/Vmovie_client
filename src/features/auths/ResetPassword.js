import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";
import { passwordValidate } from "../../util/formValidate";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

import { separatedWords } from "../../util/string";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useResetPasswordMutation } from "./authApiSlice";
import AuthSkeleton from "./AuthSkeleton";

import PasswordRule from "../../components/form/PasswordRule";
import CheckBox from "../../components/form/CheckBox";
import ConfirmPasswordRule from "../../components/form/ConfirmPasswordRule";

const ResetPassword = () => {
  const initFormData = {
    newPassword: { value: "", focus: false, validate: "", type: "password" },
    confirmNewPassword: {
      value: "",
      focus: false,
      validate: "",
      type: "password",
    },
  };
  const { token } = useParams();
  const dispatch = useDispatch();
  const [resetPassowrd, { isLoading }] = useResetPasswordMutation();
  const [isChecked, setIsChecked] = useState(true);
  const [formData, setFormData] = useState(initFormData);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

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
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: {
          ...prevData[name],
          validate: "invalid",
        },
      }));
    }
    dispatch(
      setMessage({ message, messageType: notificationMessageEnum.ERROR })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.values(passwordValidate(formData.newPassword.value)).some(
        (value) => !value
      )
    ) {
      handleInvalid({
        name: "newPassword",
        message: "New password does not meet requirements",
      });
      return;
    }

    if (formData.newPassword.value !== formData.confirmNewPassword.value) {
      handleInvalid({
        name: "confirmNewPassword",
        message: "New password and confirm new password not match!",
      });
      return;
    }

    if (isChecked === false) {
      handleInvalid({
        message: "Please agree to the Privacy Policy.",
      });
      return;
    }
    try {
      await resetPassowrd({
        token,
        password: formData.newPassword.value,
      }).unwrap();
      dispatch(
        setMessage({
          message: "Your password has been changed successfully.",
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      setFormData(initFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordType = (name, passwordType) => {
    const updatedFormData = formData;
    for (let key in formData) {
      if (key === "newPassword" || key === "confirmNewPassword") {
        updatedFormData[key].type = key !== name ? "password" : passwordType;
        updatedFormData[key].focus = key === name;
      }
    }

    setFormData(() => ({ ...updatedFormData }));
  };

  const passwordType = (name) => {
    if (name !== "newPassword" && name !== "confirmNewPassword") return;
    const { type } = formData[name];
    return (
      <div className="password_type">
        {type === "text" ? (
          <IoEye onClick={() => handlePasswordType(name, "password")} />
        ) : (
          <IoEyeOff onClick={() => handlePasswordType(name, "text")} />
        )}
      </div>
    );
  };

  if (isLoading) return <AuthSkeleton inputs={2} links={1} />;

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
              onFocus={handleFocus}
              required
            />
            <span>{separatedWords(name)} *</span>
            {passwordType(name)}
            {name === "newPassword" && formData.newPassword.focus && (
              <PasswordRule password={formData.newPassword.value} />
            )}
            {name === "confirmNewPassword" &&
              formData.confirmNewPassword.focus && <ConfirmPasswordRule />}
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
          Reset Password
        </button>
      </form>
      <div className="text-center grid gap-[1rem]">
        <div className="text-sm">
          <Link to={"/login"} className="text-cyan-500">
            Back to Login!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
