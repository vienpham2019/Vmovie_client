import { FaWheelchair } from "react-icons/fa6";
import { seatTypeEnum } from "./theaterEnum";
import { MdOutlineWheelchairPickup } from "react-icons/md";
import { useSelector } from "react-redux";

const TheaterLayoutModal = () => {
  const { modalParams: { grid } = [] } = useSelector((state) => state.modal);
  const SeatComponent = ({ seat }) => {
    const { seatType, seatNumber } = seat;
    let className =
      "w-[2rem] aspect-square rounded-md flex justify-center items-center cursor-pointer text-[0.7rem] hover:bg-cyan-600 ";
    if (seatType === seatTypeEnum.HALL) {
      className += "text-transparent";
    } else {
      className += "border border-gray-500 text-white";
    }

    return (
      <div key={"seat " + seatNumber} className={className}>
        {seatType === seatTypeEnum.WHEELCHAIR ? (
          <FaWheelchair />
        ) : seatType === seatTypeEnum.COMPANITION ? (
          <MdOutlineWheelchairPickup />
        ) : (
          seatNumber
        )}
      </div>
    );
  };
  const disPlaySeatLayOut = () => {
    return (
      <div className="flex flex-col gap-2">
        {grid.map((row, rowIndex) => {
          let seatNumber = 0;
          return (
            <div className="flex gap-2 justify-center" key={rowIndex}>
              {row.map((seat, colIndex) => {
                if (seat.seatType !== seatTypeEnum.HALL) seatNumber++;
                return (
                  <div key={`Seat - row ${rowIndex} - col ${colIndex}`}>
                    {SeatComponent({
                      seat: { ...seat, seatNumber },
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="overflow-x-scroll flex flex-wrap justify-center flex-1 px-5 bg-[#172532]">
      <div className="flex flex-col gap-1 py-2 min-w-[40rem] flex-auto items-center">
        <div className="flex flex-col  m-2 pl-[2rem]">
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen w-full bg-gray-400"></div>
          </div>
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen-shadow w-full bg-gradient-to-b from-gray-700"></div>
          </div>
        </div>
        <div className="flex  mb-[2rem]">
          <div>{disPlaySeatLayOut()}</div>
        </div>
      </div>
    </div>
  );
};

export default TheaterLayoutModal;
