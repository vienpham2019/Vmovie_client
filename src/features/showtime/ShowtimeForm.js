import { IoCalendar } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Calendar from "../../components/Calendar";
import { useEffect, useState } from "react";
import Selection from "../../components/form/Selection";
import { useGetAllTheaterByAdminQuery } from "../theater/theaterApiSlice";
import { FaClock } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

import PublicMovies from "../movie/PublicMovies";
import {
  useCreateShowtimeMutation,
  useDeleteShowtimeMutation,
  useGetAllShowtimeTimelineQuery,
} from "./showtimeApiSlice";
import {
  convertMinutesToHoursAndMinutesString,
  convertToAmPm,
  hourAndMinToMin,
  isTimeBetween,
  subtractTimes,
} from "../../util/time";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const ShowtimeForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDayOptions, setSelectedDayOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [selectTheaterOptions, setSelectheaterOptions] = useState({});
  const [selectedTheater, setSelectedTheater] = useState();
  const [showTime, setShowTime] = useState({
    startTime: "00:00",
    endTime: "00:00",
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openSelectMovie, setOpenSelectMovie] = useState(false);
  const [showTimeList, setShowtimeList] = useState([]);

  const { data: { metadata: showtimesData } = [] } =
    useGetAllShowtimeTimelineQuery(
      { date: selectedDay, theaterName: selectedTheater },
      {
        skip: !selectedDay || !selectedTheater, // Skip the query if the conditions are not met
        pollingInterval: 120000, // 2min the data will fetch again
        refetchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  const { data: { theaters } = [], isLoading: theaterLoading } =
    useGetAllTheaterByAdminQuery(
      { search: "", page: 1, limit: 20 },
      {
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  useEffect(() => {
    if (showtimesData) {
      setShowtimeList(showtimesData);
    }
  }, [showtimesData]);

  const [createShowtime] = useCreateShowtimeMutation();
  const [deleteShowtime] = useDeleteShowtimeMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (theaters && Object.keys(theaters)?.length) {
      const initSelecTheaters = Object.entries(theaters.entities).map(
        ([_, theater]) => theater.name
      );
      setSelectheaterOptions(initSelecTheaters);
      setSelectedTheater(initSelecTheaters[0]);
    }
  }, [theaters]);

  const onSelectDate = (selectedDate, selectedDates) => {
    if (selectedDate.length !== 2) {
      setStartDate("");
      setEndDate("");
      return;
    }
    const [start_date, end_date] = selectedDate;
    if (start_date) {
      setStartDate(start_date);
    }
    if (end_date) {
      setEndDate(end_date);
    }
    setSelectedDayOptions(selectedDates);
    setSelectedDay(selectedDates[0]);
  };

  const handleDeleteShowtime = async (_id) => {
    const res = await deleteShowtime(_id);
    dispatch(
      setMessage({
        message: res.data.message,
        messageType: notificationMessageEnum.SUCCESS,
      })
    );
    setShowtimeList(
      showTimeList.slice().filter((showtime) => showtime._id !== _id)
    );
  };

  const displaySelectDate = () => {
    return (
      <div>
        <span className="text-white">Select date</span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 text-[1.3rem]">
                <IoCalendar />
              </div>
              <input
                name="start"
                type="string"
                value={startDate}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 text-[1.3rem]">
                <IoCalendar />
              </div>
              <input
                name="end"
                type="string"
                value={endDate}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
              />
            </div>
          </div>
          <div className="">
            <Calendar onSelectDate={onSelectDate} />
          </div>
        </div>
      </div>
    );
  };

  const displaySelectMovie = () => {
    const { hours, minutes } = convertMinutesToHoursAndMinutesString(
      selectedMovie?.runtime || "0min"
    );
    return (
      <div className="flex flex-col gap-3">
        <span className="text-white">Select movie</span>
        {selectedMovie && (
          <div className="flex gap-3 text-white">
            <img
              className="w-[5rem]"
              src={selectedMovie.poster.url}
              alt="poster"
            />
            <div className="flex flex-col gap-3">
              <span>{selectedMovie.title}</span>
              <span className="text-gray-400">
                Duration: {hours}h {minutes}min
              </span>
            </div>
          </div>
        )}
        {openSelectMovie && (
          <div>
            <PublicMovies
              selectMovie={(movie) => {
                setSelectedMovie(movie);
                setOpenSelectMovie(false);
              }}
            />
            <button
              className="text-white p-3 border border-white"
              onClick={() => setOpenSelectMovie(false)}
            >
              Cancel
            </button>
          </div>
        )}
        {!openSelectMovie && (
          <button
            className="text-white p-3 border border-white w-[15rem]"
            onClick={() => setOpenSelectMovie(true)}
          >
            Select Movie
          </button>
        )}
      </div>
    );
  };

  const handleSaveTime = async () => {
    if (!selectedMovie?.runtime) {
      return;
    }
    const { startTime, endTime } = showTime;

    const { hours, minutes } = convertMinutesToHoursAndMinutesString(
      selectedMovie.runtime
    );
    const { hours: hoursDiff, minutes: minutesDiff } = subtractTimes(
      startTime,
      endTime
    );
    if (
      hourAndMinToMin(hoursDiff, minutesDiff) < hourAndMinToMin(hours, minutes)
    ) {
      dispatch(
        setMessage({
          message:
            "Time difference needs to be greater than the movie duration.",
          messageType: notificationMessageEnum.WARNING,
        })
      );
      return;
    }
    const newShowtime = {
      startTime,
      endTime,
      date: selectedDay,
      theaterName: selectedTheater,
      movieId: selectedMovie._id,
    };
    const isInValidShowtime = showTimeList.some(
      ({ startTime: s_startTime, endTime: s_endTime }) => {
        return (
          isTimeBetween({
            startTime: s_startTime,
            endTime: s_endTime,
            checkTime: startTime,
          }) ||
          isTimeBetween({
            startTime: s_startTime,
            endTime: s_endTime,
            checkTime: endTime,
          })
        );
      }
    );
    if (isInValidShowtime) {
      dispatch(
        setMessage({
          message: "Selected time overlaps with an existing showtime.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }
    // setShowtimeList((prev) => [...prev, newShowtime]);
    const res = await createShowtime(newShowtime);
    setShowtimeList((prev) => [...prev, res.data.metadata]);
    setShowTime({
      startTime: "00:00",
      endTime: "00:00",
    });
  };

  const displaySelectTime = () => {
    const sortSetShowtimeList = showTimeList.slice().sort((a, b) => {
      return (
        +a.startTime.split(":").join("") - +b.startTime.split(":").join("")
      );
    });
    return (
      <div className="flex-1 my-3">
        <div className="flex flex-wrap gap-2">
          {/* Controller */}
          <div className="flex flex-col ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <div className="input_group w-[10rem]">
                  <Selection
                    formData={{
                      value: selectedTheater || "No theater",
                      options: selectTheaterOptions,
                    }}
                    handleOnChange={(value) => setSelectedTheater(value)}
                  />
                  <div className={`input_title`}>
                    <span>Select Theater Room</span>
                  </div>
                </div>
                <div className="input_group w-[10rem]">
                  <Selection
                    formData={{
                      value: selectedDay || "No day",
                      options: selectedDayOptions,
                    }}
                    handleOnChange={(value) => setSelectedDay(value)}
                  />
                  <div className={`input_title`}>
                    <span>Select Date</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="z-10 bg-white rounded-lg shadow w-auto dark:bg-gray-700 p-3">
                  <div className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label
                        htmlFor="start-time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start time:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <FaClock className="text-gray-400 " />
                        </div>
                        <input
                          type="time"
                          id="start-time"
                          onChange={(e) => {
                            setShowTime((prev) => ({
                              ...prev,
                              startTime: e.target.value,
                            }));
                          }}
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value={showTime.startTime}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="end-time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End time:
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <FaClock className="text-gray-400" />
                        </div>
                        <input
                          type="time"
                          id="end-time"
                          onChange={(e) => {
                            setShowTime((prev) => ({
                              ...prev,
                              endTime: e.target.value,
                            }));
                          }}
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value={showTime.endTime}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 text-sm hover:text-blue-200 p-0"
                    onClick={() => handleSaveTime()}
                  >
                    Save time
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* EndController */}
          {/* Time taken */}
          <div className="p-2 flex flex-col  items-center gap-3 border border-neutral-700 rounded w-[20rem] flex-auto mobile:w-[16rem] max-h-[20rem] overflow-y-scroll">
            {sortSetShowtimeList.map(
              ({ _id, movie, startTime, endTime }, index) => {
                const { hours, minutes } =
                  convertMinutesToHoursAndMinutesString(movie.duration);
                return (
                  <div className="flex" key={"time line " + index}>
                    {/* <!-- Left Content --> */}
                    <div className="h-[110px] flex flex-col justify-between">
                      <div className="w-16 text-end">
                        <span className="text-xs text-gray-500 dark:text-neutral-400">
                          {convertToAmPm(startTime)}
                        </span>
                      </div>
                      <div className="w-16 text-end">
                        <span className="text-xs text-gray-500 dark:text-neutral-400">
                          {convertToAmPm(endTime)}
                        </span>
                      </div>
                    </div>
                    {/* <!-- End Left Content --> */}

                    {/* <!-- Icon --> */}
                    <div className="h-[110px] flex flex-col justify-between">
                      <div className="size-7 flex justify-center items-center">
                        <div className="size-2 rounded-full bg-neutral-600"></div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        {" "}
                        <div className=" bg-neutral-600 w-[3px]"></div>
                      </div>
                      <div className="size-7 flex justify-center items-center">
                        <div className="size-2 rounded-full bg-neutral-600"></div>
                      </div>
                    </div>
                    {/* <!-- End Icon --> */}

                    {/* <!-- Right Content --> */}
                    <div className="flex gap-2 items-center">
                      <div className=" h-full">
                        <img
                          className="w-[3rem]"
                          src={movie.posterUrl}
                          alt="poster"
                        />
                      </div>

                      <div className="grow pt-0.5 pb-8 flex flex-col gap-1">
                        <h3 className="flex gap-x-1.5 font-semibold text-white text-[0.8rem]">
                          {movie.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-400">
                          {hours}h {minutes}min
                        </p>
                        <div
                          className="flex gap-3 mt-3"
                          onClick={() => handleDeleteShowtime(_id)}
                        >
                          <FaRegTrashAlt className="text-red-500 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Right Content --> */}
                  </div>
                );
              }
            )}
            {showTimeList.length === 0 && (
              <div className="text-gray-600 justify-center flex p-2">
                <span>No Show time</span>
              </div>
            )}
          </div>
          {/* End Time taken */}
        </div>
      </div>
    );
    {
      /* <!-- End Timeline --> */
    }
  };

  if (theaterLoading) return <div>Loading...</div>;

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border items-center border-gray-500 rounded bg-[#1f1f1f]"
    >
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="flex flex-col gap-4">
          {/* Selecdate */}
          {displaySelectDate()}
          <div className="flex flex-wrap gap-3">
            {/* SelectMovies*/}
            {displaySelectMovie()}

            {/* Select Time */}
            <div className="flex flex-wrap gap-3">{displaySelectTime()}</div>
          </div>

          <button className="btn-blue w-[15rem]" type="submit">
            Submit
          </button>
        </div>
      </div>
      {/* Body */}
    </form>
  );
};

export default ShowtimeForm;
