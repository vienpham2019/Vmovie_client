import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import AuthSkeleton from "./AuthSkeleton";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { setCredentials } from "./authSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const Login = () => {
  const initFormData = {
    email: { value: "", validate: "", type: "email" },
    password: { value: "", validate: "", type: "password" },
  };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initFormData);

  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    if (
      formData.email.validate === "invalid" ||
      formData.password.validate === "invalid"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        email: {
          ...prevData.email,
          validate: "",
        },
        password: {
          ...prevData.password,
          validate: "",
        },
      }));
    }
  }, [formData.email.value, formData.password.value]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const res = await login({
        email: email.value,
        password: password.value,
      }).unwrap();
      setFormData(initFormData);
      dispatch(
        setMessage({
          message: "Login Success",
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      dispatch(setCredentials(res.metadata));
    } catch (error) {
      setFormData((prevData) => ({
        email: {
          ...prevData["email"],
          validate: "invalid",
        },
        password: {
          ...prevData["password"],
          validate: "invalid",
        },
      }));
    }
  };

  const handlePasswordType = (passwordType) => {
    setFormData((prevData) => ({
      ...prevData,
      password: {
        ...prevData["password"],
        type: passwordType,
      },
    }));
  };

  const passwordType = () => {
    const { type } = formData["password"];
    return (
      <div className="password_type">
        {type === "text" ? (
          <IoEye onClick={() => handlePasswordType("password")} />
        ) : (
          <IoEyeOff onClick={() => handlePasswordType("text")} />
        )}
      </div>
    );
  };
  if (isLoading) return <AuthSkeleton inputs={2} checkBox={false} />;

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
            {name === "password" && passwordType()}
          </div>
        ))}
        <button type="submit" className="btn-blue">
          Sign in
        </button>
      </form>
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
