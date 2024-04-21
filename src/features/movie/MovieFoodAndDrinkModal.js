import { FaMinus, FaPlus } from "react-icons/fa6";
import Selection from "../../components/form/Selection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeModal } from "../../components/modal/ModalSlice";
import { addFoodAndDrink, deleteFoodAndDrink } from "./movieSlice";

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

const MovieFoodAndDrinkModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const [food, setFood] = useState();
  const [type, setType] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalParams?.food) {
      setFood(modalParams.food);
    }
    if (modalParams?.type) {
      setType(modalParams.type);
    }
  }, [modalParams]);

  if (!food) return;

  const handleSetFood = (key, value) => {
    setFood((prevFood) => ({ ...prevFood, [key]: value }));
  };

  const handleSetFoodPO = (name, value) => {
    const updatePO = food.PO.map((opt) => {
      if (opt.name === name) {
        return {
          ...opt,
          selection: value,
        };
      }
      return opt;
    });
    setFood((prevFood) => ({ ...prevFood, ["PO"]: updatePO }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddProduct = () => {
    const { item_name, amount, price, PO } = food;
    if (type === "Edit") {
      dispatch(deleteFoodAndDrink(modalParams.editItem));
    }

    dispatch(
      addFoodAndDrink({
        item_name,
        amount,
        price,
        options: PO.map(({ name, selection }) => ({ name, selection })),
      })
    );
    dispatch(closeModal());
  };

  const handleDisplayOptions = () => {
    return food.PO.map((option) => {
      if (option.name.includes("flavor")) {
        return displayFlavors(option);
      }
      return displaySelectOptions(option);
    });
  };

  const displaySelectOptions = (option) => {
    const { options, name, selection } = option;
    return (
      <div>
        <span className="capitalize font-bold">
          {name.split("_").join(" ")}
        </span>
        <Selection
          formData={{
            value: selection,
            options: options,
          }}
          border={"border border-gray-600"}
          handleOnChange={(value) => handleSetFoodPO(name, value)}
        />
      </div>
    );
  };

  const displayFlavors = (option) => {
    const { options, name, selection } = option;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="capitalize font-bold">
            {name.split("_").join(" ")}
          </span>
          <small>{selection}</small>
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map((flavor, index) => (
            <div
              key={"flavor " + index}
              className={`w-[3rem] aspect-square rounded-full cursor-pointer ${
                selection === flavor && "border border-red-500"
              } p-[2px]`}
              onClick={() => handleSetFoodPO(name, flavor)}
            >
              <img
                src={flavor_img[flavor]}
                alt="flavor"
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[20rem] max-h-[95vh] overflow-y-scroll bg-white rounded flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-[1.2rem] font-bold py-2 border-b border-gray-400">
          {food.item_name}
        </h2>
        <div>
          {" "}
          <img
            src={food.img}
            alt="food"
            className="h-[4rem] mx-2 rounded float-right border"
          />
          <p className="text-[0.9rem]">{food.describe}</p>
        </div>
        {handleDisplayOptions()}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div
              className={`w-[2rem] aspect-square rounded-full ${
                food.amount > 1 ? "bg-gray-800 cursor-pointer" : "bg-gray-300"
              } text-white flex justify-center items-center`}
              onClick={() => {
                if (food.amount <= 1) return;
                handleSetFood("amount", food.amount - 1);
              }}
            >
              <FaMinus />
            </div>
            <span>{food.amount}</span>
            <div
              className={`w-[2rem] aspect-square rounded-full text-white  ${
                food.amount < 10 ? "bg-gray-800 cursor-pointer" : "bg-gray-300"
              } flex justify-center items-center`}
              onClick={() => {
                if (food.amount >= 10) return;
                handleSetFood("amount", food.amount + 1);
              }}
            >
              <FaPlus />
            </div>
          </div>
          <span>${food.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-1">
          <button
            className="border h-[3rem] flex-1 border-red-700 text-red-700 rounded"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
          <button
            className="border h-[3rem] flex-1 border-red-700 text-white bg-red-700 rounded uppercase"
            onClick={() => handleAddProduct()}
          >
            {type || "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFoodAndDrinkModal;
