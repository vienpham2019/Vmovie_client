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
  initMovieFormData,
  resetMovieFormdata,
} from "../../components/form/formSlice";

import { RxCross2 } from "react-icons/rx";

import Selection from "../../components/form/Selection";

import { useEffect, useState } from "react";
import ProductFormOptions from "./ProductFormOptions";
import { useGetAllProductOptionTypesQuery } from "./productApiSlice";

const fountain_PO = [
  "Coca-Cola",
  "Diet Coke",
  "Dr Pepper",
  "Sprite",
  "Coke Zero",
  "Cherry Coke",
  `Barq's Root Beer`,
  "Powerade Mountain Blast",
  "Fanta Orange",
  "Hi-C Fruit Punch",
];
const butter_PO = ["No Added Butter", "Regular Butter", "Layered Butter"];
const ice_PO = ["Regular Ice", "No Ice", "Light Ice", "Extra Ice"];
const ICEE_PO = ["ICEE Coke", "ICEE Cherry", "ICEE Blue Raspberry"];

const flavor_img = {
  "Coca-Cola": "https://www.cinemark.com/media/75973827/flavor_coca_cola.jpg",
  "Diet Coke": "https://www.cinemark.com/media/75973829/flavor_diet_coke.jpg",
  "Dr Pepper": "https://www.cinemark.com/media/75976727/sodadrpepper.jpg",
  Sprite:
    "https://www.cinemark.com/media/76006718/siat_categoryimages_sprite_100x100.png",
  "Coke Zero": "https://www.cinemark.com/media/75973828/flavor_coke_zero.jpg",
  "Cherry Coke":
    "https://www.cinemark.com/media/75981318/siat_cherry-coke_100x100.jpg",
  "Barq's Root Beer":
    "https://www.cinemark.com/media/75981317/siat_barqs-root-beer_100x100.jpg",
  "Powerade Mountain Blast":
    "https://www.cinemark.com/media/76006870/siat_categoryimages_powerade_100x100.png",
  "Fanta Orange":
    "https://www.cinemark.com/media/76006869/siat_categoryimages_fanta_100x100.png",
  "Hi-C Fruit Punch":
    "https://www.cinemark.com/media/75981320/siat_hi-c_100x100.jpg",
  "ICEE Coke":
    "https://www.cinemark.com/media/75981314/icee_flavor_coke_100x100.jpg",
  "ICEE Cherry":
    "https://www.cinemark.com/media/75981316/icee-flavor_wildcherry_100x100.jpg",
  "ICEE Blue Raspberry":
    "https://www.cinemark.com/media/75981315/icee-flavor_blueraspberry_100x100.jpg",
};

const ProductForm = ({ handleOnSubmit }) => {
  const dispatch = useDispatch();
  const { productFormData } = useSelector((state) => state.form);
  const [productOptions, setProductOptions] = useState([]);
  const [newOptionType, setNewOptionType] = useState("");
  const { data: { metadata: productOptionTypes } = [] } =
    useGetAllProductOptionTypesQuery();
  const [optionTypes, setOptionTypes] = useState({});
  const [selectAddOption, setSelectAddOption] = useState("");

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
    // dispatch(
    //   setMovieFormData({
    //     name,
    //     value,
    //   })
    // );
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
    setProductOptions((prevOptions) => {
      let newOptions = [
        {
          type: type,
          selected: [],
        },
        ...prevOptions,
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

      return [...newOptions];
    });
  };

  const handleDeleteOptions = (type, index) => {
    setProductOptions((prevOptions) => {
      let updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);

      const filterOptionsIndex = [];
      updatedOptions.forEach((option, i) => {
        if (option.type.split("_")[0] === type.split("_")[0]) {
          filterOptionsIndex.push(i);
        }
      });

      if (filterOptionsIndex.length > 1) {
        filterOptionsIndex.forEach((indexValue, count) => {
          updatedOptions[indexValue].type = `${
            updatedOptions[indexValue].type.split("_")[0]
          }_#${count + 1}`;
        });
      } else if (filterOptionsIndex.length === 1) {
        updatedOptions[filterOptionsIndex[0]].type =
          updatedOptions[filterOptionsIndex[0]].type.split("_")[0];
      }

      return [...updatedOptions];
    });
  };

  const handleSelectOptions = (optionIndex, selectIndex, value) => {
    setProductOptions((prevOptions) => {
      let updatedOptions = [...prevOptions];
      updatedOptions[optionIndex].options[selectIndex].selected = value;

      return [...updatedOptions];
    });
  };

  const displayOptions = () => {
    return productOptions.map((option, index) => (
      <div className="input_group" key={`Product option ${index}`}>
        <div className="border flex flex-col gap-2 border-gray-500  p-2 relative bg-[#2b2b31]">
          <ProductFormOptions
            type={option.type}
            selected={option.selected}
            index={index}
            handleSelectOptions={handleSelectOptions}
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
                    selected={option.selected}
                    isSub={true}
                    parentType={option.type}
                    handleSelectOptions={handleSelectOptions}
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
      if (updatedFormData.hasOwnProperty(key)) {
        if (
          updatedFormData[key].value === "" ||
          updatedFormData[key].value?.length === 0 ||
          Object.keys(updatedFormData[key].value).length === 0
        ) {
          isInvalid = true;
          updatedFormData[key].validate = inputValidateEnum.INVALID;
        }
      }
    }

    if (isInvalid) {
      dispatch(initMovieFormData(updatedFormData));
      dispatch(
        setMessage({
          message: "All fields are required.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }

    await handleOnSubmit();
    dispatch(resetMovieFormdata());
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
            <div className="flex-1">{input({ name: "item_name" })}</div>
            <div className="flex-1">{input({ name: "price" })}</div>
            <div className="flex-1">
              {input({ name: "type", type: inputTypeEnum.SELECT })}
            </div>
          </div>
          {input({ name: "describe", type: inputTypeEnum.TEXT_AREA })}
          {input({ name: "img", type: inputTypeEnum.FILE })}

          <div className="text-white flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="w-full text-gray-300">Product Options</span>
              {productOptionTypes?.length > 0 && (
                <div className="flex gap-2">
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
