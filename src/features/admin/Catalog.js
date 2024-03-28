import { useState } from "react";
import Selection from "../../components/form/Selection";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useGetAllMovieByAdminQuery } from "../movie/movieApiSlice";
import AdminSkeleton from "./AdminSkeleton";
import { HiSelector } from "react-icons/hi";
import CatalogMovie from "./CatalogMovie";

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
            key={header}
          >
            <div
              className={"uppercase p-2 h-[3rem] flex items-center gap-2"}
              key={header + "attach"}
            >
              {header === "actions" ? "" : header}{" "}
              {!["id", "actions", "status", "poster"].includes(header) && (
                <HiSelector className="cursor-pointer" />
              )}
            </div>
            {Object.entries(duplicatedMovies).map(([_, movie], movieIndex) => (
              <CatalogMovie
                key={header + movie["title"] + movieIndex + Math.random()}
                movie={movie}
                movieIndex={movieIndex}
                header={header}
                index={index}
              />
            ))}
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
            <button
              className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-2"
              onClick={() => navigate("addMovie")}
            >
              <MdAdd />
              Add Movie
            </button>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="h-full py-4">
        <div className="flex items-center gap-3 justify-end px-[1rem]">
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
        {/* Movie List */}
        {handleDisplayMovie()}
      </div>
    </div>
  );
};

export default Catalog;
