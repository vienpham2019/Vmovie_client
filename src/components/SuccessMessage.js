import { BsCheck2Circle } from "react-icons/bs";
const SuccessMessage = ({ message }) => {
  return (
    <div className="absolute bg-green-500 top-0 right-0 w-[20rem] py-[1rem] px-[2rem] rounded-lg text-white flex gap-[0.3rem] items-center">
      <BsCheck2Circle /> {message}
    </div>
  );
};

export default SuccessMessage;
