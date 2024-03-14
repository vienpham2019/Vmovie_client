import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";
import { emailValidate, passwordValidate } from "../../util/formValidate";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { separatedWords } from "../../util/string";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useSignupMutation } from "./authApiSlice";
import AuthSkeleton from "./AuthSkeleton";

import ConfirmPasswordRule from "../../components/form/ConfirmPasswordRule";
import PasswordRule from "../../components/form/PasswordRule";
import CheckBox from "../../components/form/CheckBox";

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

  const [isChecked, setIsChecked] = useState(true);
  const [formData, setFormData] = useState(initFormData);
  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    const isInvalid = Object.values(formData).some(
      (field) => field.validate === "invalid"
    );

    if (isInvalid) {
      setFormData((prevData) => {
        const updatedFormData = {};
        for (const key in prevData) {
          if (prevData.hasOwnProperty(key)) {
            updatedFormData[key] = {
              ...prevData[key],
              validate: "",
            };
          }
        }
        return updatedFormData;
      });
    }
  }, [formData]);

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
        type:
          (key === "newPassword" || key === "confirmNewPassword") &&
          key !== name
            ? "password"
            : formData[key].type,
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

  const handleValidationError = (error, fieldName) => {
    if (error.data.message.toLowerCase().includes(fieldName)) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          validate: "invalid",
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValidate(formData.email.value)) {
      handleInvalid({
        name: "email",
        message: "Invalid Email",
      });
      return;
    }

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

    if (isChecked === false) {
      handleInvalid({
        message: "Please agree to the Privacy Policy.",
      });
      return;
    }

    try {
      const { email, password, name } = formData;
      const res = await signup({
        name: name.value,
        email: email.value,
        password: password.value,
      }).unwrap();
      dispatch(
        setMessage({
          message: res.metadata.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      setFormData(initFormData);
    } catch (error) {
      handleValidationError(error, "email");
      handleValidationError(error, "password");
    }
  };

  const handlePasswordType = (name, passwordType) => {
    const updatedFormData = formData;
    for (let key in formData) {
      if (key === "password" || key === "confirmPassword") {
        updatedFormData[key].type = key !== name ? "password" : passwordType;
        updatedFormData[key].focus = key === name;
      }
    }

    setFormData(() => ({ ...updatedFormData }));
  };

  const passwordType = (name) => {
    if (name !== "password" && name !== "confirmPassword") return;
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

  if (isLoading) return <AuthSkeleton inputs={4} links={1} />;

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
            <div className="input_title">
              <span>{separatedWords(name)} *</span>
            </div>
            {passwordType(name)}
            {name === "password" && formData.password.focus && (
              <PasswordRule password={formData.password.value} />
            )}
            {name === "confirmPassword" && formData.confirmPassword.focus && (
              <ConfirmPasswordRule />
            )}
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
            Privacy Policy
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
