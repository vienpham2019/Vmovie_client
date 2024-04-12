import { useState } from "react";
import { GiPopcorn, GiTicket } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdOutlineLocalDrink } from "react-icons/md";

const productIcons = {
  Popcorn: <GiPopcorn />,
  Fountain_Drinks: <MdOutlineLocalDrink />,
};

const MovieFoodAndDrink = () => {
  const [ticketTotal, setTicketTotal] = useState(15);
  const [foodAndDrinkTotal, setFoodAndDrinkTotal] = useState(40.2);
  const [openMenu, setOpenMenu] = useState("Popcorn");
  const [itemsList, setItemList] = useState({
    tickets: [
      {
        item: "G7, G8, G9, H7, H8, H9, E1, E2, E3, E6, E7, E8",
        count: 12,
        price: 15,
      },
    ],
    food_drink: [
      {
        item: "Popcorn Tub",
        count: 2,
        price: 8.1,
        options: ["Layered Butter"],
      },
      {
        item: "XL Refillable Popcorn",
        count: 2,
        price: 9.95,
        options: ["Layered Butter"],
      },
      {
        item: "Medium Drink",
        count: 1,
        price: 5.55,
        options: ["Diet Coke", "Light Ice"],
      },
      {
        item: "Free Refill – Large Drink",
        count: 1,
        price: 6.2,
        options: ["Powerade Mountain Blast", "Regular Ice"],
      },
      {
        item: "Medium Drink",
        count: 1,
        price: 5.55,
        options: ["Diet Coke", "Light Ice"],
      },
      {
        item: "Free Refill – Large Drink",
        count: 1,
        price: 6.2,
        options: ["Powerade Mountain Blast", "Regular Ice"],
      },
    ],
  });
  const products = {
    Popcorn: [
      {
        title: "XL Refillable Popcorn",
        price: 9.95,
        describe:
          "Bring home a taste of the movies with our signature light ‘n fluffy popcorn. Pair it with one or more of our many candy options for a sweet and salty snack mix. Comes with 1 free same day refill.",
        img: "https://www.cinemark.com/media/76001745/siat-popcornxl-desktop-768x432.png",
        butter_options: ["No Added Butter", "Regular Butter", "Layered Butter"],
      },
      {
        title: "Popcorn Tub",
        price: 8.1,
        describe:
          "Bring home a taste of the movies with our signature light ‘n fluffy popcorn. Pair it with one or more of our many candy options for a sweet and salty snack mix.",
        img: "https://www.cinemark.com/media/76010048/siat-concession-resize-large-popcorn-400x225.png",
        butter_options: ["No Added Butter", "Regular Butter", "Layered Butter"],
      },
    ],
    Fountain_Drinks: [
      {
        title: "Free Refill – Large Drink",
        price: 6.2,
        describe:
          "Choose from a variety of Coca-Cola® fountain beverages, including Coke®, Diet Coke®, Coke Zero® Sugar, Sprite®, and more!",
        img: "https://www.cinemark.com/media/76010045/siat-concession-resize-large-cup-400x225.png",
        fountain_flavors: [
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
        ],
        ice_options: ["Regular Ice", "No Ice", "Light Ice", "Extra Ice"],
      },
      {
        title: "Large ICEE",
        price: 6.4,
        describe:
          "Cool things down with an ICEE flavor of choice in a to-go cup with lid and straw.",
        img: "https://www.cinemark.com/media/75992305/siat-400x225_0003_blue-icee.jpg",
        fountain_flavors: ["ICEE Coke", "ICEE Cherry", "ICEE Blue Raspberry"],
      },
    ],
  };
  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex flex-wrap-reverse gap-[2rem] w-full tablet:justify-center justify-start">
        {/* Total menu */}
        <div className="w-[15rem] relative">
          <small>April 11, 2024 at 7:25 PM</small>
          <div className="flex flex-col gap-2 font-thin p-1 w-[15rem] fixed rounded bg-[#172532]">
            <div className="max-h-[30rem] overflow-y-scroll flex flex-wrap justify-center gap-2 boder p-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="flex justify-between items-center w-full p-1">
                  <div className="flex items-center gap-2 font-bold">
                    <GiTicket /> <span>{itemsList["tickets"][0].count}</span>{" "}
                    <span>Tickets</span>
                  </div>
                  <span>${ticketTotal.toFixed(2)}</span>
                </div>
                <span className="w-[90%] text-[0.8rem]">
                  G7, G8, G9, H7, H8, H9, E1, E2, E3, E6, E7, E8
                </span>
              </div>
              <div className="flex flex-col flex-1 gap-1 items-center">
                <div className="flex w-full justify-between items-center p-1">
                  <div className="flex items-center gap-2 font-bold">
                    <GiPopcorn />
                    <span>Food & Drink</span>
                  </div>
                  <span>${foodAndDrinkTotal.toFixed(2)}</span>
                </div>
                <div className="text-[0.8rem] grid gap-2 w-full">
                  {itemsList["food_drink"].map((value, index) => (
                    <div
                      key={"food" + index}
                      className="flex flex-col border-b border-gray-500"
                    >
                      <div className="flex justify-between flex-1">
                        <span className="font-bold w-[80%] pr-2">
                          {value["item"]} Lorem ipsum
                        </span>
                        <div className="flex gap-2 text-[1rem]">
                          <GoPencil className="cursor-pointer" />
                          <RxCrossCircled className="cursor-pointer" />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span>{value["options"].join(", ")}</span>
                        <div className="flex gap-1">
                          <span>{value["count"]}</span>
                          <span>x</span>
                          <span>${value["price"].toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
              <span className="text-gray-400 text-[0.9rem]">Grand ToTal</span>
              <span className="text-[1.2rem] font-normal">
                ${(ticketTotal + foodAndDrinkTotal).toFixed(2)}
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
        <div className="flex-1 min-w-[15rem] h-screen bg-[#172532] p-2 rounded">
          <div className="w-full flex flex-col gap-4">
            {Object.entries(products).map(([key, items]) => (
              <div
                key={"Product " + key}
                className="flex-1 gap-2 flex flex-col border p-2 rounded border-gray-500 "
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
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
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                      <div
                        key={"item " + key + index}
                        className="flex flex-col justify-between gap-1 font-thin rounded w-[10rem] border border-gray-500 cursor-pointer"
                      >
                        <div className="grid gap-1">
                          <img src={item.img} alt="item" />
                          <span className="px-1 font-normal">{item.title}</span>
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
