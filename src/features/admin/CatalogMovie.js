import { FaEye, FaLock, FaLockOpen, FaStar, FaTrash } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useDeleteMovieByIdMutation } from "../movie/movieApiSlice";
import { useDispatch } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const indexContent = (index) => <div className="text-center">{index}</div>;
const posterContent = (poster) => (
  <div className="flex justify-center">
    {" "}
    <img className="max-w-[3.4rem]" src={poster.url} alt={poster.url} />
  </div>
);
const titleContent = (title) => (
  <div className="flex gap-4 items-center justify-between p-2  flex-1">
    <span className="w-[15rem] mobile:w-[8rem]">{title}</span>
    <IoIosArrowDown className="mobile:block hidden" />
  </div>
);
const ratingContent = (rating) => (
  <div className="flex justify-center items-center gap-1 min-w-[3rem]">
    <FaStar className="text-red-500" />
    <span>{rating}</span>
  </div>
);
const viewContent = (view) => (
  <div className="min-w-[3rem] text-center">{view}</div>
);
const statusContent = (status) => {
  if (status) {
    return (
      <div className="flex gap-4 items-center justify-center px-2">
        <span className="text-[rgb(103,243,103)]">Public</span>
        <IoIosArrowDown className="tablet:block hidden" />
      </div>
    );
  } else {
    return (
      <div className="flex gap-4 items-center justify-center px-2">
        <span className="text-[rgb(254,102,102)]">Draft</span>
        <IoIosArrowDown className="tablet:block hidden" />
      </div>
    );
  }
};
const actionsContent = ({ movie, handleDelete }) => {
  return (
    <div className="flex gap-4 min-w-[15rem] justify-center">
      {movie["isPublished"] ? (
        <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(250,139,117,0.2)]">
          <FaLock className="text-[rgb(250,139,117)]" />
          <div className="tooltip tooltip_bottom">Draft</div>
        </div>
      ) : (
        <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(87,213,123,0.2)]">
          <FaLockOpen className="text-[rgb(87,213,123)]" />
          <div className="tooltip tooltip_bottom">Public</div>
        </div>
      )}
      <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(168,111,248,0.2)]">
        <FaEye className="text-[rgb(168,111,248)]" />
        <div className="tooltip tooltip_bottom">Preview</div>
      </div>
      <Link
        to={`/admin/catalog/editMovie/${movie._id}`}
        className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(135,189,255,0.4)]"
      >
        <RiEdit2Fill className="text-[rgb(135,189,255)]" />
        <div className="tooltip tooltip_bottom">Edit</div>
      </Link>
      <div
        onClick={handleDelete}
        className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(255,99,99,0.2)]"
      >
        <FaTrash className="text-[rgb(250,117,117)]" />
        <div className="tooltip tooltip_bottom">Delete</div>
      </div>
    </div>
  );
};
const createdAtContent = (createdAt) => (
  <div className="min-w-[7rem] text-center">{createdAt.split("T")[0]}</div>
);
const updatedAtContent = (updatedAt) => (
  <div className="flex gap-4 items-center justify-center px-2">
    <span className="min-w-[7rem]">{updatedAt.split("T")[0]}</span>
    <IoIosArrowDown className="laptop:block hidden" />
  </div>
);

const CatalogMovie = ({ movie, movieIndex }) => {
  const [open, setOpen] = useState(false);
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const ref = useRef(null);
  const extand_ref = useRef(null);
  const [deleteMovie, { isLoading }] = useDeleteMovieByIdMutation();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const res = await deleteMovie({ movieId: movie._id });
    if (!res?.error) {
      dispatch(
        setMessage({
          message: "Delete movie success",
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        extand_ref.current &&
        !extand_ref.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setOpen]);
  let contents = {
    id: indexContent(movieIndex),
    poster: posterContent(movie["poster"]),
    title: titleContent(movie["title"]),
    rating: ratingContent(movie["ratingScores"]),
    views: viewContent(movie["reviews"]),
    status: statusContent(movie["isPublished"]),
    createdAt: createdAtContent(movie["createdAt"]),
    updatedAt: updatedAtContent(movie["updatedAt"]),
    actions: actionsContent({ movie, handleDelete }),
  };

  if (isLoading)
    return (
      <tr
        className={`flex justify-center items-center animate-pulse h-[6rem] bg-[rgb(36,36,41)] px-4`}
      >
        <td className="grid gap-1 w-full">
          <div className="h-[1rem] bg-[rgb(52,52,59)] w-full rounded-md"></div>
          <div className="h-[1rem] bg-[rgb(52,52,59)] w-[50%] rounded-md"></div>
        </td>
        <td className="h-full w-[3.2rem] bg-[rgb(52,52,59)]"></td>
      </tr>
    );
  return (
    <>
      <tr ref={ref} onClick={() => isLaptop && setOpen(!open)}>
        {Object.entries(contents).map(([key, movieContent], index) => (
          <td
            key={"content" + movie["title"] + index}
            className={`bg-[rgb(36,36,41)] laptop:cursor-pointer ${
              key === "actions" && "laptop:hidden"
            } ${["updatedAt", "createdAt"].includes(key) && "tablet:hidden"} ${
              ["rating", "views", "status"].includes(key) && "mobile:hidden"
            }`}
          >
            {movieContent}
          </td>
        ))}
      </tr>
      <tr ref={extand_ref} className={`${(!open || !isLaptop) && "hidden"}`}>
        <td
          colSpan={9}
          className="border border-gray-500 border-t-0 border-l-0 bg-[rgb(36,36,41)]"
        >
          <div className="flex flex-wrap p-2 items-center gap-3">
            <div className="hidden gap-1 flex-1 hide_svg justify-center mobile:flex">
              <span className="font-thin">Status:</span>
              {contents["status"]}
            </div>
            <div className="mobile:grid gap-2 flex-1 justify-center hidden">
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Reviews:</span>
                {contents["views"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">Rating:</span>
                {contents["rating"]}
              </div>
            </div>
            <div className="hidden gap-2 flex-1 justify-center tablet:grid">
              <div className="flex gap-1 hide_svg">
                <span className="font-thin">Updated:</span>
                {contents["updatedAt"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">Created:</span>
                {contents["createdAt"]}
              </div>
            </div>
            <div className="hidden flex-1 laptop:block">
              {contents["actions"]}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CatalogMovie;
