import { useSelector } from "react-redux";

const MovieCheckOutSummaryModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const { tickets, foodAndDrink } = modalParams.products;
  const displayFoodAndDrink = () => {
    const { products } = foodAndDrink;
    return products.map((value, index) => (
      <div
        key={"food" + index}
        className="flex flex-col border-b border-gray-400 text-[0.8rem]"
      >
        <div className="flex justify-between flex-1">
          <span className="font-bold w-[80%] pr-2">{value["item_name"]}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="w-[70%]">
            {value["options"].map((opt) => opt.selection).join(", ")}
          </span>
          <div className="flex gap-1">
            <span>{value["amount"]}</span>
            <span>x</span>
            <span>${value["price"].toFixed(2)}</span>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="flex flex-col gap-4 min-w-[19rem] p-2">
      <h2 className="font-thin uppercase">Products details</h2>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <span className="font-bold">
              Tickets{" "}
              <small className="font-normal">( {tickets.amount} )</small>{" "}
            </span>
            <span>${tickets.subTotal}</span>
          </div>
          <div className="flex justify-between items-end border-b-1">
            <span className="max-w-[10rem] text-[0.8rem]">
              {tickets.item_name}
            </span>
            <span className="text-[0.8rem]">${tickets.price} each</span>
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
            <span>${foodAndDrink.subTotal}</span>
          </div>
          <div>{displayFoodAndDrink()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCheckOutSummaryModal;
