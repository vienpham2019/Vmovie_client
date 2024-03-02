import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import OutsideClickDetector from "../OutsideClickDetector";

const Selection = ({ selected = "", selectOptions = [], handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOutsideClick = () => {
    if (isOpen) setIsOpen(false);
  };
  return (
    <OutsideClickDetector onOutsideClick={handleOutsideClick}>
      <div className="relative">
        <div
          className={`${
            isOpen ? "rounded-t-lg" : "rounded-lg"
          } text-gray-300 font-thin bg-[#2b2b31]  border hover:border-cyan-800 py-2 px-5 flex justify-between items-center cursor-pointer`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{selected}</span>
          <div className="text-[1.1rem] text-cyan-500">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-b-lg w-full max-h-[15rem] overflow-y-auto bg-[#3a3a42] py-4 text-white font-thin flex flex-col gap-1 bottom-100 shadow-lg">
            {selectOptions.map((option) => (
              <span
                key={option}
                className="text-[0.5rem hover:bg-cyan-600 cursor-pointer px-4"
                onClick={() => {
                  setIsOpen(false);
                  handleSelect(option);
                }}
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </OutsideClickDetector>
  );
};

export default Selection;
