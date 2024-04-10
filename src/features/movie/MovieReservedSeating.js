import DateSlider from "../../components/slider/DateSlider";
import Selection from "../../components/form/Selection";
import MovieSeats from "./MovieSeats";
import { RxCross2 } from "react-icons/rx";
const MovieReservedSeating = () => {
  const sitLayOut = {
    A: ["1H", "4N", "1H", "5N", "1H", "4N", "1H"],
    B: ["1H", "4N", "1H", "5N", "1H", "4N", "1H"],
    Hall1: "",
    C: ["2D", "3N", "1H", "1N", "4D", "1H", "2N", "3D"],
    D: ["5N", "1H", "5N", "1H", "5N"],
    E: ["5N", "1H", "5N", "1H", "5N"],
    Hall2: "",
    F: ["5N", "1H", "5N", "1H", "5N"],
    G: ["5N", "1H", "5N", "1H", "5N"],
    H: ["5N", "1H", "5N", "1H", "5N"],
  };

  const selectedSeats = [
    "A1",
    "A2",
    "A3",
    "A5",
    "A6",
    "A7",
    "C1",
    "C2",
    "C6",
    "C7",
    "C8",
    "C9",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
  ];

  const selectSeat = [
    "G7",
    "G8",
    "G9",
    "H7",
    "H8",
    "H9",
    "E1",
    "E2",
    "E3",
    "E6",
    "E7",
    "E8",
  ];
  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex justify-center w-full">
        {/* Date */}
        <div className="py-2 rounded flex bg-[#172532] flex-1">
          <div className="text-gray-300 items-center gap-4 flex flex-wrap justify-around w-full px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <div>
                <span className="text-[0.9rem] font-thin">Chose Date</span>
                <div className="mx-[1.5rem]">
                  <DateSlider
                    dates={[
                      "Apr-12-Mon",
                      "Apr-13-Tue",
                      "Apr-14-Wed",
                      "Apr-15-th",
                      "Apr-16-Thu",
                      "Apr-17-Fri",
                      "Apr-18-Sat",
                      "Apr-19-Sun",
                      "Apr-20-Mon",
                      "Apr-21-Tue",
                    ]}
                  />
                </div>
              </div>
              <div>
                <span className="text-[0.9rem] font-thin">Chose Time</span>
                <div className="mx-[1.5rem]">
                  <DateSlider
                    dates={[
                      "-08:20-AM",
                      "-10:20-AM",
                      "-11:40-AM",
                      "-12:20-PM",
                      "-14:30-PM",
                      "-20:20-PM",
                      "-22:50-PM",
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="w-[12rem] flex-auto">
              <Selection
                formData={{
                  value: "",
                  options: ["2D", "3D", "IMAX", "IMAX 3D"],
                }}
                placeHolder="Select Type"
                border={"border border-gray-600"}
                background={""}
                handleOnChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>{" "}
        {/* Date */}
      </div>
      <div className="flex flex-wrap-reverse gap-[2rem] w-full tablet:justify-center justify-start">
        <div
          className={`flex flex-col gap-2 font-thin ${
            selectSeat.length === 0 && "opacity-0"
          }`}
        >
          <div className="w-[12rem] tablet:w-full max-h-[30rem] overflow-y-scroll flex flex-wrap justify-center gap-2 boder p-2">
            {selectSeat.map((seat) => (
              <div
                key={"select seat " + seat}
                className="p-2 w-full border border-gray-500 rounded-sm flex justify-between items-center bg-[#172532]"
              >
                <span>Seat: {seat}</span>
                <span>15$</span>
                <span className="cursor-pointer">
                  <RxCross2 />
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center gap-2">
            <span className="text-gray-400 text-[0.9rem]">ToTal</span>
            <span className="text-[1.2rem] font-normal">
              {" "}
              ${selectSeat.length * 15}
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
        {/* Sit */}
        <MovieSeats
          sitLayOut={sitLayOut}
          selectedSeats={selectedSeats}
          selectSeat={selectSeat}
        />
        {/* Sit */}
        <div className="flex flex-col gap-4 font-thin laptop:hidden">
          <div className="w-[5rem]">
            <span className="text-gray-400">Date</span>
            <div className="flex flex-col items-center border border-gray-500">
              <span className="text-[2rem] font-normal">14</span>
              <span className="uppercase">Dec</span>
            </div>
          </div>

          <div className="flex flex-col w-[5rem]">
            <span className="text-gray-400">Time</span>
            <span className="font-normal">08:20 AM</span>
          </div>
          <div className="flex flex-col w-[5rem]">
            <span className="text-gray-400">Type</span>
            <span className="font-normal">2D</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReservedSeating;
