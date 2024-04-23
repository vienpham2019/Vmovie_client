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

import { AiOutlinePlus } from "react-icons/ai";

import Selection from "../../components/form/Selection";

import { useEffect, useState } from "react";
import ProductFormOptions from "./ProductFormOptions";

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
  const [selectAddOption, setSelectAddOption] = useState("Butter");

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

  const handleAddOpions = () => {
    const OP = {
      Butter: butter_PO,
      Ice: ice_PO,
      "Fountain flavors": fountain_PO,
      "ICEE flavors": ICEE_PO,
    };

    setProductOptions((prevOptions) => {
      let newOptions = [
        {
          key: selectAddOption,
          options: OP[selectAddOption].map((op) => ({
            name: op,
            img: selectAddOption.toLowerCase().includes("flavors")
              ? flavor_img[op]
              : null,
            selected: true,
          })),
        },
        ...prevOptions,
      ];

      if (selectAddOption === "Fountain flavors") {
        newOptions.unshift({
          key: "Ice",
          options: OP["Ice"].map((op) => ({
            name: op,
            img: null,
            selected: true,
          })),
        });
      }

      let firstAddOptionIndex = null;
      let haveMoreThanOne = false;
      let count = 1;
      for (let i = newOptions.length - 1; i >= 0; i--) {
        if (newOptions[i].key.startsWith(selectAddOption)) {
          if (firstAddOptionIndex === null) {
            firstAddOptionIndex = i;
          } else {
            haveMoreThanOne = true;
            newOptions[i].key = `${selectAddOption}_${++count}`;
            if (selectAddOption === "Fountain flavors") {
              newOptions[i - 1].key = `${"Ice"}_${count}`;
            }
          }
        }
      }

      if (haveMoreThanOne) {
        newOptions[firstAddOptionIndex].key = `${selectAddOption}_1`;
        if (selectAddOption === "Fountain flavors") {
          newOptions[firstAddOptionIndex - 1].key = `${"Ice"}_1`;
        }
      }

      return [...newOptions];
    });
  };

  const handleDeleteOptions = (option, index) => {
    setProductOptions((prevOptions) => {
      let updatedOptions = [...prevOptions];
      if (option.startsWith("Ice")) {
        updatedOptions.splice(index, 2);
      } else if (option.startsWith("Fountain flavors")) {
        updatedOptions.splice(index - 1, 2);
      } else {
        updatedOptions.splice(index, 1);
      }

      let firstAddOptionIndex = null;
      let haveMoreThanOne = false;
      let count = 0;
      let key = option.split("_")[0];
      for (let i = updatedOptions.length - 1; i >= 0; i--) {
        if (updatedOptions[i].key.startsWith(key)) {
          if (firstAddOptionIndex === null) {
            firstAddOptionIndex = i;
          } else {
            haveMoreThanOne = true;
          }
          updatedOptions[i].key = `${key}_${++count}`;
          if (key === "Fountain flavors") {
            updatedOptions[--i].key = `${"Ice"}_${count}`;
          }
        }
      }

      if (!haveMoreThanOne && firstAddOptionIndex !== null) {
        updatedOptions[firstAddOptionIndex].key = `${option.split("_")[0]}`;
        if (option.split("_")[0] === "Fountain flavors") {
          updatedOptions[firstAddOptionIndex - 1].key = `${"Ice"}`;
        }
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
      <ProductFormOptions
        option={option}
        index={index}
        handleSelectOptions={handleSelectOptions}
        handleDeleteOptions={handleDeleteOptions}
      />
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
            <div className="flex flex-wrap gap-2">
              <div className="w-[15rem]">
                <Selection
                  formData={{
                    value: selectAddOption,
                    options: ["Butter", "Fountain flavors", "ICEE flavors"],
                    validate: "",
                  }}
                  handleOnChange={(value) => setSelectAddOption(value)}
                />
              </div>

              <div
                className="border border-gray-400 cursor-pointer p-2 rounded max-w-[15rem] flex items-center justify-center gap-2"
                onClick={handleAddOpions}
              >
                <AiOutlinePlus />
                <span> Add product options</span>
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
