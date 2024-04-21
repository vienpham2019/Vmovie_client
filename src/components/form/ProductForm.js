import { displayInput } from "./formUtil";
import { inputTypeEnum, inputValidateEnum } from "./formEnum";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../notificationMessage/notificationMessageSlice";
import {
  initMovieFormData,
  resetMovieFormdata,
  setMovieFormData,
} from "./formSlice";
import { RxCross2 } from "react-icons/rx";
import { FaPencil } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { TbTrashX } from "react-icons/tb";

import InputList from "./InputList";
import Selection from "./Selection";
import CheckBox from "./CheckBox";
import UploadFile from "./image/UploadFile";

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
  const PO = [];
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

  const displayOptions = () => {
    return (
      <div className="input_group">
        <div className="border border-gray-500  p-2 relative bg-[#2b2b31]">
          {/*  */}
          <div className="max-h-[20rem] overflow-y-auto flex flex-wrap gap-4">
            {fountain_PO.map((po) => {
              return (
                <div key={po} className="flex gap-2 items-cente rounded-md p-2">
                  <img
                    src={flavor_img[po]}
                    alt={`flavor ${po}`}
                    className="w-[3rem] h-[3rem] rounded-full border-2 border-cyan-400 cursor-pointer"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-cyan-400">{po}</span>
                    <div className="flex gap-3">
                      <div className="tooltip_container h-[1.5rem]">
                        <FaPencil className="cursor-pointer text-cyan-200" />
                        <div className="tooltip tooltip_bottom">Edit</div>
                      </div>

                      <div className="tooltip_container h-[1.5rem]">
                        <TbTrashX className="cursor-pointer text-red-600" />
                        <div className="tooltip tooltip_bottom">Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full flex flex-wrap gap-2">
              <div className="w-[15rem] border flex justify-center border-gray-500 text-gray-300 rounded py-2 cursor-pointer">
                Add
              </div>
            </div>
          </div>
          {/*  */}
          <div className="absolute -top-[10px] -right-[10px]">
            <div className="bg-red-500 rounded-full cursor-pointer text-[0.8rem] p-[2px]">
              <RxCross2 />
            </div>
          </div>
        </div>
        <div className={`input_title `}>
          <span>Fountain Flavors</span>
        </div>
      </div>
    );
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
                    value: "Ice",
                    options: [
                      "Ice",
                      "Butter",
                      "Fountain drinks flavors",
                      "ICEE flavors",
                    ],
                    // validate: "",
                  }}
                  handleOnChange={(value) => console.log(value)}
                />
              </div>

              <button className="border border-gray-400 p-2 rounded max-w-[15rem] flex items-center justify-center gap-2">
                <AiOutlinePlus />
                <span> Add product options</span>
              </button>
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
