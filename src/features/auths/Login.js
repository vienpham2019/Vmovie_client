import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { useEffect, useState } from "react";
import { setMessage } from "../../components/notificationMessage/notificationMessageSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";

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
      const { accessToken } = await login({
        email: email.value,
        password: password.value,
      }).unwrap();
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

  if (isLoading)
    return (
      <div className="animate-pulse text-center grid gap-[1.3rem] mx-[0.2rem] w-[17rem] mobile:w-[25rem] mobile:px-[3rem]">
        {/* Skeleton input fields */}
        <div className="input_group">
          <div className="h-8 skeleton"></div>
        </div>
        <div className="input_group">
          <div className="h-8 skeleton"></div>
        </div>
        {/* Skeleton remember me checkbox */}
        <div className="flex items-center gap-[0.5rem] text-[1rem] text-white">
          <div className="h-4 w-4 skeleton"></div>
          <div className="h-4 w-20 skeleton"></div>
        </div>
        {/* Skeleton sign in button */}
        <div className="skeleton h-[3rem] flex items-center justify-center font-bold">
          Loading...
        </div>
        <div className="items-center flex flex-col gap-[1rem]">
          <div className="w-[13rem] h-[1rem] skeleton"></div>
          <div className="w-[10rem] h-[1.4rem] skeleton"></div>
        </div>
      </div>
    );

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
          <span>Remember me</span>
        </div>
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
