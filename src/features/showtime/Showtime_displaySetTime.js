import { useEffect, useState } from "react";
import { useGetAllTheaterByAdminQuery } from "../theater/theaterApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setKey } from "./showtimeSlice";
import {
  convertMinutesToHoursAndMinutesString,
  hourAndMinToMin,
  isTimeBetween,
  subtractTimes,
} from "../../util/time";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useCreateShowtimeMutation } from "./showtimeApiSlice";
import Selection from "../../components/form/Selection";
import { FaClock } from "react-icons/fa6";

const Showtime_displaySetTime = () => {
  const dispatch = useDispatch();
  const { selectedTheater, showTimeList, selectedMovie, selectedDay } =
    useSelector((state) => state.showtime);
  const [selectTheaterOptions, setSelectheaterOptions] = useState({});
  const [showTime, setShowTime] = useState({
    startTime: "00:00",
    endTime: "00:00",
  });
  const [createShowtime] = useCreateShowtimeMutation();
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
    if (theaters && Object.keys(theaters)?.length) {
      const initSelecTheaters = Object.entries(theaters.entities).map(
        ([_, theater]) => theater.name
      );
      setSelectheaterOptions(initSelecTheaters);
      dispatch(setKey({ key: "selectedTheater", value: initSelecTheaters[0] }));
    }
  }, [theaters]);

  const setSelectedTheater = (value) => {
    dispatch(setKey({ key: "selectedTheater", value }));
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
    const res = await createShowtime(newShowtime);
    dispatch(
      setKey({
        key: "showTimeList",
        value: showTimeList.slice().push(res.data.metadata),
      })
    );
    setShowTime({
      startTime: "00:00",
      endTime: "00:00",
    });
  };

  if (theaterLoading) return <div>Loading...</div>;
  return (
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
  );
};

export default Showtime_displaySetTime;
