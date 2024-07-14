import { useSelector } from "react-redux";
import { convertToAmPm } from "../../util/time";
import { GiPopcorn, GiTicket } from "react-icons/gi";
import { Link } from "react-router-dom";

const MovieCompletedPurchange = () => {
  const { selectedMovie, tickets, foodAndDrink } = useSelector(
    (state) => state.movie
  );
  const subTotal = tickets.subTotal + foodAndDrink.subTotal;
  const onlineFees = 5.67;
  const tax = subTotal * 0.3;

  return (
    <div className="w-full flex-wrap flex gap-3">
      <div className="w-[18rem] flex-1 bg-[#172532]">
        <div className="p-4">
          <span className="text-[1.2rem] font-bold">
            Thank you for your purchase
          </span>
          <p className="text-[0.9rem]">
            Your ticket has been saved to your accont, and an email confirmation
            has been sent to the email address used to make the purchase.
          </p>
        </div>
        <div className="p-3">
          <span>Send ticket to your email</span>
          <div className="input_group m-4">
            <input
              type="text"
              className={`input border-gray-500`}
              value={""}
              onChange={(e) => console.log(e.target.value)}
            />
            <div className={`input_title `}>
              <span>Email</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mx-2 text-cyan-300 hover:text-cyan-400 cursor-pointer">
          <Link to={"/"}>Home page</Link>
        </div>
      </div>
      <div className="flex flex-col flex-auto gap-2 bg-[#172532]">
        <div className="flex flex-col gap-2 border border-gray-500 rounded">
          <div className="flex flex-wrap gap-4 p-2">
            <img
              className="w-[5rem] h-fit"
              src={selectedMovie.poster.url}
              alt="poster"
            />
            <div className="flex flex-col gap-3">
              <Link
                to={`/movies/${selectedMovie._id}`}
                className="font-bold text-[1.2rem]"
              >
                {selectedMovie.title}
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-[0.8rem]">
                  {tickets.date} At {convertToAmPm(tickets.time)}
                </span>
                <span>Cinema Tinseltown Houston 290 and XD</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 p-4">
            <img
              className="w-[5rem] h-fit bg-white"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              alt="qr code"
            />
            <div className="flex flex-col gap-3">
              <span className="text-[1.1rem] font-bold">
                Confirmation Number
              </span>
              <span>123456789</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 font-thin p-1 rounded bg-[#172532]">
            <div className="max-h-[30rem] overflow-y-scroll flex flex-col gap-2 boder p-2">
              <div className="flex gap-2 items-center">
                <h2 className="font-bold">Summary</h2>
              </div>
              <div className="flex justify-between items-center w-full p-1">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 font-bold">
                      <GiTicket />
                      <span>
                        {tickets.seats.length} Ticket
                        {tickets.seats.length > 1 && "s"}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span>${tickets.subTotal.toFixed(2) || ""}</span>
                    </div>
                  </div>
                  <span className="text-[0.9rem]">
                    Seats: {tickets.seats.join(",")}
                  </span>
                  <div className="w-full flex flex-col flex-1 gap-1 text-[0.9rem]">
                    {Object.entries(tickets.prices).map(
                      ([key, value], index) => {
                        return (
                          value.count > 0 && (
                            <div
                              className="flex w-full justify-between border-b border-gray-700"
                              key={`tickets details ${index}`}
                            >
                              <span>{key}</span>
                              <div className="w-[4rem] flex justify-between">
                                <div>
                                  <span>{value.count}</span> <span>x</span>
                                </div>
                                <span>${value.price.toFixed(2)}</span>
                              </div>
                            </div>
                          )
                        );
                      }
                    )}
                  </div>
                </div>{" "}
              </div>
              <div className="flex justify-between items-center w-full p-1">
                <div className="flex items-center gap-2 font-bold">
                  <GiPopcorn />
                  <span>{foodAndDrink.products.length} Food & Drink</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span>${foodAndDrink.subTotal.toFixed(2) || ""}</span>
                </div>
              </div>{" "}
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
                        It isn't a movie without the snacks. Order now to skip
                        the line and get snacking faster!
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
                      <span className="font-bold pr-2">
                        {value["itemName"]}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="max-w-[20rem]">
                        {Object.entries(value["selectedOptions"])
                          .map(([key, opt]) => `${key} - ${opt}`)
                          .join(", ")}
                      </span>
                      <div className="flex w-[4rem] justify-between gap-1 text-[0.9rem]">
                        <div className="flex gap-1">
                          <span>{value.amount}</span> <span>x</span>
                        </div>
                        <span>${value.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-b">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">$ {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Online Ticket Fees</span>
                  <span className="font-semibold">
                    $ {onlineFees.toFixed(2)}
                  </span>
                </div>
                <span className="text-[0.8rem] w-[70%] text-gray-300">
                  Online Fees are waived when you are a Movie Club member.
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-semibold">$ {tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-500"></div>
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-semibold">
                  $ {(subTotal + tax + onlineFees).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCompletedPurchange;
