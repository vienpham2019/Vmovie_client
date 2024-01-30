import { IoIosWarning } from "react-icons/io";

const ErrorMessage = ({ message }) => {
  return (
    <div className="absolute bg-red-500 top-1 right-1 w-[20rem] py-[1rem] px-[2rem] rounded-lg text-white flex gap-[0.3rem] items-center animate__animated animate__fadeInLeft">
      <IoIosWarning /> {message}
    </div>
  );
};

export default ErrorMessage;
