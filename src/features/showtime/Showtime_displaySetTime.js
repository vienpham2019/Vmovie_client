import { useEffect, useState } from "react";
import { useGetAllTheaterByAdminQuery } from "../theater/theaterApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { initState, setKey } from "./showtimeSlice";
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
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import TimePicker from "../../components/TimePicker";

const Showtime_displaySetTime = () => {
  const dispatch = useDispatch();
  const {
    selectedTheater,
    showTimeList,
    selectedMovie,
    selectedDay,
    countShowTime,
  } = useSelector((state) => state.showtime);
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
  }, [theaters, dispatch]);

  const setSelectedTheater = (value) => {
    dispatch(setKey({ key: "selectedTheater", value }));
  };

  const handleSaveTime = async () => {
    if (!selectedMovie?.runtime) {
      return;
    }
    if (!selectedDay) {
      dispatch(
        setMessage({
          message: "Please Select Day",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }
    const { startTime, endTime } = showTime;
    if (startTime > endTime) {
      dispatch(
        setMessage({
          message: "End time needs to be after the start time.",
          messageType: notificationMessageEnum.WARNING,
        })
      );
      return;
    }
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
            startTime,
            endTime,
            checkTime: s_startTime,
          }) ||
          isTimeBetween({
            startTime,
            endTime,
            checkTime: s_endTime,
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
    const updateShowTimeList = showTimeList.slice();
    updateShowTimeList.push(res.data.metadata);
    let updateCountShowtime = JSON.parse(JSON.stringify(countShowTime));
    let newCountShowtime = { startTime, endTime, theaterName: selectedTheater };
    if (updateCountShowtime[newShowtime.date]) {
      updateCountShowtime[newShowtime.date].times.push(newCountShowtime);
      updateCountShowtime[newShowtime.date].count++;
    } else {
      updateCountShowtime[newShowtime.date] = {
        times: [newCountShowtime],
        count: 1,
      };
    }

    dispatch(
      initState({
        showTimeList: updateShowTimeList,
        countShowTime: updateCountShowtime,
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
      <div className="flex flex-wrap flex-col gap-2">
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
          <button
            onClick={() => {
              Object.entries(theaters.entities).forEach(([_, theater]) => {
                if (theater.name === selectedTheater) {
                  dispatch(setModalParams({ grid: theater.grid }));
                  dispatch(openModal(modalComponentEnum.THEATER_LAYOUT));
                  return;
                }
              });
            }}
            className="p-2 border border-gray-600 text-gray-200 rounded hover:bg-gray-700 text-[0.8rem]"
          >
            View room layout
          </button>
        </div>
        <TimePicker
          showTime={showTime}
          setShowTime={setShowTime}
          handleSaveTime={handleSaveTime}
        />
      </div>
    </div>
  );
};

export default Showtime_displaySetTime;
