import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { RiVisaLine, RiMastercardFill } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";

import {
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";

const MovieCheckOut = () => {
  const { tickets, foodAndDrink, subTotal } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();
  const onlineFees = 5.67;
  const tax = subTotal * 0.3;

  const cartType = {
    VISA: "https://www.cinemark.com/images/cc_visa.png",
    MASTER_CARD: "https://www.cinemark.com/images/cc_mastercard.png",
    AMERICA_EXPRESS: "https://www.cinemark.com/images/cc_amex.png",
    DISCOVER: "https://www.cinemark.com/images/cc_discover.png",
  };

  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex flex-wrap-reverse gap-[2rem] w-full tablet:justify-center justify-start">
        {/* Total menu */}
        <div className="relative">
          <small>April 11, 2024 at 7:25 PM</small>
          <div className="flex flex-col gap-2 font-thin p-1 w-[19rem] rounded bg-[#172532]">
            <div className="max-h-[30rem] overflow-y-scroll flex flex-col gap-2 boder p-2">
              <h2 className="font-bold">Summary</h2>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <span>Tickets</span>
                  <FiPlusCircle className="cursor-pointer text-red-600" />
                </div>
                <span>${tickets.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <span>Food & Drink</span>
                  <FiPlusCircle className="cursor-pointer text-red-600" />
                </div>
                <span>${foodAndDrink.subTotal.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-500"></div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$ {subTotal}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Online Ticket Fees</span>
                  <span>$ {onlineFees}</span>
                </div>
                <span className="text-[0.8rem] w-[70%] text-gray-300">
                  Online Fees are waived when you are a Movie Club member.
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$ {tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-500"></div>
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span>$ {(subTotal + tax + onlineFees).toFixed(2)}</span>
              </div>
              <div>
                <p className="text-[0.8rem] pt-[1rem] text-gray-300">
                  By completing your purchase, you agree to our{" "}
                  <span
                    className="text-cyan-300 cursor-pointer font-bold"
                    onClick={() =>
                      dispatch(openModal(modalComponentEnum.PRIVATE_POLICY))
                    }
                  >
                    Privacy Policy
                  </span>{" "}
                  and acknowledge that you are at least 16 years of age.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Total menu */}
        <div className="flex-1 min-w-[15rem] bg-[#172532] p-2 rounded  flex flex-col justify-between">
          <div className="w-full flex flex-col gap-4 px-1">
            <div className="input_group mt-4">
              <input
                type="text"
                className={`input border-gray-500 `}
                value=""
                onChange={(e) => console.log(e.target.value)}
              />
              <div className={`input_title `}>
                <span>
                  Email
                  <small className="text-red-400">*</small>
                </span>
              </div>
            </div>
            <h2 className="border-b border-gray-500">Card Details</h2>
            <div className="flex flex-wrap gap-[2rem] relative">
              {/* Card */}
              <div className=" bg-gradient-to-r from-cyan-700 to-[#3a5167] text-[0.9rem] text-gray-200 p-1 w-[15rem] h-[10rem] rounded shadow-lg flex flex-col justify-between">
                <div className="flex justify-end p-2">
                  <img
                    src={cartType.DISCOVER}
                    alt="card type"
                    className="w-[5rem] rounded"
                  />
                </div>
                <div className="flex justify-center gap-4 tracking-2">
                  <span>1232</span>
                  <span>4562</span>
                  <span>7892</span>
                  <span>7892</span>
                </div>
                <div className="flex justify-between px-4 items-end">
                  <div>
                    <span className="text-[0.7rem] text-gray-300">
                      Card holder
                    </span>
                    <h3>Jack Daniel</h3>
                  </div>
                  <p className="tracking-2">12/19</p>
                </div>
              </div>
              {/* Card */}
              <div className="flex flex-col flex-1 gap-4 mb-4">
                <div className="input_group">
                  <input
                    type="text"
                    className={`input border-gray-500 `}
                    value="Jack Daniel"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <div className={`input_title `}>
                    <span>
                      Card Holder
                      <small className="text-red-400">*</small>
                    </span>
                  </div>
                </div>
                <div className="input_group flex-1">
                  <input
                    type="text"
                    className={`input border-gray-500 `}
                    value="1232 4562 7892 7892"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <div className={`input_title `}>
                    <span>
                      Card Number
                      <small className="text-red-400">*</small>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 flex-1">
                  <div className="input_group flex-1">
                    <input
                      type="text"
                      className={`input border-gray-500 `}
                      value="12"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div className={`input_title `}>
                      <span>
                        Exp Month
                        <small className="text-red-400">*</small>
                      </span>
                    </div>
                  </div>
                  <div className="input_group flex-1">
                    <input
                      type="text"
                      className={`input border-gray-500 `}
                      value="19"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div className={`input_title `}>
                      <span>
                        Exp Year
                        <small className="text-red-400">*</small>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 flex-1">
                  <div className="input_group flex-1">
                    <input
                      type="text"
                      className={`input border-gray-500 `}
                      value="77301"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div className={`input_title `}>
                      <span>
                        Billing ZIP Code
                        <small className="text-red-400">*</small>
                      </span>
                    </div>
                  </div>
                  <div className="input_group flex-1">
                    <input
                      type="text"
                      className={`input border-gray-500 `}
                      value="123"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div className={`input_title `}>
                      <span>
                        Card Security Code
                        <small className="text-red-400">*</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="p-3 rounded bg-red-600">
            Completed Purchase{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCheckOut;
