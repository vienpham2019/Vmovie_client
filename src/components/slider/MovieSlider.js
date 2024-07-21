import { useDispatch } from "react-redux";
import { useGetAllMoviesInShowtimeQuery } from "../../features/showtime/showtimeApiSlice";
import { convertMinutesToHoursAndMinutesString } from "../../util/time";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../modal/ModalSlice";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";

const MovieSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: { metadata: movies } = [], isLoading } =
    useGetAllMoviesInShowtimeQuery(
      {},
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };
  const handleDisplay = () => {
    return movies.map((movie, index) => (
      <div
        key={"movie slider " + movie.title}
        className={`text-gray-200 px-[4px] flex cursor-pointer group relative`}
      >
        <div className="w-full rounded-md overflow-hidden relative">
          <img src={movie.posterUrl} alt={"slide poster" + index} />
          <div className="w-full h-full absolute top-0 bg-[rgba(0,0,0,0.3)]"></div>
          <div className="absolute text-[5rem] mobile:text-[2rem] mobile:-bottom-[0.6rem] -bottom-[1.2rem] font-bold text-stroke-white">
            {index + 1}
          </div>
          <div className="absolute p-2 bottom-0 translate-y-full w-full h-full flex flex-col justify-between group-hover:flex group-hover:translate-y-0 transform transition duration-500 ease-in-out bg-[rgba(0,0,0,0.6)]">
            <div className="mobile:hidden">
              <span className="p-2 border border-gray-300 rounded-md">
                {movie.rating}
              </span>
              <div className="flex gap-2 items-center pt-2 text-gray-300 text-[0.8rem]">
                <span>{movie.dateRelease}</span>
                <div className="w-[3px] h-[3px] bg-gray-400 rounded-full"></div>
                <span>{movie.runtime}</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                onClick={() => {
                  dispatch(setModalParams({ videoUrl: movie.trailer }));
                  dispatch(openModal(modalComponentEnum.VIDEO));
                }}
                className="bg-[rgba(0,0,0,0.6)] p-2 mobile:border-none mobile:bg-transparent rounded-full flex justify-center items-center border cursor-pointer"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/becebamh.json"
                  trigger="hover"
                  colors="primary:#e4e4e4"
                  style={{
                    width: "2rem",
                    height: "2rem",
                  }}
                ></lord-icon>
              </div>
            </div>
            <div className="flex flex-col">
              <h2
                onClick={() => navigate(`/movies/${movie._id}`)}
                className="text-[1.1rem] mobile:text-[0.7rem] truncate ... hover:text-cyan-400"
              >
                {movie.title}
              </h2>
              <span className="text-[0.8rem] mobile:text-[0.5rem] truncate ... text-gray-400">
                {movie.genre.join(" | ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  if (isLoading || movies.length === 0) return;
  return (
    <div className="w-[75rem] laptop:w-[80vw] mobile:max-w-[15rem]">
      <Slider
        totalAmount={movies.length}
        handleDisplay={handleDisplay}
        responsive={responsive}
      />
    </div>
  );
};

export default MovieSlider;
