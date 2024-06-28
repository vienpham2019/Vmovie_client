import { SlMagnifier } from "react-icons/sl";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useGetAllMovieByAdminQuery } from "../movie/movieApiSlice";
import AdminSkeleton from "./AdminSkeleton";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import Selection from "../../components/form/Selection";
import DisplayMovie from "./DisplayMovie";

const Catalog = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortDir, setSortDir] = useState(-1);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const limit = 10;
  const [openExtend, setOpenExtend] = useState(null);
  const { data, isLoading } = useGetAllMovieByAdminQuery(
    { search, page, limit, sortBy, sortDir, filter },
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
      // Set the query key to include the page so it updates when the page changes
      queryKey: [
        "getAllMovieByAdmin",
        { search, page, sortBy, sortDir, filter },
      ],
    }
  );

  const handleSortClick = (header) => {
    setPage(1);
    setSortDir(() => (header === sortBy ? sortDir * -1 : -1));
    setSortBy(header);
  };

  const handleDisplayMovie = () => {
    if (Object.keys(data.movies.entities).length === 0) {
      return (
        <div className="h-[30vh] flex justify-center items-center text-white">
          No movie
        </div>
      );
    }

    const duplicatedMovies = Object.entries(data.movies?.entities).flatMap(
      ([_, movie]) => movie
    );

    const headers = [
      "id",
      "poster",
      "title",
      "ratingScores",
      "reviews",
      "status",
      "createdAt",
      "updatedAt",
      "actions",
    ];

    return (
      <table className="table-auto text-gray-200 gap-1 border-separate border-spacing-1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                className={`laptop:cursor-pointer
             ${header === "actions" && "laptop:hidden"} ${
                  ["updatedAt", "createdAt"].includes(header) && "tablet:hidden"
                } ${
                  ["ratingScores", "reviews", "status"].includes(header) &&
                  "mobile:hidden"
                }`}
                key={header}
              >
                <div
                  className={`uppercase font-thin p-2 h-[3rem] flex items-center gap-2  ${
                    header === sortBy && "text-cyan-400"
                  }`}
                  key={header + "attach"}
                >
                  {header === "actions"
                    ? ""
                    : header === "ratingScores"
                    ? "rating"
                    : header}{" "}
                  {!["id", "actions", "status", "poster"].includes(header) && (
                    <div
                      className="cursor-pointer"
                      onClick={() => handleSortClick(header)}
                    >
                      {header === sortBy && sortDir === -1 ? (
                        <FaArrowDownWideShort />
                      ) : header === sortBy && sortDir === 1 ? (
                        <FaArrowUpShortWide />
                      ) : (
                        <LuArrowDownUp />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(duplicatedMovies).map(([_, movie], movieIndex) => (
            <DisplayMovie
              movie={movie}
              openExtend={openExtend}
              setOpenExtend={(index) => setOpenExtend(index)}
              movieIndex={movieIndex + 1 + limit * (page - 1)}
              key={movie["title"] + movieIndex}
              className={`h-[6rem]  px-4`}
            />
          ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="p-[1rem]">
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Catalog</h2>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex justify-center">
        <div className="h-full py-4 grid justify-center gap-3 w-fit p-4 mt-4 rounded-md ">
          <div className="flex flex-wrap items-center gap-3 justify-end px-[1rem]">
            <div className="w-[8rem] mobile:w-full">
              <div className="input_group">
                <Selection
                  formData={{
                    value: filter,
                    options: ["All", "Draft", "Published"],
                  }}
                  handleOnChange={(value) => setFilter(value)}
                />
                <div className={`input_title`}>
                  <span>Filter By Status</span>
                </div>
              </div>
            </div>
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
            {/* Add movie */}
            <div className="flex flex-wrap gap-[1rem] items-center ">
              <button
                className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                onClick={() => navigate("addMovie")}
              >
                <MdAdd />
                Add Movie
              </button>
            </div>
          </div>
          {/* Movie List */}
          {handleDisplayMovie()}
          {data.totalMovies > 10 && (
            <div className="flex justify-between items-center">
              <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                Showing 10 of {data.totalMovies}
              </div>
              <Pagination
                currentPage={page}
                totalPage={Math.ceil(data.totalMovies / 10)}
                setCurrentPage={(page) => setPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
