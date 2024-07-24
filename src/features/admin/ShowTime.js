import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { MdAdd } from "react-icons/md";
import AdminSkeleton from "./AdminSkeleton";
import { useGetAllShowtimeByAdminQuery } from "../showtime/showtimeApiSlice";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";
import DisplayShowtime from "./DisplayShowtime";

const ShowTime = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortDir, setSortDir] = useState(-1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data: { showtime, totalShowtimes } = {}, isLoading } =
    useGetAllShowtimeByAdminQuery(
      { search, page, limit, sortBy, sortDir },
      {
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
        // Set the query key to include the page so it updates when the page changes
        queryKey: ["getAllShowtime", { search, page, sortBy, sortDir }],
      }
    );

  const handleDisplayShowtime = () => {
    if (!showtime) return;
    if (Object.keys(showtime?.entities).length === 0) {
      return (
        <div className="h-[30vh] flex justify-center items-center text-white">
          No Showtime
        </div>
      );
    }

    const duplicatedShowtime = Object.entries(showtime.entities).flatMap(
      ([_, showtime]) => showtime
    );

    const headers = [
      "id",
      "movieDetails",
      "theater",
      "date",
      "time",
      "createdAt",
      "updatedAt",
    ];

    const handleSortClick = (header) => {
      setPage(1);
      setSortDir(() => (header === sortBy ? sortDir * -1 : -1));
      setSortBy(header);
    };

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
                  ["date", "time", "theater"].includes(header) &&
                  "mobile:hidden"
                }`}
                key={Math.random()}
              >
                <div
                  className={`uppercase font-thin p-2 h-[3rem] flex items-center gap-2  ${
                    header === sortBy && "text-cyan-400"
                  }`}
                  // key={header + "attach"}
                >
                  {header === "actions" ? "" : header}{" "}
                  {!["id", "actions", "time"].includes(header) && (
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
          {Object.entries(duplicatedShowtime).map(
            ([_, showtime], showtimeIndex) => (
              <DisplayShowtime
                showtime={showtime}
                showtimeIndex={showtimeIndex + 1 + limit * (page - 1)}
                key={Math.random()}
                className={`h-[6rem]  px-4`}
              />
            )
          )}
        </tbody>
      </table>
    );
  };

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="p-[1rem]">
      {" "}
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Showtime</h2>
          </div>
        </div>
        {/* Body */}
        <div className="flex justify-center">
          <div className="h-full py-4 grid justify-center gap-3 w-fit p-4 mt-4 rounded-md ">
            <div className="flex flex-wrap items-center gap-3 justify-end px-[1rem]">
              {/* Search */}
              <div className="input_group mobile:w-full">
                <input
                  type="text"
                  className="input py-[1.4rem]"
                  placeholder="Find movie"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input_attachment ">
                  <SlMagnifier />
                </div>
              </div>
              {/* Add showtime */}
              <div className="flex flex-wrap gap-[1rem] items-center ">
                <button
                  className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                  onClick={() => navigate("addShowtime")}
                >
                  <MdAdd />
                  Add Showtime
                </button>
              </div>
            </div>
            {/* Theater List */}
            {handleDisplayShowtime()}
            {totalShowtimes > limit && (
              <div className="flex justify-between items-center">
                <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                  Showing {Object.keys(showtime.entities).length} of{" "}
                  {totalShowtimes}
                </div>
                <Pagination
                  currentPage={page}
                  totalPage={Math.ceil(totalShowtimes / 10)}
                  setCurrentPage={(page) => setPage(page)}
                />
              </div>
            )}
          </div>
        </div>
        {/* Body */}
      </div>
    </div>
  );
};

export default ShowTime;
