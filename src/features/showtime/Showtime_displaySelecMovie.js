import { useDispatch, useSelector } from "react-redux";
import { convertMinutesToHoursAndMinutesString } from "../../util/time";
import { initState } from "./showtimeSlice";
import PublicMovies from "../movie/PublicMovies";
import { useState } from "react";

const Showtime_displaySelecMovie = () => {
  const dispatch = useDispatch();
  const { selectedMovie } = useSelector((state) => state.showtime);
  const [openSelectMovie, setOpenSelectMovie] = useState(false);
  const { hours, minutes } = convertMinutesToHoursAndMinutesString(
    selectedMovie?.runtime || "0min"
  );

  const setSelecMovie = (movie) => {
    dispatch(
      initState({
        selectedMovie: movie,
        selectedMovieId: movie._id,
      })
    );
  };

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
              setSelecMovie(movie);
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

export default Showtime_displaySelecMovie;