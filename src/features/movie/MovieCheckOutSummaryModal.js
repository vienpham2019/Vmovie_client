import { useSelector } from "react-redux";
import { convertToAmPm } from "../../util/time";

const MovieCheckOutSummaryModal = () => {
  const { tickets, foodAndDrink } = useSelector((state) => state.movie);

  const displayFoodAndDrink = () => {
    return (
      <div className="flex w-full flex-col flex-1 gap-1 items-center">
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
                  It isn't a movie without the snacks. Order now to skip the
                  line and get snacking faster!
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
              </div>
              <div className="flex justify-between items-end">
                <span className="max-w-[18rem] flex flex-col">
                  {Object.entries(value["selectedOptions"]).map(
                    ([key, opt]) => (
                      <span>
                        {key} - {opt}
                      </span>
                    )
                  )}
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
    );
  };

  return (
    <div className="flex flex-col gap-4 min-w-[19rem] max-h-screen overflow-y-auto p-2 bg-gray-700 text-gray-200">
      <h2 className="font-thin uppercase">Summary</h2>
      <div className="flex flex-col">
        <small>{tickets.theaterName}</small>
        <small>
          {tickets.date} At {convertToAmPm(tickets.time)}
        </small>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-[0.9rem]">
            <span className="font-bold">
              Ticket{tickets.seats.length > 1 && "s"} ( {tickets.seats.length} )
            </span>
            <span>${tickets.subTotal}</span>
          </div>
          <div className="flex gap-2 border-b-1 text-[0.9rem]">
            <span>Seat{tickets.seats.length > 1 && "s"}</span>
            <div className="flex flex-wrap gap-2">
              {tickets.seats.map((seat) => (
                <span key={`checkout summary seats - ${seat}`}>{seat}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(tickets.prices).map(([key, value], index) => {
              return (
                value.count > 0 && (
                  <div
                    key={`tickets ${index}`}
                    className="flex justify-between text-[0.9rem]"
                  >
                    <span>{key}</span>
                    <div className="flex gap-1">
                      <span>{value.count}</span>
                      <span>x</span>
                      <span>${value.price}</span>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-bold">
              Food and Drink{" "}
              <small className="font-normal">
                ( {foodAndDrink.products.length} )
              </small>{" "}
            </span>
            <span className="text-[0.9rem]">${foodAndDrink.subTotal}</span>
          </div>
          <div>{displayFoodAndDrink()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCheckOutSummaryModal;
