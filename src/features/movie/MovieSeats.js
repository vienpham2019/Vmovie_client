import { FaWheelchair } from "react-icons/fa6";

const MovieSeats = ({
  sitLayOut = [],
  selectedSeats = [],
  selectSeat = [],
}) => {
  const disPlaySitLayOut = () => {
    return Object.keys(sitLayOut).map((key, index) => {
      if (key.startsWith("Hall")) {
        return (
          <div key={"sit hall" + index} className="flex-1 p-[0.5rem]"></div>
        );
      }
      let sitCount = 0;
      return (
        <div
          key={"sit row" + key}
          className="flex justify-center flex-1 h-[2rem] gap-2"
        >
          <div
            key={"row " + key}
            className="w-[2rem] aspect-square flex justify-center items-center font-thin text-cyan-200"
          >
            {key !== "SitCount" && key}
          </div>
          {sitLayOut[key].map((sit) => {
            let sitAmount = parseInt(sit, 10); // Parse the string as an integer with base 10
            let sitType = sit.charAt(sit.length - 1); // Get the last character of the string
            if (sitType === "H") {
              return Array.from({ length: sitAmount }).map((_, i) => (
                <div
                  key={"hall " + key + i}
                  className="w-[2rem] aspect-square"
                ></div>
              ));
            }
            return Array.from({ length: sitAmount }).map((_, i) =>
              SitComponent({ sitNumber: key + ++sitCount, sitType })
            );
          })}
        </div>
      );
    });
  };

  const SitComponent = ({ sitNumber, sitType }) => {
    let sitClass =
      "w-[2rem] aspect-square rounded-md flex justify-center items-center cursor-pointer";
    if (selectedSeats.includes(sitNumber)) {
      sitClass += " bg-black ";
    } else if (selectSeat.includes(sitNumber)) {
      sitClass += " bg-cyan-600 ";
    } else {
      sitClass += " hover:bg-cyan-600 border border-gray-400";
    }

    return (
      <div
        key={"sit " + sitNumber}
        className={sitClass}
        onClick={() => console.log(sitNumber)}
      >
        {sitType === "D" && <FaWheelchair />}
      </div>
    );
  };

  return (
    <div className="overflow-x-scroll flex-1 tablet:max-w-[47rem] mobile:w-[19rem] px-5 bg-[#172532] rounded-md">
      <div className="flex flex-col gap-1 py-2 min-w-[40rem]">
        <div className="flex flex-col items-center m-2 pl-[2rem]">
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen w-full bg-gray-400"></div>
          </div>
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen-shadow w-full bg-gradient-to-b from-gray-700"></div>
          </div>
        </div>
        {disPlaySitLayOut()}
        <div className="h-[2rem] mt-2 flex flex-1 justify-around font-thin">
          <div className="flex gap-2 items-center text-gray-300">
            <div className="w-[2rem] aspect-square border border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-cyan-500"></div>
            <span>Available</span>
          </div>
          <div className="flex gap-2 items-center text-gray-300">
            <div className="w-[2rem] aspect-square border border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-cyan-500">
              <FaWheelchair />
            </div>
            <span>Handicap</span>
          </div>
          <div className="flex gap-2 items-center text-gray-300">
            <div className="w-[2rem] bg-cyan-600 aspect-square rounded-md flex justify-center items-center cursor-pointer hover:bg-cyan-500"></div>
            <span>Selected</span>
          </div>
          <div className="flex gap-2 items-center text-gray-300">
            <div className="w-[2rem] bg-black aspect-square rounded-md flex justify-center items-center cursor-pointer hover:bg-cyan-500"></div>
            <span>Taken</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSeats;
