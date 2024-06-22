import { IoCalendar } from "react-icons/io5";
import Calendar from "../../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { setKey } from "./showtimeSlice";
import { useCountShowtimeDayByMovieIdQuery } from "./showtimeApiSlice";
import { useEffect } from "react";
import { convertToAmPm } from "../../util/time";

const Showtime_displaySelectDate = () => {
  const { selectedDay, selectedMovie, countShowTime } = useSelector(
    (state) => state.showtime
  );
  const dispatch = useDispatch();
  const { data: { metadata: countShowtime } = [] } =
    useCountShowtimeDayByMovieIdQuery(
      { movie: selectedMovie },
      {
        skip: !selectedMovie, // Skip the query if the conditions are not met
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  useEffect(() => {
    if (countShowtime) {
      const updateCountShowtimeNote = {};
      countShowtime.forEach((count) => {
        updateCountShowtimeNote[count.date] = {
          times: count.times,
          count: count.count,
        };
      });
      dispatch(
        setKey({
          key: "countShowTime",
          value: updateCountShowtimeNote,
        })
      );
    }
  }, [dispatch, countShowtime]);

  const onSelectDate = (day) => {
    dispatch(setKey({ key: "selectedDay", value: day }));
  };

  const displayNotification = (notification, day) => {
    return (
      <div>
        {notification?.times.length > 0 && (
          <table className="hidden absolute top-0 left-[2rem] z-10 table-fixed group-hover:block bg-white text-black p-2">
            <thead className="border">
              <tr>
                <th className="border">StartTime</th>
                <th className="border">EndTime</th>
                <th className="border">TheaterName</th>
              </tr>
            </thead>
            <tbody className="border">
              {notification?.times.map((time, index) => (
                <tr
                  key={`notifications ${day} ${index} `}
                  className="text-nowrap"
                >
                  <td className="border px-2">
                    {convertToAmPm(time.startTime)}
                  </td>
                  <td className="border px-2">{convertToAmPm(time.endTime)}</td>
                  <td className="border px-2">{time.theaterName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

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
              value={selectedDay}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div className="">
          <Calendar
            onSelectDate={onSelectDate}
            selectDay={selectedDay || ""}
            notifications={countShowTime}
            displayNotification={displayNotification}
          />
        </div>
      </div>
    </div>
  );
};

export default Showtime_displaySelectDate;
