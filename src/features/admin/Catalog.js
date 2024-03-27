import { useState } from "react";
import Selection from "../../components/form/Selection";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useGetAllMovieByAdminQuery } from "../movie/movieApiSlice";
import AdminSkeleton from "./AdminSkeleton";
import { HiSelector } from "react-icons/hi";
import { FaEye, FaLock, FaLockOpen, FaStar, FaTrash } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const Catalog = () => {
  const initFilter = {
    value: "Date created",
    validate: "",
    options: ["Date created", "Rating", "Views"],
  };
  const [filter, setFilter] = useState(initFilter);
  const navigate = useNavigate();
  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllMovieByAdminQuery(
    { page: 1, limit: 10 },
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );

  const handleDisplayMovie = () => {
    const duplicatedMovies = Object.entries(movies.entities).flatMap(
      ([_, movie]) => Array.from({ length: 5 }, () => ({ ...movie }))
    );
    const headers = [
      "id",
      "poster",
      "title",
      "rating",
      "views",
      "status",
      "createdAt",
      "updatedAt",
      "actions",
    ];

    return (
      <div className="flex text-gray-300 font-thin justify-center">
        {headers.map((header, index) => (
          <div
            className={`grid gap-1 laptop:cursor-pointer
             ${header === "actions" && "laptop:hidden"} ${
              ["updatedAt", "createdAt"].includes(header) && "tablet:hidden"
            } ${
              ["rating", "views", "status"].includes(header) && "mobile:hidden"
            }`}
            key={header + index}
          >
            <div className={"uppercase p-2 h-[3rem] flex items-center gap-2"}>
              {header === "actions" ? "" : header}{" "}
              {!["id", "actions", "status", "poster"].includes(header) && (
                <HiSelector className="cursor-pointer" />
              )}
            </div>
            <div>
              {Object.entries(duplicatedMovies).map(
                ([_, movie], movieIndex) => {
                  let content;
                  switch (header) {
                    case "id":
                      content = <span>{movieIndex}</span>;
                      break;
                    case "poster":
                      content = (
                        <img
                          className="max-w-[3.4rem]"
                          src={movie["poster"].url}
                          alt={movie["title"]}
                        />
                      );
                      break;
                    case "title":
                      content = (
                        <div className="flex gap-4 items-center justify-between">
                          <span className="min-w-[15rem] mobile:min-w-[6rem]">
                            {movie["title"]}
                          </span>
                          <IoIosArrowDown className="mobile:block hidden" />
                        </div>
                      );
                      break;
                    case "rating":
                      content = (
                        <div className="flex items-center gap-1 min-w-[3rem]">
                          <FaStar className="text-red-500" />
                          <span>{movie["ratingScores"]}</span>
                        </div>
                      );
                      break;
                    case "views":
                      content = (
                        <span className="min-w-[3rem]">{movie["reviews"]}</span>
                      );
                      break;
                    case "status":
                      if (movie["isPublished"]) {
                        content = (
                          <div className="flex gap-4 items-center justify-between">
                            <span className="text-[rgb(103,243,103)]">
                              Public
                            </span>
                            <IoIosArrowDown className="tablet:block hidden" />
                          </div>
                        );
                      } else {
                        content = (
                          <div className="flex gap-4 items-center justify-between">
                            <span className="text-[rgb(254,102,102)]">
                              Draft
                            </span>
                            <IoIosArrowDown className="tablet:block hidden" />
                          </div>
                        );
                      }
                      break;
                    case "actions":
                      content = (
                        <div className="flex gap-4 min-w-[15rem]">
                          {movie["isPublished"] ? (
                            <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(250,139,117,0.2)]">
                              <FaLock className="text-[rgb(250,139,117)]" />
                              <div class="tooltip">Draft</div>
                            </div>
                          ) : (
                            <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(87,213,123,0.2)]">
                              <FaLockOpen className="text-[rgb(87,213,123)]" />
                              <div class="tooltip">Public</div>
                            </div>
                          )}
                          <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(168,111,248,0.2)]">
                            <FaEye className="text-[rgb(168,111,248)]" />
                            <div class="tooltip">Preview</div>
                          </div>
                          <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(135,189,255,0.4)]">
                            <RiEdit2Fill className="text-[rgb(135,189,255)]" />
                            <div class="tooltip">Edit</div>
                          </div>
                          <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(255,99,99,0.2)]">
                            <FaTrash className="text-[rgb(250,117,117)]" />
                            <div class="tooltip">Delete</div>
                          </div>
                        </div>
                      );
                      break;
                    case "createdAt":
                      content = (
                        <span className="min-w-[7rem]">
                          {movie["createdAt"].split("T")[0]}
                        </span>
                      );
                      break;
                    case "updatedAt":
                      content = (
                        <div className="flex gap-4 items-center justify-between">
                          <span className="min-w-[7rem]">
                            {movie["updatedAt"].split("T")[0]}
                          </span>
                          <IoIosArrowDown className="laptop:block hidden" />
                        </div>
                      );
                      break;
                  }
                  return (
                    <div
                      key={header + index + movieIndex}
                      className={`flex justify-center items-center h-[6rem] bg-[rgb(34,34,39)] px-4 my-2`}
                    >
                      {content}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="p-[1rem]">
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Catalog</h2>
            <span className="text-gray-500 text-[0.9rem]">14,452 Total</span>
          </div>
          <div className="flex flex-wrap gap-[1rem] items-center">
            <div className="w-[10rem]">
              <Selection
                formData={filter}
                handleOnChange={(value) =>
                  setFilter((prev) => ({ ...prev, value }))
                }
              />
            </div>
            <div className="input_group">
              <input type="text" className="input" placeholder="Find moive" />
              <div className="input_attachment">
                <SlMagnifier />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="h-full py-4">
        <div className="flex justify-end px-[1rem]">
          <button
            className="btn-blue flex gap-1 items-center px-5"
            onClick={() => navigate("addMovie")}
          >
            <MdAdd />
            Add Movie
          </button>
        </div>
        {/* Movie List */}
        {handleDisplayMovie()}
      </div>
    </div>
  );
};

export default Catalog;
