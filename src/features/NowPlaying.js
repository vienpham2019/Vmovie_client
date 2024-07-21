import { useEffect, useState } from "react";
import {
  useGetAllShowtimeByDateQuery,
  useGetAllShowtimeDatesQuery,
} from "./showtime/showtimeApiSlice";
import DateSlider from "../components/slider/DateSlider";
import MovieSlider from "../components/slider/MovieSlider";
import { FaRegHeart } from "react-icons/fa6";
import { getWeekday } from "../util/date";
import {
  convertMinutesToHoursAndMinutesString,
  convertToAmPm,
} from "../util/time";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../components/modal/ModalSlice";
import { useNavigate } from "react-router-dom";

const imageAddress =
  "https://www.newsviewsnetwork.com/wp-content/uploads/2012-movie-collage31-scaled.jpg";

const news = [
  {
    imgUrl:
      "http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_59.jpg",
    title: "Six book-to-film adaptations to get excited about this autumn",
    date: "April 28, 2022",
  },
  {
    imgUrl:
      "http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_57.jpg",
    title: "The Beatles: Eight Days a Week – The Touring",
    date: "April 30, 2022",
  },
  {
    imgUrl:
      "http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_56.jpg",
    title: "Win a Wizarding World holiday with Fantastic",
    date: "April 12, 2022",
  },
];
const NowPlaying = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showtimeDates, setShowtimeDates] = useState([]);
  const [selectShowtimeDates, setSelectShowtimeDates] = useState();
  const { data: { metadata: dates } = {} } = useGetAllShowtimeDatesQuery(
    {},
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );
  const { data: { metadata: showtimes } = [] } = useGetAllShowtimeByDateQuery(
    { date: selectShowtimeDates?.split("/").join("-") },
    {
      skip: !selectShowtimeDates,
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );

  useEffect(() => {
    if (dates) {
      const initDates = dates.map(({ date }) => date);
      setShowtimeDates(initDates);
      setSelectShowtimeDates(initDates[0]);
    }
  }, [dates]);

  const displayShowtime = ({
    movieId,
    posterUrl,
    rating,
    runtime,
    title,
    trailer,
    showtimes: times,
  }) => {
    const { hours, minutes } = convertMinutesToHoursAndMinutesString(runtime);
    return (
      <div
        className="flex flex-wrap gap-4 bg-gray-800 rounded shadow px-2 py-4"
        key={movieId}
      >
        <div className="flex flex-col gap-3 w-[6rem]">
          <img src={posterUrl} className="" alt="poster" />
          <div className="py-1 px-2 flex gap-2 text-white bg-gray-700 rounded justify-center items-center cursor-pointer">
            <FaRegHeart />
            <span className="text-[0.6rem]">Add to watch list</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[1.2rem]">{title}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 text-[0.8rem] text-gray-300">
              <span>{rating}</span>
              <span>
                {hours}hr {minutes}min
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigate(`/movies/${movieId}`);
                }}
                className="bg-gray-400 px-2 py-1 rounded text-gray-900 text-[0.9rem] hover:bg-gray-500"
              >
                Details
              </button>
              <button
                onClick={() => {
                  dispatch(setModalParams({ videoUrl: trailer }));
                  dispatch(openModal(modalComponentEnum.VIDEO));
                }}
                className="bg-gray-400 px-2 py-1 rounded text-gray-900 text-[0.9rem] hover:bg-gray-500"
              >
                Trailer
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-gray-300">
            <h3 className="text-white">Standard Format</h3>
            <div className="flex flex-wrap gap-2 text-[0.9rem] text-gray-400">
              <span>Luxury Lounger</span>
              <span>Closed Caption</span>
              <span>Assisted Listening Device</span>
              <span>Descriptive Narration</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 max-w-[30rem]">
            {times.map(({ startTime }, index) => {
              return (
                <div
                  onClick={() =>
                    navigate(
                      `/movies/${movieId}/getTicket?date=${selectShowtimeDates}&time=${startTime}`
                    )
                  }
                  key={`Showtime ${startTime}` + index}
                  className="bg-gray-200 text-gray-900 hover:bg-gray-300 cursor-pointer text-[0.9rem] px-2 py-1 rounded"
                >
                  {convertToAmPm(startTime)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full grid justify-center">
      <div className="absolute top-0 h-[30rem] w-full">
        <div
          className="relative w-full h-full bg-contain"
          style={{
            backgroundImage: `url(${imageAddress})`,
          }}
        >
          <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
          <div className="absolute top-0 w-full h-[5rem] bg-gradient-to-b from-gray-900"></div>
          <div className="absolute bottom-0 w-full h-[5rem] bg-gradient-to-t from-gray-900"></div>
        </div>
      </div>
      <div className="z-[1] text-white min-h-[60rem] my-2 flex flex-col gap-[2rem] mobile:p-2">
        <div className="flex flex-col items-center py-4 gap-4">
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex w-full gap-2 items-end">
              <hr className="flex-1 border-gray-500" />
              <h2 className="font-bold text-[1.9rem]">
                Top movies in theaters
              </h2>
              <hr className="flex-1 border-gray-500" />
            </div>

            <small className="text-gray-300">at Moviak Cinema & Theatre</small>
          </div>

          <MovieSlider />
        </div>
        <div className="relative flex justify-center p-[1.9rem]">
          <img
            src="https://www.cinemark.com/media/vrwnzmvh/fmm_1080x360_er_sneak.jpg"
            alt="new"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <h2 className="text-[2rem] font-bold">Showtime</h2>
            <hr className="flex-1 border-gray-500" />
          </div>

          <div className={`flex gap-2`}>
            {showtimeDates && showtimeDates.length > 5 ? (
              <DateSlider
                dates={showtimeDates}
                handleSelecDay={setSelectShowtimeDates}
              />
            ) : (
              showtimeDates.map((date, index) => {
                const [day, month] = date.split("/");
                const weekday = getWeekday(date);
                return (
                  <div
                    onClick={() => setSelectShowtimeDates(date)}
                    key={"date slider " + index}
                    className={`w-[4rem] h-[4rem] text-gray-200 px-[4px] flex cursor-pointer `}
                  >
                    <div
                      className={`border ${
                        selectShowtimeDates === date
                          ? "border-cyan-400 bg-[rgb(59,117,171)]"
                          : "border-gray-600 bg-[rgb(33,53,72)]"
                      } w-full flex flex-col py-1 justify-center items-center gap-1 hover:bg-[rgb(42,68,92)] rounded-md`}
                    >
                      <span className="text-[0.9rem] font-bold">{weekday}</span>
                      <span className="text-[0.7rem]">
                        {month} / {day}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex flex-col gap-[1rem] p-2 max-w-[90rem]">
              {showtimes &&
                showtimes.map((showtime) => {
                  return displayShowtime(showtime);
                })}
            </div>{" "}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-[1.3rem]">Upcoming Movies</h3>
              <div className="flex gap-3">
                <img
                  className="max-w-[5rem] h-fit"
                  src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00374973-zzhqldybgd-portrait.jpg"
                  alt="Upcoming"
                />
                <div className="flex flex-col gap-2">
                  <img
                    className="max-w-[9rem] h-fit"
                    src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/18SUzqEXhDog0ArxeDn7xu/2239ffa86d8b85bb5a2ddc957f13edd6/AFOP_KEY_ART_WIDE_VERSION_UbisoftForward_June12th_2023_8.15pmCET-11.15amPT_1920x1080_A-SONY.jpg"
                    alt="Upcoming"
                  />
                  <img
                    className="max-w-[9rem] h-fit"
                    src="https://www.sonypictures-kinofinder.de/media/images/69ec4da0/gbfekinofinder1400x700ab.jpg"
                    alt="Upcoming"
                  />
                </div>
              </div>
              <hr className="border-gray-500" />
              <h3 className="font-bold text-[1.3rem]">Recent Posts</h3>
              {news.map(({ imgUrl, title, date }, index) => {
                return (
                  <div
                    className="flex gap-3 max-w-[18rem]"
                    key={`new ${index}`}
                  >
                    <img
                      className="max-w-[9rem] h-fit"
                      src={imgUrl}
                      alt="post"
                    />
                    <div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[0.9rem]">{title}</span>
                        <span className="text-gray-500 text-[0.7rem]">
                          {date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <hr className="border-gray-500" />
              <img
                className="max-h-[12rem] w-fit"
                src="http://demo.amytheme.com/movie/demo/elementor-single-cinema/wp-content/uploads/sites/2/2022/05/img_63.png"
                alt="ad"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
