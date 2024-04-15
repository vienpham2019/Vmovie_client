import { useState } from "react";
import { GiPopcorn, GiTicket } from "react-icons/gi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import { MdOutlineLocalDrink } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ImSpoonKnife } from "react-icons/im";
import { LuCandy } from "react-icons/lu";
import { IoIceCreamOutline } from "react-icons/io5";
import { GiChipsBag } from "react-icons/gi";
import { GoPencil } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { deleteFoodAndDrink } from "./movieSlice";

import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";

const productIcons = {
  Popcorn: <GiPopcorn />,
  Fountain_Drinks: <MdOutlineLocalDrink />,
  Combo: <ImSpoonKnife />,
  Bottled_Drinks: <TbBottleFilled />,
  Candy: <LuCandy />,
  Ice_Cream: <IoIceCreamOutline />,
  Snacks: <GiChipsBag />,
};

const fountain_OPT = [
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
const butter_OPT = ["No Added Butter", "Regular Butter", "Layered Butter"];
const ice_OPT = ["Regular Ice", "No Ice", "Light Ice", "Extra Ice"];
const ICEE_OPT = ["ICEE Coke", "ICEE Cherry", "ICEE Blue Raspberry"];

const MovieFoodAndDrink = () => {
  const [openMenu, setOpenMenu] = useState("Popcorn");

  const products = {
    Combo: [
      {
        item_name: "Large Popcorn & Drink Combo",
        price: 14.8,
        describe:
          "Tub of buttered Orville Redenbacher's light and fluffy popcorn & a Large fountain beverage of your choice from a variety of Coca-Cola® products.",
        img: "https://www.cinemark.com/media/76011403/400x225-siat-combo1.jpg",
        OPT: [
          {
            name: "butter_options",
            options: butter_OPT,
          },
          {
            name: "ice_options",
            options: ice_OPT,
          },
          {
            name: "fountain_flavors",
            options: fountain_OPT,
          },
        ],
      },
      {
        item_name: "Large Popcorn & 2 Large Drinks Combo",
        price: 21.25,
        describe:
          "Tub of buttered Orville Redenbacher's light and fluffy popcorn & two Large fountain beverages of your choice from a variety of Coca-Cola® products.",
        img: "https://www.cinemark.com/media/76011400/400x225-siat-combo2.jpg",
        OPT: [
          {
            name: "butter_options",
            options: butter_OPT,
          },
          {
            name: "ice_options#1",
            options: ice_OPT,
          },
          {
            name: "fountain_flavors#1",
            options: fountain_OPT,
          },
          {
            name: "ice_options#2",
            options: ice_OPT,
          },
          {
            name: "fountain_flavors#2",
            options: fountain_OPT,
          },
        ],
      },
      {
        item_name: "Large Popcorn & Large ICEE Combo",
        price: 15.0,
        describe:
          "Tub of buttered Orville Redenbacher's light and fluffy popcorn & a Large ICEE flavor of choice in a to-go cup with lid and straw.",
        img: "https://www.cinemark.com/media/76011401/400x225-siat-combo3.jpg",
        OPT: [
          {
            name: "butter_options",
            options: butter_OPT,
          },
          {
            name: "ICEE_flavors",
            options: ICEE_OPT,
          },
        ],
      },
    ],
    Popcorn: [
      {
        item_name: "XL Refillable Popcorn",
        price: 9.95,
        describe:
          "Bring home a taste of the movies with our signature light ‘n fluffy popcorn. Pair it with one or more of our many candy options for a sweet and salty snack mix. Comes with 1 free same day refill.",
        img: "https://www.cinemark.com/media/76001745/siat-popcornxl-desktop-768x432.png",
        OPT: [
          {
            name: "butter_options",
            options: butter_OPT,
          },
        ],
      },
      {
        item_name: "Popcorn Tub",
        price: 8.1,
        describe:
          "Bring home a taste of the movies with our signature light ‘n fluffy popcorn. Pair it with one or more of our many candy options for a sweet and salty snack mix.",
        img: "https://www.cinemark.com/media/76010048/siat-concession-resize-large-popcorn-400x225.png",
        OPT: [
          {
            name: "butter_options",
            options: butter_OPT,
          },
        ],
      },
    ],
    Fountain_Drinks: [
      {
        item_name: "Free Refill – Large Drink",
        price: 6.2,
        describe:
          "Choose from a variety of Coca-Cola® fountain beverages, including Coke®, Diet Coke®, Coke Zero® Sugar, Sprite®, and more!",
        img: "https://www.cinemark.com/media/76010045/siat-concession-resize-large-cup-400x225.png",
        OPT: [
          {
            name: "ice_options",
            options: ice_OPT,
          },
          {
            name: "fountain_flavors",
            options: fountain_OPT,
          },
        ],
      },
      {
        item_name: "Large ICEE",
        price: 6.4,
        describe:
          "Cool things down with an ICEE flavor of choice in a to-go cup with lid and straw.",
        img: "https://www.cinemark.com/media/75992305/siat-400x225_0003_blue-icee.jpg",
        OPT: [
          {
            name: "ICEE_flavors",
            options: ICEE_OPT,
          },
        ],
      },
    ],
    Bottled_Drinks: [
      {
        item_name: "1 Liter Bottled Dasani Water",
        price: 5.75,
        describe: "DASANI Purified Water Bottle",
        img: "https://www.cinemark.com/media/75978617/400x225_dasani.jpg",
        OPT: [],
      },
      {
        item_name: "16oz Monster Energy",
        price: 5.75,
        describe:
          "Tear into a can of one of the meanest energy drinks on the planet, Monster OG. Monster Energy OG is a smooth, refreshing blend of sweet and salty exotic citrus flavors with a hint of pure adrenaline packing 160MG of caffeine. Unleash the beast with Monster OG!",
        img: "https://www.cinemark.com/media/76009567/siat-image-16ozmonsteroriginal-mobile-400x225.png",
        OPT: [],
      },
    ],
    Candy: [
      {
        item_name: "Buncha Crunch Box",
        price: 4.35,
        describe:
          "A sweeter way to crunch! Enjoy the same great taste of a classic Nestle Crunch bar, but in the shape of perfectly munchable pieces.",
        img: "https://www.cinemark.com/media/75963105/bunchacrunch_400x225.jpg",
        OPT: [],
      },
    ],
    Snacks: [
      {
        item_name: "Cheetos Crunchy",
        price: 4.65,
        describe:
          "Bring a cheesy, delicious crunch to snack time with a bag of CHEETOS® Crunchy Cheese-Flavored Snacks. Made with real cheese for maximum flavor.",
        img: "https://www.cinemark.com/media/76010730/hot-august-2023_3rd-party-resizes_cheetoscnk-mo_400x225.jpg",
        OPT: [],
      },
      {
        item_name: "Rico's Jalapeno Pouch",
        price: 0.65,
        describe:
          "Crisp and zesty jalapenos grown in Mexico. A great addition to your meal, and the best tasting peppers available anywhere!",
        img: "https://www.cinemark.com/media/75979228/400x225_ricos-jalapenos.jpg",
        OPT: [],
      },
    ],
    Ice_Cream: [
      {
        item_name: "Dibs",
        price: 5.5,
        describe:
          "Bite-sized bliss! With a Crispy Nestle Crunch coating filled with creamy vanilla, it’s one sweet way to snack.",
        img: "https://www.cinemark.com/media/76008586/hot-may-23-ice-cream-candy-siat-ue-resizes_dibs-new768-x-432_siat.jpg",
        OPT: [],
      },
      {
        item_name: "M&M's Vanilla Ice Cream Sandwich",
        price: 5.5,
        describe:
          "Treat yourself to a cool and colorful ice-cream sandwich. Velvety vanilla ice cream between two sugar cookies, covered in classic M&M’s.",
        img: "https://www.cinemark.com/media/76008608/hot-may-23-ice-cream-candy-siat-ue-resizes_mm-ice-cream-sandwitch400-x-225_siat.jpg",
        OPT: [],
      },
    ],
  };

  const dispatch = useDispatch();
  const { tickets, foodAndDrink, subTotal } = useSelector(
    (state) => state.movie
  );

  const getProductByTitle = (item_name) => {
    for (const category in products) {
      const productsInCategory = products[category];
      const product = productsInCategory.find(
        (product) => product.item_name === item_name
      );
      if (product) {
        return product;
      }
    }
    return null; // If no product found with the given title
  };

  const handleOpenEditModal = (item) => {
    const food = {
      ...getProductByTitle(item.item_name),
      amount: item.amount,
      OPT: getProductByTitle(item.item_name).OPT.map((option) => {
        const foundOption = item.options.find((o) => o.name === option.name);
        return foundOption
          ? { ...option, selection: foundOption.selection }
          : option;
      }),
    };
    dispatch(setModalParams({ food, type: "Edit", editItem: item }));
    dispatch(openModal(modalComponentEnum.FOOD_AND_DRINK));
  };

  const handleOpenModal = (item) => {
    const food = {
      ...item,
      amount: 1,
      OPT: item.OPT.map((opt) => ({ ...opt, selection: opt.options[0] })),
    };

    dispatch(setModalParams({ food, type: "Add" }));
    dispatch(openModal(modalComponentEnum.FOOD_AND_DRINK));
  };

  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex flex-wrap-reverse gap-[2rem] w-full tablet:justify-center justify-start">
        {/* Total menu */}
        <div className="relative">
          <small>April 11, 2024 at 7:25 PM</small>
          <div className="flex flex-col gap-2 font-thin p-1 w-[19rem] rounded bg-[#172532]">
            <div className="max-h-[30rem] overflow-y-scroll flex flex-wrap justify-center gap-2 boder p-2">
              {" "}
              {tickets && (
                <div className="flex flex-col gap-1 items-center border-b border-gray-500">
                  <div className="flex justify-between items-center w-full p-1">
                    <div className="flex items-center gap-2 font-bold">
                      <GiTicket />
                      <span>Tickets</span>
                    </div>
                    <span>${tickets.subTotal.toFixed(2) || ""}</span>
                  </div>
                  <div className="flex items-end">
                    <span className="w-[80%] text-[0.8rem]">
                      {tickets.item_name}
                    </span>
                    <div className="flex gap-1 text-[0.8rem]">
                      <span>{tickets.amount}</span>
                      <span>x</span>
                      <span>${tickets.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
              {foodAndDrink && (
                <div className="flex flex-col flex-1 gap-1 items-center">
                  <div className="flex w-full justify-between items-center p-1">
                    <div className="flex items-center gap-2 font-bold">
                      <GiPopcorn />
                      <span>Food & Drink</span>
                    </div>
                    {foodAndDrink.subTotal > 0 && (
                      <span>${foodAndDrink.subTotal.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="text-[0.8rem] grid gap-2 w-full">
                    {foodAndDrink.products.map((value, index) => (
                      <div
                        key={"food" + index}
                        className="flex flex-col border-b border-gray-500"
                      >
                        <div className="flex justify-between flex-1">
                          <span className="font-bold w-[80%] pr-2">
                            {value["item_name"]}
                          </span>
                          <div className="flex gap-2 text-[1rem]">
                            <GoPencil
                              className="cursor-pointer"
                              onClick={() => handleOpenEditModal(value)}
                            />
                            <RxCrossCircled
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch(deleteFoodAndDrink(value))
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <span>
                            {value["options"]
                              .map((opt) => opt.selection)
                              .join(", ")}
                          </span>
                          <div className="flex gap-1">
                            <span>{value["amount"]}</span>
                            <span>x</span>
                            <span>${value["price"].toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end items-center gap-2">
              <span className="text-gray-400 text-[0.9rem]">Subtotal -</span>
              <span className="text-[1.2rem] font-normal">
                ${subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-1">
              <button className="border border-red-800 text-red-500 uppercase text-[0.9rem] p-2 flex-1">
                Cancle
              </button>
              <button className="border border-cyan-800 text-cyan-500 uppercase text-[0.9rem] p-2 flex-1">
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Total menu */}
        <div className="flex-1 min-w-[15rem] bg-[#172532] p-2 rounded">
          <div className="w-full flex flex-col gap-4">
            {Object.entries(products).map(([key, items]) => (
              <div
                key={"Product " + key}
                className="flex-1 gap-2 flex flex-col border p-2 rounded border-gray-500 "
              >
                <div
                  className="flex items-center justify-between cursor-pointer "
                  onClick={() => setOpenMenu(key)}
                >
                  <div className="flex items-center gap-2">
                    {productIcons[key]}
                    <span className="font-bold">
                      {key.split("_").join(" ")}
                    </span>
                  </div>
                  {openMenu === key ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {openMenu === key && (
                  <div className="flex flex-wrap gap-2 ">
                    {items.map((item, index) => (
                      <div
                        key={"item " + key + index}
                        onClick={() => {
                          handleOpenModal(item);
                        }}
                        className="flex flex-col justify-between gap-1 font-thin rounded w-[10rem] border border-gray-500 cursor-pointer"
                      >
                        <div className="grid gap-1">
                          <img src={item.img} alt="item" />
                          <span className="px-1 font-normal">
                            {item.item_name}
                          </span>
                        </div>
                        <span className="px-1">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFoodAndDrink;
