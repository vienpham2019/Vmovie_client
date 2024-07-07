import { FaWheelchair } from "react-icons/fa6";
import { MdOutlineWheelchairPickup } from "react-icons/md";

const MovieSeats = ({
  seatLayOut = [],
  selectedSeats = [],
  selectSeat = [],
  handleAddSelectSeat,
  handleRemoveSelectSeat,
}) => {
  const displaySeatLayOut = () => {
    return seatLayOut.map((layout, index) => {
      const { key, value: grid } = layout;

      if (key.startsWith("Hall")) {
        return (
          <div key={"seat hall" + index} className="flex-1 py-[1rem]"></div>
        );
      }
      let seatCount = 0;
      return (
        <div
          key={"seat row" + key}
          className="flex justify-center flex-1 h-[2rem] gap-2"
        >
          <div
            key={"row " + key}
            className="w-[2rem] aspect-square flex justify-center items-center font-thin text-cyan-200"
          >
            {key !== "SeatCount" && key}
          </div>
          {grid.map((seat) => {
            let seatAmount = parseInt(seat, 10); // Parse the string as an integer with base 10
            let seatType = seat.replace(/\d+/g, ""); // Get the last character of the string
            if (seatType === "H") {
              return Array.from({ length: seatAmount }).map((_, i) => (
                <div
                  key={"hall " + key + i}
                  className="w-[2rem] aspect-square"
                ></div>
              ));
            }
            return Array.from({ length: seatAmount }).map((_, i) =>
              SeatComponent({ seatNumber: key + ++seatCount, seatType })
            );
          })}
        </div>
      );
    });
  };

  const SeatComponent = ({ seatNumber, seatType }) => {
    let seatClass =
      "w-[2rem] aspect-square rounded-md flex justify-center items-center";
    if (selectedSeats.includes(seatNumber)) {
      seatClass += " bg-gray-700 text-gray-400";
    } else if (selectSeat.includes(seatNumber)) {
      seatClass += " bg-gray-900 border border-gray-400";
    } else if (seatType === "WH_C" || seatType === "COM") {
      seatClass += " bg-[#2f76b8] hover:bg-cyan-500 cursor-pointer";
    } else {
      seatClass +=
        " bg-emerald-700 border border-emerald-400 hover:bg-cyan-500 cursor-pointer";
    }

    return (
      <div
        onClick={() => {
          if (!selectedSeats.includes(seatNumber)) {
            if (selectSeat.includes(seatNumber)) {
              handleRemoveSelectSeat(seatNumber);
            } else {
              handleAddSelectSeat(seatNumber);
            }
          }
        }}
        key={"seat " + seatNumber}
        className={seatClass}
      >
        {seatType === "WH_C" ? (
          <FaWheelchair />
        ) : seatType === "COM" ? (
          <MdOutlineWheelchairPickup />
        ) : (
          <span className="text-[0.8rem]">{seatNumber}</span>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-x-scroll flex-1 tablet:max-w-[47rem] mobile:w-[19rem] px-5 bg-[#172532] rounded-md">
      <div className="flex flex-col gap-1 py-2 min-w-[40rem] ">
        <div className="flex flex-col items-center m-2 pl-[3rem]">
          <div className="w-[30rem] h-[5rem] screen-container">
            <div className="screen w-full bg-gray-400"></div>
          </div>
          <div className="w-[30rem] h-[5rem] screen-container">
            <div className="screen-shadow w-full bg-gradient-to-b from-gray-700"></div>
          </div>
        </div>
        {displaySeatLayOut()}
      </div>
    </div>
  );
};

export default MovieSeats;
