import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import OutsideClickDetector from "../OutsideClickDetector";

const Selection = ({
  type = "string",
  placeHolder = "",
  selected = [],
  selectOptions = [],
  setSelected = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(selectOptions);
  const [selectVal, setSelectVal] = useState(selected);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (selectVal.length === 0 || type !== "list") return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  });

  const handleOutsideClick = () => {
    if (isOpen) handleClick(false);
  };

  const handleSelect = (select) => {
    if (type === "string") {
      setSelectVal([select]);
      return;
    }

    if (selectVal.includes(select)) {
      setSelectVal((prevSelected) =>
        prevSelected.filter((item) => item !== select)
      );
      return;
    }
    setSelectVal((prevSelected) => [...prevSelected, select]);
  };

  const handleSelected = () => {
    if (selectVal.length === 0) {
      return <span>{placeHolder}</span>;
    }

    if (type === "string") {
      return <span>{selectVal[0]}</span>;
    }

    return (
      <div
        ref={containerRef}
        className="flex flex-wrap h-[3rem] gap-1 overflow-y-auto mx-2 border rounded-sm bg-[#1e1e1e] p-1 border-gray-500"
      >
        {selectVal.map((select) => (
          <div
            key={select}
            className="flex items-center gap-[5px] bordr border-gray-500 bg-gray-800 text-[0.9rem] text-white px-[10px] rounded-sm"
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
    if (selectVal.length === 0) return;
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
            isOpen ? "rounded-t" : "rounded"
          } text-gray-300 font-thin bg-[#2b2b31] min-h-[3rem] border border-gray-500 hover:border-cyan-500 p-2 flex justify-between items-center cursor-pointer`}
          onClick={() => {
            handleClick(!isOpen);
          }}
        >
          {handleSelected()}
          <div className="text-[1.1rem] text-cyan-500">
            <FiChevronUp className={!isOpen && "hidden"} />
            <FiChevronDown className={isOpen && "hidden"} />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-[2] rounded-b w-full bg-[#3a3a42] py-4 text-white font-thin flex flex-col gap-1 bottom-100 shadow-lg">
            {selectOptions.length > 10 && handleSearchSelect()}
            <div className="overflow-y-auto max-h-[15rem] grid gap-1">
              {options.map((option, index) => (
                <span
                  key={option + index}
                  className={`text-[0.5rem hover:bg-cyan-800 cursor-pointer px-4 ${
                    selectVal.includes(option) && "text-[#18dbf5] bg-gray-700"
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
