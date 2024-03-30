import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { isArrayString, stringToArray } from "../../util/string";
const InputList = ({ listValues = [], validate = "", handleOnChange }) => {
  const [listVal, setListVal] = useState("");
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (listValues.length === 0) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  });

  const handleAdd = (e) => {
    if (listVal === "") return;
    if (e.keyCode === 13) {
      if (isArrayString(listVal)) {
        console.log(stringToArray(listVal));
        handleOnChange([...listValues, ...stringToArray(listVal)]);
      } else {
        handleOnChange([...listValues, listVal.trim()]);
      }
      setListVal("");
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    setListVal(e.target.value);
  };

  const displayList = () => {
    return listValues.map((val, index) => (
      <div
        key={"inputList" + val + index}
        className="flex items-center gap-[5px] border border-gray-500 bg-gray-800 text-[0.9rem] text-white font-thin px-[10px] rounded-sm"
      >
        {" "}
        {val}
        <span
          className="text-red-500 text-[0.8rem] cursor-pointer"
          onClick={() =>
            handleOnChange(listValues.filter((item) => item !== val))
          }
        >
          <FiX />
        </span>
      </div>
    ));
  };
  return (
    <div
      className={`border rounded-md border-gray-500  ${validate}  bg-[#2b2b31] grid text-white w-full`}
    >
      <div
        ref={containerRef}
        className={`flex flex-wrap gap-1 p-1 m-2 min-h-[3rem] max-h-[5rem] rounded-sm overflow-y-auto border bg-[#1e1e1e] border-gray-500`}
      >
        {displayList()}
      </div>
      <input
        type="text"
        className="bg-transparent mb-2 mx-2 outline-none border-b h-[2rem] border-gray-500 flex-auto self-end"
        value={listVal}
        onKeyDown={handleAdd}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputList;
