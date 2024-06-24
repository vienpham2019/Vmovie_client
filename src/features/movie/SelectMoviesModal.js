import { useState } from "react";

import Pagination from "../../components/Pagination";
import { SlMagnifier } from "react-icons/sl";
import React from "react";
import { useDispatch } from "react-redux";
import {
  closeModal,
  setModalResponse,
} from "../../components/modal/ModalSlice";
import { useGetAllPublicMovieByAdminQuery } from "./movieApiSlice";

const SelectMoviesModal = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const limit = 10;
  const { data, isLoading } = useGetAllPublicMovieByAdminQuery(
    { search, page, limit, sortBy: "updatedAt", sortDir: -1 },
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );

  const handleDisplayMovie = () => {
    const { movies, totalMovies } = data?.metadata;
    if (!movies || totalMovies === 0) return <div>No Public Movie</div>;
    return (
      <div className="flex flex-wrap gap-3">
        {movies.map((movie, movieIndex) => (
          <div
            onClick={() => {
              dispatch(setModalResponse({ selectedMovie: movie }));
              dispatch(closeModal());
            }}
            className="flex flex-col gap-3 text-white bg-gray-800 rounded overflow-hidden cursor-pointer hover:border hover:border-cyan-700"
            key={`Public Movie ${movieIndex}`}
          >
            <div
              className="w-[8rem] h-[10rem] relative flex items-end bg-center bg-contain"
              style={{ backgroundImage: `url(${movie.poster.url})` }}
            >
              <div className="w-full h-[20%] p-2 bg-[rgba(0,0,0,0.8)]">
                <h2 className="text-[0.8rem] truncate">{movie.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) return <div>Loading ...</div>;
  return (
    <div className="flex justify-center bg-gray-800">
      <div className="h-full py-4 grid justify-center gap-3 w-fit p-4 mt-4 rounded-md ">
        <div className="flex flex-wrap items-center gap-3 justify-end px-[1rem]">
          {/* Search */}
          <div className="input_group mobile:w-full">
            <input
              type="text"
              className="input py-[1.4rem]"
              placeholder="Find moive"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="input_attachment ">
              <SlMagnifier />
            </div>
          </div>
        </div>
        {/* Movie List */}
        {handleDisplayMovie()}
        {data?.metadata?.totalMovies > 10 && (
          <div className="flex justify-between items-center">
            <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
              Showing 10 of {data?.metadata?.totalMovies}
            </div>
            <Pagination
              currentPage={page}
              totalPage={Math.ceil(data?.metadata?.totalMovies / 10)}
              setCurrentPage={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMoviesModal;
