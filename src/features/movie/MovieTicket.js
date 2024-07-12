import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "./movieApiSlice";

import MovieReservedSeating from "./MovieReservedSeating";
import { useEffect, useState } from "react";
import MovieFoodAndDrink from "./MovieFoodAndDrink";
import MovieCheckOut from "./MovieCheckOut";
import { useDispatch } from "react-redux";
import { setStateSelectedMovie } from "./movieSlice";

const menuSchema = Object.freeze({
  RESERVED_SEATING: "Reserved seating",
  FOOD_AND_DRINKS: "Food & Drinks",
  CHECK_OUT: "Check out",
  COMPLETED: "Completed",
});

const MovieTicket = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const menu = Object.entries(menuSchema).map(([_, value]) => value);
  const [selectedMenu, setSelectedMenu] = useState(menuSchema.RESERVED_SEATING);
  const { data: { metadata: { movie } = {} } = {}, isLoading } =
    useGetMovieByIdQuery(
      { movieId },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  useEffect(() => {
    if (movie) {
      const { _id, poster, rating, title } = movie;
      dispatch(setStateSelectedMovie({ _id, poster, rating, title }));
    }
  }, [dispatch, movie]);

  if (isLoading || !movie) return <div>Loading</div>;
  return (
    <div
      className="overflow-x-hidden font-sans bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${movie.thumbnail.url})` }}
    >
      <div className="bg-[rgba(0,0,0,0.8)] w-full flex justify-center">
        <div className="w-[80rem] py-3 grid gap-4 mt-[6rem] p-2 text-white">
          <div className="flex gap-4 flex-wrap">
            <div className="mobile:flex mobile:flex-auto justify-center">
              <img
                className="max-w-[10rem] mobile:max-w-[18rem] rounded-lg shadow-[20px_20px_20px_-20px_rgba(255,255,255,0.5)]"
                src={movie.poster.url}
                alt="poster"
              />
            </div>
            <div className="flex-1 grid gap-2 items-end">
              <div>
                {" "}
                <h1 className="text-[3rem] uppercase font-mono font-bold">
                  {movie.title}
                </h1>
                <span className="text-[0.9rem] text-gray-200">
                  {movie.rating}
                </span>
                <div className="py-2 rounded flex items-center h-[4rem] bg-[#172532] mobile:text-[0.7rem] text-[0.9rem] uppercase px-2 font-thin">
                  {menu.map((m, i) => (
                    <span
                      key={"movie ticket menu" + i}
                      className={`py-1 px-2 ${
                        selectedMenu === m && "border-b-2 border-red-700"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {selectedMenu === menuSchema.RESERVED_SEATING && (
              <MovieReservedSeating setSelectedMenu={setSelectedMenu} />
            )}
            {selectedMenu === menuSchema.FOOD_AND_DRINKS && (
              <MovieFoodAndDrink />
            )}
            {selectedMenu === menuSchema.CHECK_OUT && <MovieCheckOut />}
          </div>
        </div>
      </div>
    </div>
  );
};

export { menuSchema };

export default MovieTicket;
