import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import { countDaysBetween, isAfterDate } from "../../util/date";
import TimePicker from "../../components/TimePicker";
import { useDispatch } from "react-redux";
import { useGetAllPublicMovieByAdminQuery } from "../movie/movieApiSlice";
import Pagination from "../../components/Pagination";
import { SlMagnifier } from "react-icons/sl";
import { useGetAllTheaterByAdminQuery } from "../theater/theaterApiSlice";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { FaEye, FaMinus, FaPlus } from "react-icons/fa6";
import CheckBox from "../../components/form/CheckBox";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { subtractTimes, timeToMinutes } from "../../util/time";
import { useCreateMultipleShowtimeMutation } from "./showtimeApiSlice";
import { useNavigate } from "react-router-dom";

const AddMultipleShowtime = () => {
  const navigate = useNavigate();
  const [selectDay, setSelectDay] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedTheaters, setSelectedTheaters] = useState([]);
  const [breakTime, setBreakTime] = useState(60);
  const dispatch = useDispatch();
  const limit = 10;
  const [createMultipleShowtime, { isLoading: createShowtimeLoading }] =
    useCreateMultipleShowtimeMutation();
  const { data: { metadata: { movies, totalMovies } = {} } = {}, isLoading } =
    useGetAllPublicMovieByAdminQuery(
      { search, page, limit, sortBy: "updatedAt", sortDir: -1 },
      {
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
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
  const errorFieldEnum = Object.freeze({
    TIME: "Time",
    DATE: "Date",
    MOVIE: "Movie",
    THEATER: "Theater",
  });
  const [errorField, setErrorField] = useState("");
  const [showTime, setShowTime] = useState({
    startTime: "06:00",
    endTime: "23:00",
  });
  const handleSetSelectDay = (day) => {
    let updateDate = [];
    if (selectDay.length === 0) {
      updateDate = [day];
    } else {
      if (isAfterDate(day, selectDay[0])) {
        updateDate = [selectDay[0], day];
      } else {
        updateDate = [day, selectDay[0]];
      }
    }
    setSelectDay(updateDate);
  };

  const sendErrorMessage = (message) => {
    dispatch(
      setMessage({ message, messageType: notificationMessageEnum.ERROR })
    );
  };

  useEffect(() => {
    setErrorField("");
  }, [selectDay, showTime, selectedMovies, selectedTheaters]);

  const handleGenerate = async () => {
    if (selectDay.length < 2) {
      sendErrorMessage("Please select start day and end day");
      setErrorField(errorFieldEnum.DATE);
      return;
    }
    if (countDaysBetween(selectDay[0], selectDay[1]) > 7) {
      sendErrorMessage("Can't generate more than 7 days of showtimes");
      setErrorField(errorFieldEnum.DATE);
      return;
    }
    if (timeToMinutes(showTime.startTime) > timeToMinutes(showTime.endTime)) {
      sendErrorMessage("Start time can't be after end time");
      setErrorField(errorFieldEnum.TIME);
      return;
    }
    const { hours: hourDiff } = subtractTimes(
      showTime.endTime,
      showTime.startTime
    );
    if (hourDiff < 5) {
      sendErrorMessage(
        "Time between start time and end time needs to be greater than 5 hours"
      );
      setErrorField(errorFieldEnum.TIME);
      return;
    }
    if (selectedMovies.length === 0) {
      sendErrorMessage("Please select movie");
      setErrorField(errorFieldEnum.MOVIE);
      return;
    }
    if (selectedTheaters.length === 0) {
      sendErrorMessage("Please select theater");
      setErrorField(errorFieldEnum.THEATER);
      return;
    }

    const res = await createMultipleShowtime({
      selectDay,
      showTime,
      selectedMovies,
      selectedTheaters,
      breakTime,
    });

    const { successfulCreations, failedCreations } = res.data.metadata;
    let message = `Successfuly create: ${successfulCreations} `;
    if (failedCreations > 0) {
      message += `and Fails to create: ${res.data.metadata.failedCreations} showtime`;
    } else {
      message += "showtime";
    }
    dispatch(
      setMessage({
        message,
        messageType: notificationMessageEnum.INFO,
      })
    );
    navigate("/admin/showtime");
  };

  if (isLoading || theaterLoading) return <div>Loading ...</div>;
  return (
    <div className="relative flex flex-col gap-[1rem] p-4 border items-center border-gray-500 rounded bg-[#1f1f1f]">
      {/* Body */}
      {createShowtimeLoading && (
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-50">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <div className="grid gap-4 ">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            {/* Date picker */}
            <div
              className={`flex flex-col gap-1 ${
                errorField === errorFieldEnum.DATE && "border border-red-500"
              } rounded-lg`}
            >
              <Calendar
                type={"List"}
                onSelectDate={(day) => handleSetSelectDay(day)}
                selectDay={selectDay}
              />
              {selectDay.length === 2 &&
                countDaysBetween(selectDay[0], selectDay[1]) > 7 && (
                  <small className="text-red-500 text-center flex-1">
                    The maximum number of days you can select is 7.
                  </small>
                )}
              <div className="flex flex-wrap gap-1">
                {/* Break time */}
                <div className="min-w-[15rem] flex-1 flex  justify-center px-3 border rounded-lg bg-neutral-900 border-neutral-700">
                  <div className="w-full flex justify-between items-center gap-5">
                    <div>
                      <span className="block text-xs text-gray-500 dark:text-neutral-400 border-b border-gray-600">
                        Break time
                      </span>
                      <input
                        className="w-full p-0 bg-transparent outline-none border-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
                        type="number"
                        aria-roledescription="Number field"
                        value={breakTime}
                      />
                    </div>
                    <div className="flex justify-end items-center gap-x-1.5">
                      <div
                        onClick={() =>
                          setBreakTime(Math.min(breakTime + 10, 60))
                        }
                        className="p-2 text-white cursor-pointer border hover:bg-gray-600 border-gray-600 rounded-full"
                      >
                        <FaPlus />
                      </div>
                      <div
                        onClick={() =>
                          setBreakTime(Math.max(breakTime - 10, 10))
                        }
                        className="p-2 text-white cursor-pointer border hover:bg-gray-600 border-gray-600 rounded-full"
                      >
                        <FaMinus />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Break time */}

                <div className="min-w-[20rem] flex-auto flex flex-wrap items-center py-3 px-4 justify-end gap-x-2 rounded-lg border border-gray-600 bg-neutral-900">
                  {selectDay.length === 2 && (
                    <div className="flex-1 text-gray-400 text-[0.9rem]">
                      <span>
                        {countDaysBetween(selectDay[0], selectDay[1])} days
                        selected
                      </span>
                    </div>
                  )}
                  {selectDay.length > 0 && (
                    <span className="md:me-3 text-[0.9rem] text-gray-400 border border-gray-600 p-2 rounded">
                      {selectDay[0]}
                    </span>
                  )}
                  {selectDay.length > 1 && (
                    <>
                      <span className="text-gray-200 font-bold">-</span>
                      <span className="md:me-3 text-[0.9rem] text-gray-400 border border-gray-600 p-2 rounded">
                        {selectDay[1]}
                      </span>
                    </>
                  )}

                  <button
                    onClick={() => setSelectDay([])}
                    type="button"
                    className="px-2 py-[0.5rem] text-[0.9rem] rounded text-gray-200 border border-gray-200 bg-[#255878] hover:bg-[#1a3e54] "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div
              className={` ${
                errorField === errorFieldEnum.TIME && "border border-red-500"
              } rounded-lg`}
            >
              {/* Set time */}
              <TimePicker showTime={showTime} setShowTime={setShowTime} />
              {/* Set time */}
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            {/* Select Movie */}
            <div
              className={`grid gap-2 ${
                errorField === errorFieldEnum.MOVIE && "border border-red-500"
              } rounded p-1`}
            >
              <div className="flex flex-wrap items-end gap-3 justify-between">
                <span className="text-[0.9rem] text-gray-100">
                  Selected {selectedMovies.length} movie
                  {selectedMovies.length > 1 && "s"}
                </span>
                {/* Search */}
                <div className="input_group mobile:w-full">
                  <input
                    type="text"
                    className="input py-[0.9rem]"
                    placeholder="Find movie"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input_attachment ">
                    <SlMagnifier />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {movies.map((movie, movieIndex) => (
                  <div
                    onClick={() => {
                      if (selectedMovies.includes(movie._id)) {
                        setSelectedMovies((prev) =>
                          prev.filter((movieId) => movieId !== movie._id)
                        );
                      } else {
                        setSelectedMovies((prev) => [...prev, movie._id]);
                      }
                    }}
                    className={`grid gap-1 w-[5rem] cursor-pointer ${
                      selectedMovies.includes(movie._id) &&
                      "border border-cyan-400"
                    } rounded`}
                    key={"movie " + movieIndex}
                  >
                    <img
                      className="w-full h-fit rounded"
                      src={movie.poster.url}
                      alt="poster"
                    />
                    <span className="text-[0.6rem] truncate bg-gray-800 text-white p-1 rounded">
                      {movie.title}
                    </span>
                  </div>
                ))}
              </div>
              {totalMovies > limit && (
                <div className="flex justify-between items-center">
                  <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                    Showing {movies.length} of {totalMovies}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPage={Math.ceil(totalMovies / limit)}
                    setCurrentPage={(page) => setPage(page)}
                  />
                </div>
              )}
            </div>
            {/* Select Movie */}

            {/* Select Theater */}
            <div
              className={`grid gap-2 ${
                errorField === errorFieldEnum.THEATER && "border border-red-500"
              } rounded p-1`}
            >
              <div className="flex flex-wrap items-end gap-3 justify-between">
                <span className="text-[0.9rem] text-gray-100">
                  Selected {selectedTheaters.length} theater
                  {selectedTheaters.length > 1 && "s"}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 max-w-[40rem]">
                {Object.entries(theaters.entities).map(
                  ([_, theater], theaterIndex) => (
                    <div
                      className={`${
                        selectedTheaters.includes(theater._id) &&
                        "border border-cyan-400"
                      } rounded  bg-gray-800`}
                      key={"theater " + theaterIndex}
                    >
                      <div
                        key={"theater " + theater.name}
                        className="border border-gray-500 rounded text-white p-2 grid gap-2 justify-between"
                      >
                        <div className="flex gap-1">
                          <CheckBox
                            isChecked={selectedTheaters.includes(theater._id)}
                            handleCheckboxChange={() => {
                              if (selectedTheaters.includes(theater._id)) {
                                setSelectedTheaters((prev) =>
                                  prev.filter(
                                    (theaterId) => theaterId !== theater._id
                                  )
                                );
                              } else {
                                setSelectedTheaters((prev) => [
                                  ...prev,
                                  theater._id,
                                ]);
                              }
                            }}
                          />
                          <span className="text-[0.8rem] ">
                            Room: {theater.name}
                          </span>
                        </div>

                        <div
                          onClick={() => {
                            dispatch(setModalParams({ grid: theater.grid }));
                            dispatch(
                              openModal(modalComponentEnum.THEATER_LAYOUT)
                            );
                          }}
                          className="text-[rgb(168,111,248)] py-1 tooltip_container cursor-pointer border border-gray-400 flex justify-center"
                        >
                          <FaEye />
                          <div className="tooltip tooltip_bottom">Preview</div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          {/* Select Theater */}
        </div>
        <button
          onClick={handleGenerate}
          className=" w-[10rem] border text-white bg-gray-800 hover:bg-gray-900 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2"
        >
          Generate
        </button>
      </div>
      {/* Body */}
    </div>
  );
};

export default AddMultipleShowtime;
