import { displayInput } from "../../components/form/formUtil";
import {
  inputTypeEnum,
  inputValidateEnum,
} from "../../components/form/formEnum";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import {
  initProductFormData,
  resetProductFormdata,
  setProductFormData,
} from "../../components/form/formSlice";

import { RxCross2 } from "react-icons/rx";

import Selection from "../../components/form/Selection";

import { useEffect, useState } from "react";
import ProductFormOptions from "./ProductFormOptions";
import { useGetAllProductOptionTypesQuery } from "./productApiSlice";
import { RiListOrdered, RiPlayListAddFill } from "react-icons/ri";
import { IoLinkSharp } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa6";

const imageUploadTypeEnum = Object.freeze({
  FILE: "File",
  URL: "Url",
});

const ProductForm = ({ handleOnSubmit }) => {
  const dispatch = useDispatch();
  const { productFormData } = useSelector((state) => state.form);
  const [newOptionType, setNewOptionType] = useState("");
  const { data: { metadata: productOptionTypes } = [] } =
    useGetAllProductOptionTypesQuery();
  const [optionTypes, setOptionTypes] = useState({});
  const [selectAddOption, setSelectAddOption] = useState("");
  const [newProductType, setNewProductType] = useState(false);
  const [imageUploadType, setImageUploadType] = useState(
    imageUploadTypeEnum.URL
  );

  useEffect(() => {
    if (productOptionTypes?.length) {
      const optionTypes = {};
      productOptionTypes.forEach((option) => {
        const optionArr = option.split("_");
        if (!optionTypes[optionArr[0]]) {
          optionTypes[optionArr[0]] = [];
        }
        if (optionArr.length > 1) {
          optionTypes[optionArr[0]].push(optionArr[1]);
        }
      });
      setOptionTypes(optionTypes);
      setSelectAddOption(Object.keys(optionTypes)[0]);
    }
  }, [productOptionTypes]);

  const handleOnChange = (value, name) => {
    dispatch(
      setProductFormData({
        name,
        value,
      })
    );
  };

  const input = (options) => {
    return displayInput({
      formData: productFormData,
      handleOnChange,
      ...options,
      db: "product",
    });
  };

  const handleAddOpions = (type = selectAddOption) => {
    let newOptions = [
      {
        type: type,
        selected: [],
      },
      ...JSON.parse(JSON.stringify(productFormData.options.value)),
    ];

    const filterOptionsIndex = newOptions.reduce((acc, option, index) => {
      if (option.type.split("_")[0] === type) acc.push(index);
      return acc;
    }, []);

    if (filterOptionsIndex.length > 1) {
      filterOptionsIndex.forEach((indexValue, count) => {
        newOptions[indexValue].type = `${
          newOptions[indexValue].type.split("_")[0]
        }_#${count + 1}`;
      });
    }

    handleOnChange(newOptions, "options");
  };

  const handleDeleteOptions = (type, index) => {
    let updateOptions = [
      ...JSON.parse(JSON.stringify(productFormData.options.value)),
    ];

    updateOptions.splice(index, 1);

    const filterOptionsIndex = [];
    updateOptions.forEach((option, i) => {
      if (option.type.split("_")[0] === type.split("_")[0]) {
        filterOptionsIndex.push(i);
      }
    });

    if (filterOptionsIndex.length > 1) {
      filterOptionsIndex.forEach((indexValue, count) => {
        updateOptions[indexValue].type = `${
          updateOptions[indexValue].type.split("_")[0]
        }_#${count + 1}`;
      });
    } else if (filterOptionsIndex.length === 1) {
      updateOptions[filterOptionsIndex[0]].type =
        updateOptions[filterOptionsIndex[0]].type.split("_")[0];
    }

    handleOnChange(updateOptions, "options");
  };

  const displayOptions = () => {
    return productFormData.options.value.map((option, index) => (
      <div className="input_group" key={`Product option ${index}`}>
        <div className="border flex flex-col gap-2 border-gray-500  p-2 relative bg-[#2b2b31]">
          <ProductFormOptions
            type={option.type}
            selectedArr={option.selected}
            handleAddNewSub={(parentType, newSubType) => {
              const updateOptionTypes = { ...optionTypes };
              if (
                updateOptionTypes[parentType.split("_")[0]]?.includes(
                  newSubType.trim().split("_")[0]
                )
              ) {
                dispatch(
                  setMessage({
                    message: "Type already exists.",
                    messageType: notificationMessageEnum.WARNING,
                  })
                );
                return;
              }
              updateOptionTypes[parentType.split("_")[0]].push(
                newSubType.trim().split("_")[0]
              );
              setOptionTypes(updateOptionTypes);
            }}
          />

          {optionTypes[option.type.split("_")[0]]?.map((subType) => (
            <div
              className="p-2 flex flex-col gap-4"
              key={option.type + "_" + subType}
            >
              <div className="input_group">
                <div className="border border-gray-500  p-2 bg-[#2b2b31]">
                  <ProductFormOptions
                    type={subType}
                    selectedArr={option.selected}
                    isSub={true}
                    parentType={option.type}
                  />
                </div>
                <div className={`input_title `}>
                  <span>{subType}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute -top-[10px] -right-[10px]">
            <div
              className="bg-red-500 rounded-full cursor-pointer text-[0.8rem] p-[2px]"
              onClick={() => {
                handleDeleteOptions(option.type, index);
              }}
            >
              <RxCross2 />
            </div>
          </div>
        </div>
        <div className={`input_title `}>
          <span>{option.type}</span>
        </div>
      </div>
    ));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isInvalid = false;

    let updatedFormData = JSON.parse(JSON.stringify(productFormData));

    for (const key in productFormData) {
      const value = updatedFormData[key].value;
      if (updatedFormData.hasOwnProperty(key)) {
        if (
          key !== "options" &&
          (value === "" || // Check if value is an empty string
            (Array.isArray(value) && value.length === 0) || // Check if value is an empty array
            (typeof value === "object" &&
              value !== null &&
              Object.keys(value).length === 0)) // Check if value is an empty object
        ) {
          isInvalid = true;
          updatedFormData[key].validate = inputValidateEnum.INVALID;
        }
      }
    }

    if (isInvalid) {
      dispatch(initProductFormData(updatedFormData));
      dispatch(
        setMessage({
          message: "All fields are required.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }

    await handleOnSubmit();
    dispatch(resetProductFormdata());
  };

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-auto gap-4 w-[50rem] mobile:min-w-[15rem]">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1">{input({ name: "itemName" })}</div>
            <div className="flex-1">{input({ name: "price" })}</div>

            {newProductType || productFormData?.type.options.length === 0 ? (
              <div className="flex flex-wrap gap-2 items-center flex-1">
                <div className="flex-1">{input({ name: "type" })}</div>
                {productFormData?.type.options.length > 0 && (
                  <div className="tooltip_container">
                    <RiListOrdered
                      className="border border-gray-400 text-white w-[2rem] h-full p-1 cursor-pointer"
                      onClick={() => {
                        if (productFormData?.type.options.length > 0)
                          setNewProductType(false);
                      }}
                    />
                    <span className="tooltip tooltip_bottom">Type List</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center flex-1">
                <div className="flex-1">
                  {input({ name: "type", type: inputTypeEnum.SELECT })}
                </div>
                <div className="tooltip_container">
                  <RiPlayListAddFill
                    className="border border-gray-400 text-white w-[2rem] h-full p-1 cursor-pointer"
                    onClick={() => {
                      if (productFormData?.type.options.length > 0)
                        setNewProductType(true);
                    }}
                  />
                  <span className="tooltip tooltip_bottom">New Type</span>
                </div>
              </div>
            )}
          </div>
          {input({ name: "describe", type: inputTypeEnum.TEXT_AREA })}
          <div className="flex gap-2 text-white px-2 text-[1.2rem]">
            <div
              className={`tooltip_container border border-gray-400 ${
                imageUploadType === imageUploadTypeEnum.URL && "text-cyan-400"
              } p-1 cursor-pointer`}
              onClick={() => setImageUploadType(imageUploadTypeEnum.URL)}
            >
              <IoLinkSharp />
              <span className="tooltip tooltip_bottom">Url</span>
            </div>
            <div
              className={`tooltip_container border border-gray-400 ${
                imageUploadType === imageUploadTypeEnum.FILE && "text-cyan-400"
              } p-1 cursor-pointer`}
              onClick={() => setImageUploadType(imageUploadTypeEnum.FILE)}
            >
              <FaRegFile />
              <span className="tooltip tooltip_bottom">File</span>
            </div>
          </div>
          {imageUploadType === imageUploadTypeEnum.FILE
            ? input({ name: "imgUrl", type: inputTypeEnum.FILE })
            : input({ name: "imgUrl", type: inputTypeEnum.IMG_URL })}

          <div className="text-white flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="w-full text-gray-300">Product Options</span>
              {productOptionTypes?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <div className="w-[15rem]">
                    <Selection
                      formData={{
                        value: selectAddOption,
                        options: Object.keys(optionTypes),
                        validate: "",
                      }}
                      handleOnChange={(value) => setSelectAddOption(value)}
                    />
                  </div>

                  <div
                    className="w-[5rem] text-gray-200 border border-gray-400 cursor-pointer p-2 rounded max-w-[15rem] flex items-center justify-center gap-2"
                    onClick={() => handleAddOpions()}
                  >
                    <span> Add</span>
                  </div>
                </div>
              )}

              <div className="flex rounded-md">
                <div className="input_group">
                  <input
                    type="text"
                    className="input px-1 h-full border-gray-500 mobile:w-[10rem]"
                    value={newOptionType}
                    onChange={(e) => setNewOptionType(e.target.value)}
                    style={{ borderRadius: "5px 0 0 5px" }}
                  />
                  <div className={`input_title `}>
                    <span>Type</span>
                  </div>
                </div>
                <div
                  className="text-gray-200 border border-gray-500 border-l-0 h-[2.5rem] text-[0.8rem] mobile:text-[0.7rem] cursor-pointer p-2 max-w-[15rem] flex items-center justify-center gap-2"
                  style={{ borderRadius: "0 5px 5px 0" }}
                  onClick={() => {
                    if (newOptionType === "") return;
                    handleAddOpions(newOptionType);
                    setNewOptionType("");
                  }}
                >
                  <span> Create New</span>
                </div>
              </div>
            </div>

            {displayOptions()}
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex gap-[1rem]">
        <button className="btn-blue w-[15rem]" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
