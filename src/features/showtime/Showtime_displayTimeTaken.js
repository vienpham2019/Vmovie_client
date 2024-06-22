import { useEffect, useState } from "react";
import {
  convertMinutesToHoursAndMinutesString,
  convertToAmPm,
} from "../../util/time";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useDispatch, useSelector } from "react-redux";
import { initState } from "./showtimeSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteShowtimeMutation } from "./showtimeApiSlice";

const Showtime_displayTimeTaken = () => {
  const dispatch = useDispatch();
  const { showTimeList, selectedDay, countShowTime } = useSelector(
    (state) => state.showtime
  );
  const [sortShowtimeList, setSortShowtimeList] = useState([]);
  const [deleteShowtime] = useDeleteShowtimeMutation();
  useEffect(() => {
    if (showTimeList) {
      const sortSetShowtimeList = showTimeList.slice().sort((a, b) => {
        return (
          +a.startTime.split(":").join("") - +b.startTime.split(":").join("")
        );
      });
      setSortShowtimeList(sortSetShowtimeList);
    }
  }, [showTimeList]);

  const handleDeleteShowtime = async ({ _id, startTime }) => {
    const res = await deleteShowtime({ _id });
    dispatch(
      setMessage({
        message: res.data.message,
        messageType: notificationMessageEnum.SUCCESS,
      })
    );
    let updateCountShowtime = JSON.parse(JSON.stringify(countShowTime));
    updateCountShowtime[selectedDay].times = updateCountShowtime[
      selectedDay
    ].times.filter((time) => time.startTime !== startTime);
    updateCountShowtime[selectedDay].count -= 1;
    if (updateCountShowtime[selectedDay].count === 0) {
      delete updateCountShowtime[selectedDay];
    }

    const updateState = {
      showTimeList: showTimeList
        .slice()
        .filter((showtime) => showtime._id !== _id),
      countShowTime: updateCountShowtime,
    };
    dispatch(initState(updateState));
  };

  return (
    <div className="p-2 flex flex-col  items-center gap-3 border border-neutral-700 rounded w-[20rem] flex-auto mobile:w-[16rem] max-h-[18rem] overflow-y-scroll">
      {sortShowtimeList.map(({ _id, movie, startTime, endTime }, index) => {
        const { hours, minutes } = convertMinutesToHoursAndMinutesString(
          movie.duration
        );
        return (
          <div
            className="flex w-full items-center shadow-lg drop-shadow-[0_35px_35px_rgba(25,225,225,0.25)]"
            key={"time line " + index}
          >
            {/* <!-- Left Content --> */}
            <div className="h-[110px] flex flex-col justify-between w-[4.5rem]">
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
            <div className="flex gap-2 items-center flex-1">
              <div className="w-[3rem] h-full">
                <img className="w-full" src={movie.posterUrl} alt="poster" />
              </div>

              <div className="flex-1 pt-0.5 pb-8 flex flex-col gap-1">
                <h3 className="flex gap-x-1.5 font-semibold text-white text-[0.8rem]">
                  {movie.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-400">
                  {hours}h {minutes}min
                </p>
                <div
                  className="flex gap-3 mt-3"
                  onClick={() => handleDeleteShowtime({ _id, startTime })}
                >
                  <FaRegTrashAlt className="text-red-500 cursor-pointer" />
                </div>
              </div>
            </div>
            {/* <!-- End Right Content --> */}
          </div>
        );
      })}
      {showTimeList.length === 0 && (
        <div className="text-gray-600 justify-center flex p-2">
          <span>No Show time</span>
        </div>
      )}
    </div>
  );
};

export default Showtime_displayTimeTaken;
