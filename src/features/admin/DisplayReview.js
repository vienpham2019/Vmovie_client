import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import { FaStar, FaTrash } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { convertToAmPm } from "../../util/time";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DisplayReview = ({ review, reviewIndex }) => {
  const [open, setOpen] = useState(false);
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const ref = useRef(null);
  const extand_ref = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    // dispatch(
    //   setModalParams({
    //     message: `Are you sure you want to delete this review ?`,
    //     confirmAction: ConfirmModalActionEnum.DELETE_SHOWTIME_BY_ID,
    //     confirmActionParams: { _id: review._id },
    //   })
    // );
    // dispatch(openModal(modalComponentEnum.CONFIRM));
  };

  const handleEdit = async () => {
    // const { date, theaterDetails, movieDetails } = review;
    // const initEditForm = {
    //   selectedDay: date,
    //   selectedMovie: movieDetails,
    //   selectedMovieId: movieDetails._id,
    //   selectedTheater: theaterDetails.name,
    // };
    // dispatch(initState(initEditForm));
    // navigate(`/admin/review/editShowtime/${review._id}`);
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

  const indexContent = (index) => <div className="text-center">{index}</div>;
  const movieDetailsContent = () => (
    <div className="flex gap-4 items-center justify-between p-2  flex-1">
      <img
        src={review.movieDetails.poster.url}
        alt="poster"
        className="w-[3rem]"
      />
      <div className="flex flex-col gap-1">
        <span className="w-[10rem]">{review.movieDetails.title}</span>
        <div className="flex gap-2">
          <span
            className={`text-[0.8rem] ${
              review.movieDetails.isPublished
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {review.movieDetails.isPublished ? "Public" : "Draft"}
          </span>
          <span className="text-gray-500">-</span>
          <span className="text-[0.8rem] text-gray-400">
            {review.movieDetails.runtime}
          </span>
        </div>
      </div>

      <IoIosArrowDown className="mobile:block hidden" />
    </div>
  );

  const authorDetailsContent = () => (
    <div className="flex flex-col p-2 flex-1 text-gray-300 text-[0.9rem]">
      <span>{review.authorName}</span>
      {review.authorCop && <span>{review.authorCop}</span>}
      <span>{review.date}</span>
    </div>
  );

  const ratingContent = () => (
    <div className="flex p-2 flex-1 text-gray-300 text-[0.9rem]">
      {Array.from({ length: review.rating }).map((_, i) => (
        <FaStar className="text-yellow-500" key={`rating ${review._id} ${i}`} />
      ))}
    </div>
  );

  const reviewContent = () => (
    <div className="flex flex-col p-2 flex-1 text-gray-300 text-[0.9rem] max-w-[12rem]">
      <p className="line-clamp-3">{review.reviewContent} </p>
      <a href={review.fullReviewLink} target="_blank" className="text-cyan-500">
        Full Review
      </a>
    </div>
  );

  const createdAtContent = (createdAt) => (
    <div className="min-w-[7rem] text-center text-[0.9rem]">
      {createdAt.split("T")[0]}
    </div>
  );
  const updatedAtContent = (updatedAt) => (
    <div className="flex gap-4 items-center justify-center px-2">
      <span className="min-w-[7rem] text-[0.9rem]">
        {updatedAt.split("T")[0]}
      </span>
      <IoIosArrowDown className="laptop:block hidden" />
    </div>
  );
  const actionsContent = () => {
    return (
      <div className="flex gap-4 min-w-[8rem] justify-center">
        <div
          onClick={handleDelete}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(255,99,99,0.2)]"
        >
          <FaTrash className="text-[rgb(250,117,117)]" />
          <div className="tooltip tooltip_bottom">Delete</div>
        </div>
        <div
          onClick={handleEdit}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(91,192,232,0.2)]"
        >
          <FaPencilAlt className="text-[rgb(72,148,180)]" />
          <div className="tooltip tooltip_bottom">Edit</div>
        </div>
      </div>
    );
  };

  let contents = {
    id: indexContent(reviewIndex),
    movieDetails: movieDetailsContent(),
    authorDetails: authorDetailsContent(),
    rating: ratingContent(),
    reviewDetails: reviewContent(),
    createdAt: createdAtContent(review["createdAt"]),
    updatedAt: updatedAtContent(review["updatedAt"]),
    actions: actionsContent(),
  };

  return (
    <>
      <tr ref={ref} onClick={() => isLaptop && setOpen(!open)}>
        {Object.entries(contents).map(([key, productContent], index) => (
          <td
            // key={"content" + product["itemName"] + index}
            key={Math.random()}
            className={`bg-[rgb(36,36,41)] laptop:cursor-pointer ${
              key === "actions" && "laptop:hidden"
            } ${["updatedAt", "createdAt"].includes(key) && "tablet:hidden"} ${
              ["authorDetails", "rating", "reviewDetails"].includes(key) &&
              "mobile:hidden"
            }`}
          >
            {productContent}
          </td>
        ))}
      </tr>
      <tr ref={extand_ref} className={`${(!open || !isLaptop) && "hidden"}`}>
        <td
          colSpan={9}
          className="border border-gray-500 border-t-0 border-l-0 bg-[rgb(36,36,41)]"
        >
          <div className="flex flex-wrap p-2 items-center gap-3">
            <div className="mobile:grid gap-2 flex-1 justify-center hidden">
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Author:</span>
                {contents["authorDetails"]}
              </div>
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Rating:</span>
                {contents["rating"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">reviewDetails:</span>
                {contents["reviewDetails"]}
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

export default DisplayReview;
