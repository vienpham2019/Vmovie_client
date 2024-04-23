import CheckBox from "../../components/form/CheckBox";
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { useState } from "react";
const ProductFormOptions = ({
  option,
  index,
  handleDeleteOptions,
  handleSelectOptions,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { options, key } = option;
  return (
    <div className="input_group" key={`option ${key}`}>
      <div className="border flex flex-col gap-2 border-gray-500  p-2 relative bg-[#2b2b31]">
        <div className="flex gap-2">
          <div className="h-[2rem] aspect-square rounded-full flex justify-center items-center border cursor-pointer">
            <FaPlus />
          </div>
          <div className="h-[2rem] aspect-square rounded-full flex justify-center items-center border cursor-pointer">
            <TbTrashX />
          </div>
          <div
            className={`h-[2rem] aspect-square ${
              editMode && "text-cyan-500"
            } rounded-full flex justify-center items-center border cursor-pointer`}
            onClick={() => setEditMode(!editMode)}
          >
            <FaPencil />
          </div>
        </div>
        {/*  */}
        <div className="max-h-[20rem] min-h-[3rem] overflow-y-auto flex flex-wrap gap-5">
          {options.map(({ name, img, selected }, optionIndex) => {
            return (
              <div
                key={name + key}
                className="flex gap-2 items-center rounded-md p-2 border border-gray-500 bg-[#232328]"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`flavor ${name}`}
                    className={`w-[3rem] h-[3rem] rounded-full border-2 ${
                      selected && "border-cyan-400"
                    } cursor-pointer`}
                    onClick={() =>
                      handleSelectOptions(index, optionIndex, !selected)
                    }
                  />
                ) : (
                  <CheckBox
                    isChecked={selected}
                    handleCheckboxChange={() =>
                      handleSelectOptions(index, optionIndex, !selected)
                    }
                  />
                )}
                <div className="flex flex-col gap-1 max-w-[10rem]">
                  <span
                    className={` ${
                      selected ? "text-cyan-400" : "text-gray-400"
                    } `}
                  >
                    {name}
                  </span>
                </div>
                <div>
                  {editMode && (
                    <div className="flex flex-col gap-2">
                      <FaPencil className="cursor-pointer text-cyan-200" />
                      <TbTrashX className="cursor-pointer text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}

        <div className="absolute -top-[10px] -right-[10px]">
          <div
            className="bg-red-500 rounded-full cursor-pointer text-[0.8rem] p-[2px]"
            onClick={() => {
              handleDeleteOptions(key, index);
            }}
          >
            <RxCross2 />
          </div>
        </div>
      </div>
      <div className={`input_title `}>
        <span>{key}</span>
      </div>
    </div>
  );
};

export default ProductFormOptions;
