import CheckBox from "../../components/form/CheckBox";
import { TbTrashX } from "react-icons/tb";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { PiSubtractSquareFill } from "react-icons/pi";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import {
  useGetAllProductOptionsByTypeQuery,
  useDeleteProductOptionMutation,
} from "./productApiSlice";
const ProductFormOptions = ({
  type,
  selected,
  index,
  handleSelectOptions,
  isSub = false,
  parentType,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [deleteOption] = useDeleteProductOptionMutation();
  const { data: { metadata: avaliableOptions } = [], isLoading } =
    useGetAllProductOptionsByTypeQuery(
      { type: type.split("_")[0] },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );
  const dispatch = useDispatch();
  const handleAddOption = () => {
    dispatch(
      setModalParams({ option: { optionType: type.split("_")[0], parentType } })
    );
    dispatch(openModal(modalComponentEnum.PRODUCT_OPTION));
  };
  const handleEditOption = (name, img, _id) => {
    dispatch(
      setModalParams({
        option: { optionType: type.split("_")[0], name, img, _id, parentType },
      })
    );
    dispatch(openModal(modalComponentEnum.PRODUCT_OPTION));
  };
  const handleDeleteOption = async (_id) => {
    await deleteOption({ _id });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div
          onClick={handleAddOption}
          className="h-[2rem] tooltip_container aspect-square rounded-full flex justify-center items-center border cursor-pointer"
        >
          <FaPlus />
          <span className="tooltip tooltip_bottom">Add</span>
        </div>
        {avaliableOptions.length > 0 && (
          <>
            <div className="h-[2rem] tooltip_container aspect-square rounded-full flex justify-center items-center border cursor-pointer">
              <TbTrashX />
              <span className="tooltip tooltip_bottom">Delete</span>
            </div>
            <div
              className={`h-[2rem] aspect-square tooltip_container ${
                editMode && "text-cyan-500"
              } rounded-full flex justify-center items-center border cursor-pointer`}
              onClick={() => setEditMode(!editMode)}
            >
              <FaPencil />
              <span className="tooltip tooltip_bottom">Edit</span>
            </div>
            {!isSub && (
              <div
                onClick={() => setOpenSub(!openSub)}
                className={`h-[2rem] ${
                  openSub && "text-cyan-400"
                } tooltip_container aspect-square rounded-full flex justify-center items-center border cursor-pointer`}
              >
                <PiSubtractSquareFill />
                <span className="tooltip tooltip_bottom">Add Sub Option</span>
              </div>
            )}
          </>
        )}
      </div>
      {!isSub && openSub && (
        <div className="flex rounded-md mt-2">
          <div className="input_group">
            <input
              type="text"
              className="input px-1 h-full border-gray-500 mobile:w-[10rem]"
              // value={newOptionType}
              // onChange={(e) => setNewOptionType(e.target.value)}
              style={{ borderRadius: "5px 0 0 5px" }}
            />
            <div className={`input_title `}>
              <span>Type</span>
            </div>
          </div>
          <div
            className="text-gray-200 border border-gray-500 border-l-0 h-[2.5rem] text-[0.8rem] mobile:text-[0.7rem] cursor-pointer p-2 max-w-[15rem] flex items-center justify-center gap-2"
            style={{ borderRadius: "0 5px 5px 0" }}
            // onClick={() => {
            //   if (newOptionType === "") return;
            //   setNewOptionType("");
            //   setProductOptions((prev) => [
            //     { key: newOptionType.split("_").join(" "), options: [] },
            //     ...prev,
            //   ]);
            // }}
          >
            <span>New Sub</span>
          </div>
        </div>
      )}
      {/*  */}
      <div className="max-h-[20rem] min-h-[3rem] overflow-y-auto flex flex-wrap gap-5">
        {avaliableOptions.map(({ name, img, _id }, optionIndex) => {
          // change this
          const selected = true;
          return (
            <div
              key={name + type}
              className="flex gap-2 items-center rounded-md p-2 border border-gray-500 bg-[#232328]"
            >
              {img ? (
                <img
                  src={img}
                  alt={`flavor ${name}`}
                  className={`h-[3rem] aspect-square rounded-full border-2 ${
                    selected ? "border-cyan-400" : "opacity-10"
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
                    <FaPencil
                      className="cursor-pointer text-cyan-200"
                      onClick={() => handleEditOption(name, img, _id)}
                    />
                    <TbTrashX
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDeleteOption(_id)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/*  */}
    </div>
  );
};

export default ProductFormOptions;
