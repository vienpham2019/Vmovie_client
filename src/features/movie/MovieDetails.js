import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "./movieApiSlice";
import { TbAwardFilled } from "react-icons/tb";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { data: { metadata: movie } = {}, isLoading } = useGetMovieByIdQuery(
    { movieId },
    {
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );
  //   useEffect(() => {
  //     const getColor = async () => {
  //       if (!movie?.thumbnail?.url) return;
  //       const palette = await Vibrant.from(movie.thumbnail.url).getPalette();
  //       // Get the dominant color from the palette
  //       const mainColors = Object.values(palette)
  //         .filter((color) => color !== null)
  //         .sort((a, b) => b.population - a.population)
  //         .slice(0, 2)
  //         .map((color) => color.getHex());
  //       console.log(palette.getHex());
  //     };

  //     getColor();
  //   }, [movie]);
  if (isLoading || !movie) return <div>Loading</div>;
  return (
    <div className="w-screen bg-black h-screen flex justify-center overflow-x-hidden font-sans">
      <div className={`w-[80rem] h-[40rem] py-3 relative grid gap-4`}>
        <div className="relative flex justify-end">
          <div
            className="relative w-[50%] h-[40rem] bg-cover bg-center bg-no-repeat tablet:hidden"
            style={{ backgroundImage: `url(${movie.thumbnail.url})` }}
          >
            <div className="h-[40rem] w-[10rem] absolute top-0 bg-gradient-to-r from-black to-transparent"></div>
            <div className="h-[40rem] w-[4rem] absolute top-0 right-0 bg-gradient-to-l from-black to-transparent laptop:hidden"></div>
            <div className="h-[4rem] w-full absolute -bottom-1 bg-gradient-to-t from-black to-transparent"></div>
            <div className="h-[2rem] w-full absolute top-0 bg-gradient-to-t from-transparent to-black"></div>
            <div className="w-full h-full absolute top-0 bg-[rgba(0,0,0,0.5)]"></div>
          </div>
        </div>

        <div className="absolute bottom-0 tablet:top-[10%] w-full flex flex-wrap gap-[2rem] justify-center px-3">
          <div className="relative">
            <img
              className="max-w-[20rem] mobile:max-w-[18rem] rounded-lg shadow-[20px_20px_20px_-20px_rgba(255,255,255,0.5)]"
              src={movie.poster.url}
              alt="poster"
            />

            <div className="absolute top-0 w-full h-full flex justify-center items-center">
              <div className="bg-[rgba(0,0,0,0.6)] p-2 rounded-full flex justify-center items-center border-gray-500 border-[0.2rem] cursor-pointer">
                <lord-icon
                  src="https://cdn.lordicon.com/becebamh.json"
                  trigger="hover"
                  colors="primary:#e4e4e4"
                  style={{
                    width: "4rem",
                    height: "4rem",
                  }}
                ></lord-icon>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[1.2rem] p-1 text-white tablet:items-center px-2">
            <h1 className="text-[3rem] tablet:text-[2rem] font-bold">
              {movie.title}
            </h1>

            <div className="flex gap-1 flex-col text-gray-400 px-2">
              <div className="flex gap-4 text-[0.9rem]">
                <div className="flex gap-2 items-center justify-center">
                  <span>{movie.dateRelease.split("-")[0]}</span>
                  <div className="w-[3px] h-[3px] bg-gray-400 rounded-full"></div>
                  <span>{movie.runtime}</span>
                </div>
                <span className="border border-white text-white rounded-md px-2">
                  {movie.rating}
                </span>
              </div>
              <div className="text-[0.9rem] flex flex-wrap gap-2">
                {movie.genre.map((g, i) => (
                  <div className="flex gap-2 items-center" key={g}>
                    <span className="text-gray-200 font-bold underline">
                      {g}
                    </span>
                    <div
                      className={`w-[3px] h-[3px] bg-gray-400 rounded-full ${
                        movie.genre.length - 1 === i && "hidden"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-white">
                <div className="flex items-center gap-1">
                  <img
                    className="h-[0.7rem]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                    alt="moviedb_logo"
                  />
                  <span className="text-[0.7rem]">78%</span>
                </div>
                <div className="flex items-center gap-1 ">
                  <img
                    className="h-[0.7rem]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/2019px-Rotten_Tomatoes.svg.png"
                    alt="moviedb_logo"
                  />
                  <span className="text-[0.7rem]">78%</span>
                </div>
                <div className="flex items-center gap-1 ">
                  <img
                    className="h-[0.7rem]"
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                    alt="moviedb_logo"
                  />
                  <span className="text-[0.7rem]">78%</span>
                </div>
              </div>
            </div>
            <div className="text-[0.8rem] text-gray-300">
              <p className="max-w-[30rem] mobile:w-[18rem]">
                {movie.movieDetail}
              </p>
            </div>
            {movie.awards !== "N/A" && (
              <div className="flex">
                <div className="text-gray-200 border border-yellow-200 flex items-center gap-2 p-2 rounded-lg bg-[rgb(43,71,90)]">
                  <TbAwardFilled />
                  {movie.awards}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 text-[0.8rem]">
              <div className="grid gap-4">
                <div className="grid grid-cols-[5rem_20rem] mobile:grid-cols-[5rem_10rem] gap-4">
                  <div className="text-nowrap text-gray-400 font-bold">
                    Directed By
                  </div>
                  <div>{movie.director.join(",")}</div>
                </div>
                <div className="grid grid-cols-[5rem_20rem] mobile:grid-cols-[5rem_10rem] gap-4">
                  <div className="text-nowrap text-gray-400 font-bold">
                    Written By
                  </div>
                  <div>{movie.writer.join(",")}</div>
                </div>
              </div>
              <div className="grid gap-4 max-w-[30rem]">
                <div className="grid grid-cols-[5rem_20rem] mobile:grid-cols-[5rem_10rem] gap-4">
                  <div className="text-nowrap text-gray-400 font-bold">
                    Studio
                  </div>
                  <div>{movie.studio.join(",")}</div>
                </div>
                <div className="grid grid-cols-[5rem_20rem] mobile:grid-cols-[5rem_10rem] gap-4">
                  <div className="text-nowrap text-gray-400 font-bold">
                    Cast
                  </div>
                  <div>{movie.cast.join(",")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border h-[4rem]"></div>
      </div>
    </div>
  );
};

export default MovieDetails;
