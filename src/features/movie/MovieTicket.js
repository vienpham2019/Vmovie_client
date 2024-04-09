import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "./movieApiSlice";
import DateSlider from "../../components/slider/DateSlider";
import Selection from "../../components/form/Selection";
import { FaWheelchair } from "react-icons/fa6";

const MovieTicket = () => {
  const { movieId } = useParams();
  const { data: { metadata: movie } = {}, isLoading } = useGetMovieByIdQuery(
    { movieId },
    {
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );

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
    SitCount: ["5N", "1H", "5N", "1H", "5N"],
  };

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
            className="w-[2rem] aspect-square flex justify-center items-center text-gray-400"
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
            let sitClass =
              "w-[2rem] aspect-square border border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:bg-cyan-500";
            if (key === "SitCount") {
              sitClass =
                "w-[2rem] aspect-square flex justify-center items-center text-gray-400";
            }
            return Array.from({ length: sitAmount }).map((_, i) => (
              <div key={"sit " + key + i} className={sitClass}>
                {key === "SitCount" && ++sitCount}
                {sitType === "D" && <FaWheelchair />}
              </div>
            ));
          })}
        </div>
      );
    });
  };

  if (isLoading || !movie) return <div>Loading</div>;

  return (
    <div className="w-screen bg-black h-screen flex justify-center overflow-x-hidden font-sans">
      <div
        className={`w-[80rem] h-[40rem] py-3 relative grid gap-4 mt-[6rem] p-2 text-white`}
      >
        <div className="flex gap-4 flex-wrap">
          <div className="mobile:flex mobile:flex-auto justify-center">
            <img
              className="max-w-[10rem] mobile:max-w-[18rem] rounded-lg shadow-[20px_20px_20px_-20px_rgba(255,255,255,0.5)]"
              src={movie.poster.url}
              alt="poster"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-[3rem] uppercase font-mono font-bold">
              {movie.title}
            </h1>
            <div className="py-2 rounded flex bg-[#172532]">
              <div className="text-gray-300 items-center gap-4 flex flex-wrap tablet:flex-col justify-around w-full px-4">
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
            </div>
          </div>

          {/* Sit */}
          <div className="flex flex-col gap-1 w-full py-2">
            <div className="flex justify-center m-2 pl-[2rem]">
              <div className="w-[45rem] h-[2rem] border border-cyan-200 border-b-0 shadow-lg bg-gradient-to-b from-cyan-800 rounded-t-full text-[0.7rem] flex justify-center items-center text-gray-400">
                Screen
              </div>
            </div>
            {disPlaySitLayOut()}
          </div>
          {/* Sit */}
        </div>
      </div>
    </div>
  );
};

export default MovieTicket;
