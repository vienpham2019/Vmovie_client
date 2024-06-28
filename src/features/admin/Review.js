import { MdAdd } from "react-icons/md";
import { SlMagnifier } from "react-icons/sl";
import AdminSkeleton from "./AdminSkeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useGetAllReviewByAdminQuery } from "../review/reviewSliceApi";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";
import DisplayReview from "./DisplayReview";

const Review = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortDir, setSortDir] = useState(-1);
  const [search, setSearch] = useState("");
  const limit = 10;
  const [openExtend, setOpenExtend] = useState(null);
  const { data: { reviews, totalReviews } = {}, isLoading } =
    useGetAllReviewByAdminQuery(
      { search, page, limit, sortBy, sortDir },
      {
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
        // Set the query key to include the page so it updates when the page changes
        queryKey: ["getAllReview", { search, page, sortBy, sortDir }],
      }
    );

  const handleDisplayReviews = () => {
    if (!reviews) return;
    if (Object.keys(reviews?.entities).length === 0) {
      return (
        <div className="h-[30vh] flex justify-center items-center text-white">
          No Reviews
        </div>
      );
    }

    const duplicatedReviews = Object.entries(reviews.entities).flatMap(
      ([_, review]) => review
    );

    const headers = [
      "id",
      "movieDetails",
      "authorDetails",
      "rating",
      "reviewDetails",
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
                  ["authorDetails", "rating", "reviewDetails"].includes(
                    header
                  ) && "mobile:hidden"
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
                  {!["id", "actions", "time", "reviewDetails"].includes(
                    header
                  ) && (
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
          {Object.entries(duplicatedReviews).map(([_, review], reviewIndex) => (
            <DisplayReview
              review={review}
              openExtend={openExtend}
              setOpenExtend={(index) => setOpenExtend(index)}
              reviewIndex={reviewIndex + 1 + limit * (page - 1)}
              key={Math.random()}
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
      {" "}
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Review</h2>
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
              {/* Add review */}
              <div className="flex flex-wrap gap-[1rem] items-center ">
                <button
                  className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                  onClick={() => navigate("addReview")}
                >
                  <MdAdd />
                  Add Review
                </button>
              </div>
            </div>
            {/* Review List */}
            {handleDisplayReviews()}
            {totalReviews > limit && (
              <div className="flex justify-between items-center">
                <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                  Showing 10 of {totalReviews}
                </div>
                <Pagination
                  currentPage={page}
                  totalPage={Math.ceil(totalReviews / 10)}
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

export default Review;
