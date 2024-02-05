import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { useState } from "react";
import { setMessage } from "../../components/notificationMessage/notificationMessageSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const initFormData = {
    email: { value: "", validate: "", type: "email" },
    password: { value: "", validate: "", type: "password" },
  };
  const dispatch = useDispatch();
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
