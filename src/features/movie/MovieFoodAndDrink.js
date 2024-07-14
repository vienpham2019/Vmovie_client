import { useEffect, useState } from "react";
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
import { addFoodAndDrink, deleteFoodAndDrink } from "./movieSlice";

import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { useGetAllProductByTypeQuery } from "../product/productApiSlice";
import { productDetailTypeEnum } from "../product/ProductDetailModal";
import { convertToAmPm } from "../../util/time";
import { menuSchema } from "./MovieTicket";

const productIcons = {
  Popcorn: <GiPopcorn />,
  "Fountain Drinks": <MdOutlineLocalDrink />,
  Combos: <ImSpoonKnife />,
  "Bottled Drinks": <TbBottleFilled />,
  Candy: <LuCandy />,
  "Ice Cream": <IoIceCreamOutline />,
  Snack: <GiChipsBag />,
};

const productTypes = [
  "Combos",
  "Popcorn",
  "Fountain Drinks",
  "Bottled Drinks",
  "Candy",
  "Ice Cream",
  "Snack",
];

const MovieFoodAndDrink = ({ setSelectedMenu }) => {
  const dispatch = useDispatch();
  const { tickets, foodAndDrink } = useSelector((state) => state.movie);
  const { modalResponse } = useSelector((state) => state.modal);

  const [openMenu, setOpenMenu] = useState(productTypes[0]);

  useEffect(() => {
    if (modalResponse) {
      if (modalResponse.type === productDetailTypeEnum.ADD) {
        dispatch(addFoodAndDrink(modalResponse.product));
      } else if (modalResponse.type === productDetailTypeEnum.EDIT) {
        dispatch(deleteFoodAndDrink(modalResponse.editProduct));
        dispatch(addFoodAndDrink(modalResponse.product));
      }
      dispatch(clearModalResponse());
    }
  }, [modalResponse, dispatch]);

  const { data: { metadata: products } = [], isLoading: productLoading } =
    useGetAllProductByTypeQuery(
      { type: openMenu },
      {
        skip: !openMenu,
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  const handleOpenEditModal = (item) => {
    dispatch(
      setModalParams({
        _id: item._id,
        product: item,
        type: productDetailTypeEnum.EDIT,
      })
    );
    dispatch(openModal(modalComponentEnum.PRODUCT_DETAIL));
  };

  const handleOpenModal = (item) => {
    dispatch(setModalParams({ _id: item._id, type: "Add" }));
    dispatch(openModal(modalComponentEnum.PRODUCT_DETAIL));
  };

  if (productLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex flex-wrap-reverse gap-[2rem] w-full tablet:justify-center justify-start">
        {/* Total menu */}
        <div className="relative">
          <div className="flex flex-col">
            <small>{tickets.theaterName}</small>
            <small>
              {tickets.date} At {convertToAmPm(tickets.time)}
            </small>
          </div>
          <div className="flex flex-col gap-2 font-thin p-1 w-[19rem] rounded bg-[#172532]">
            <div className="max-h-[30rem] overflow-y-scroll flex flex-wrap justify-center gap-2 boder p-2">
              {" "}
              {tickets && (
                <div className="flex w-full flex-col gap-1 items-center border-b border-gray-500">
                  <div className="flex justify-between items-center w-full p-1">
                    <div className="flex items-center gap-2 font-bold">
                      <GiTicket />
                      <span>
                        {tickets.seats.length} Ticket
                        {tickets.seats.length > 1 && "s"}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <GoPencil
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedMenu(menuSchema.RESERVED_SEATING);
                        }}
                      />
                      <span>${tickets.subTotal.toFixed(2) || ""}</span>
                    </div>
                  </div>
                  <div className="flex items-end"></div>
                </div>
              )}
              {foodAndDrink && (
                <div className="flex w-full flex-col flex-1 gap-1 items-center">
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
                    {foodAndDrink.products.length === 0 && (
                      <div className="bg-gray-700 rounded p-2 flex gap-2 items-center">
                        <img
                          className="w-[3rem] h-fit"
                          src="https://www.cinemark.com/images/concessions_pickup_image@2x.png"
                          alt=" icon"
                        />
                        <div className="grid gap-2">
                          <span className="font-bold text-[0.9rem]">
                            Don't forget the co-stars
                          </span>
                          <p className="text-[0.8rem]">
                            It isn't a movie without the snacks. Order now to
                            skip the line and get snacking faster!
                          </p>
                        </div>
                      </div>
                    )}
                    {foodAndDrink.products.map((value, index) => (
                      <div
                        key={"food" + index}
                        className="flex flex-col border-b border-gray-500"
                      >
                        <div className="flex justify-between flex-1">
                          <span className="font-bold w-[80%] pr-2">
                            {value["itemName"]}
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
                            {Object.entries(value["selectedOptions"])
                              .map(([key, opt]) => `${key} - ${opt}`)
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
                ${(tickets.subTotal + foodAndDrink.subTotal).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setSelectedMenu(menuSchema.CHECK_OUT);
                }}
                className="border border-cyan-800 text-cyan-500 uppercase text-[0.9rem] p-2 flex-1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Total menu */}
        <div className="flex-1 min-w-[15rem] bg-[#172532] p-2 rounded">
          <div className="w-full flex flex-col gap-4">
            {productTypes.map((type) => (
              <div
                key={"Product type " + type}
                className="flex-1 gap-2 flex flex-col border p-2 rounded border-gray-500 "
              >
                <div
                  className="flex items-center justify-between cursor-pointer "
                  onClick={() => setOpenMenu(type)}
                >
                  <div className="flex items-center gap-2">
                    {productIcons[type]}
                    <span className="font-bold">{type}</span>
                  </div>
                  {openMenu === type ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {openMenu === type && (
                  <div className="flex flex-wrap gap-2 ">
                    {products.map((item, index) => (
                      <div
                        key={"item " + type + index}
                        onClick={() => {
                          handleOpenModal(item);
                        }}
                        className="flex flex-col justify-between gap-1 font-thin rounded w-[10rem] border border-gray-500 cursor-pointer"
                      >
                        <div className="grid gap-1">
                          <img src={item.imgUrl} alt="item" />
                          <span className="px-1 font-normal">
                            {item.itemName}
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
