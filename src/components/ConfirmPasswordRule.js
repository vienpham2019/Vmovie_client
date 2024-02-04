import { FiAlertCircle } from "react-icons/fi";

const ConfirmPasswordRule = () => {
  return (
    <ul className="text-gray-400 bg-[#2b2b31] p-2 text-[0.8rem] rounded-lg grid text-start">
      <li className="flex items-center gap-2">
        <FiAlertCircle />{" "}
        <span>Your password and confirmation password must match.</span>
      </li>
    </ul>
  );
};

export default ConfirmPasswordRule;
