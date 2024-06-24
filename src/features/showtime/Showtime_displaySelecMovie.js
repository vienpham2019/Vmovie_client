import { useDispatch, useSelector } from "react-redux";
import { convertMinutesToHoursAndMinutesString } from "../../util/time";

import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";
import { useEffect } from "react";
import { setKey } from "./showtimeSlice";

const Showtime_displaySelecMovie = () => {
  const dispatch = useDispatch();
  const { modalResponse } = useSelector((state) => state.modal);
  const { selectedMovie } = useSelector((state) => state.showtime);
  const { hours, minutes } = convertMinutesToHoursAndMinutesString(
    selectedMovie?.runtime || "0min"
  );

  useEffect(() => {
    if (modalResponse?.selectedMovie) {
      dispatch(
        setKey({ key: "selectedMovie", value: modalResponse.selectedMovie })
      );
      dispatch(clearModalResponse());
    }
  }, [modalResponse, dispatch]);

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
            <span className="text-wrap max-w-[10rem]">
              {selectedMovie.title}
            </span>
            <span className="text-gray-400">
              Duration: {hours}h {minutes}min
            </span>
          </div>
        </div>
      )}
      <button
        className="text-white p-3 border border-white w-[15rem]"
        onClick={() => dispatch(openModal(modalComponentEnum.SELECT_MOVIE))}
      >
        Select Movie
      </button>
    </div>
  );
};

export default Showtime_displaySelecMovie;
