import { useDispatch, useSelector } from "react-redux";
import Showtime_displaySelectDate from "./Showtime_displaySelectDate";
import Showtime_displaySelecMovie from "./Showtime_displaySelecMovie";
import Showtime_displaySetTime from "./Showtime_displaySetTime";
import Showtime_displayTimeTaken from "./Showtime_displayTimeTaken";
import { useGetAllShowtimeTimelineQuery } from "./showtimeApiSlice";
import { useEffect } from "react";
import { setKey } from "./showtimeSlice";

const ShowtimeEdit = () => {
  const dispatch = useDispatch();
  const { selectedDay, selectedTheater } = useSelector(
    (state) => state.showtime
  );
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

  useEffect(() => {
    if (showtimesData) {
      dispatch(setKey({ key: "showTimeList", value: showtimesData }));
    }
  }, [showtimesData, dispatch]);

  return (
    <div className="flex flex-col gap-[1rem] p-4 border items-center border-gray-500 rounded bg-[#1f1f1f]">
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="flex flex-col gap-4">
          {/* Selecdate */}
          <Showtime_displaySelectDate />
          <div className="flex flex-wrap gap-3">
            {/* SelectMovies*/}
            <Showtime_displaySelecMovie />

            {/* Select Time */}
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 my-3">
                <div className="flex flex-wrap gap-2">
                  <Showtime_displaySetTime />
                  <Showtime_displayTimeTaken />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
    </div>
  );
};

export default ShowtimeEdit;
