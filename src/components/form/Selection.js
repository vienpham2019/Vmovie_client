import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import OutsideClickDetector from "../OutsideClickDetector";

const Selection = ({
  type = "string",
  placeHolder = "",
  selected = [],
  selectOptions = [],
  handleSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(selectOptions);
  const handleOutsideClick = () => {
    if (isOpen) handleClick(false);
  };

  const handleSelected = () => {
    if (selected.length === 0) {
      return <span>{placeHolder}</span>;
    }

    if (type === "string") {
      return <span>{selected[0]}</span>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {selected.map((select) => (
          <div
            key={select}
            className="flex items-center gap-[5px] border border-gray-500 bg-gray-800 text-[0.9rem] text-white px-[10px] rounded-md"
          >
            {" "}
            {select}
            <span
              className="text-red-500 text-[0.8rem]"
              onClick={() => {
                setIsOpen(false);
                handleSelect(select);
              }}
            >
              <FiX />
            </span>
          </div>
        ))}
      </div>
    );
  };

  const handleSearchSelect = () => {
    return (
      <div className="border-b pb-2 border-gray-500">
        <input
          type="search"
          className="border-none bg-transparent px-[1rem] outline-none"
          placeholder="search"
          onChange={(e) => {
            const searchValue = e.target.value.toLowerCase();
            const filteredOptions = selectOptions.filter((option) =>
              option.toLowerCase().includes(searchValue)
            );
            setOptions(filteredOptions);
          }}
        />
      </div>
    );
  };

  const handleClick = (val) => {
    setIsOpen(val);
    setOptions(selectOptions);
  };
  return (
    <OutsideClickDetector onOutsideClick={handleOutsideClick}>
      <div className="relative">
        <div
          className={`${
            isOpen ? "rounded-t-lg" : "rounded-lg"
          } text-gray-300 font-thin bg-[#2b2b31]  border hover:border-cyan-800 py-2 px-5 flex justify-between items-center cursor-pointer`}
          onClick={() => {
            handleClick(!isOpen);
          }}
        >
          {handleSelected()}
          <div className="text-[1.1rem] text-cyan-500">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-b-lg w-full bg-[#3a3a42] py-4 text-white font-thin flex flex-col gap-1 bottom-100 shadow-lg">
            {selectOptions.length > 10 && handleSearchSelect()}
            <div className="overflow-y-auto max-h-[15rem] grid gap-1">
              {options.map((option) => (
                <span
                  key={option}
                  className={`text-[0.5rem hover:bg-cyan-800 cursor-pointer px-4 ${
                    selected.includes(option) && "text-[#18dbf5] bg-gray-700"
                  }`}
                  onClick={() => {
                    handleClick(false);
                    handleSelect(option);
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </OutsideClickDetector>
  );
};

export default Selection;
