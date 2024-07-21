import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import { FaStar, FaTrash } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { useDeleteReviewMutation } from "../review/reviewSliceApi";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useNavigate } from "react-router-dom";

const DisplayReview = ({ review, reviewIndex, openExtend, setOpenExtend }) => {
  const { modalResponse } = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const dispatch = useDispatch();
  const [deleteReview] = useDeleteReviewMutation();

  useEffect(() => {
    const handleModalResponse = async () => {
      if (modalResponse?.isConfirm) {
        if (
          modalResponse.confirmAction.action ===
            ConfirmModalActionEnum.DELETE_REVIEW_BY_ID &&
          modalResponse.confirmAction.reviewId === review._id
        ) {
          const res = await deleteReview(review._id);
          if (res?.data?.message) {
            dispatch(
              setMessage({
                message: res.data.message,
                messageType: notificationMessageEnum.SUCCESS,
              })
            );
          } else {
            dispatch(
              setMessage({
                message: res.error.data.message,
                messageType: notificationMessageEnum.ERROR,
              })
            );
          }
          dispatch(clearModalResponse());
        }
      }
    };

    handleModalResponse();
  }, [modalResponse, review._id, dispatch, deleteReview]);

  const handleDelete = async () => {
    dispatch(
      setModalParams({
        message: `Are you sure you want to delete this review ?`,
        confirmAction: {
          action: ConfirmModalActionEnum.DELETE_REVIEW_BY_ID,
          reviewId: review._id,
        },
      })
    );
    dispatch(openModal(modalComponentEnum.CONFIRM));
  };

  const handleEdit = async () => {
    navigate(`/admin/review/editReview/${review._id}`);
  };

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
    <div className="flex flex-col p-2 flex-1 text-[0.9rem]">
      <span className="font-bold max-w-[8rem]">{review.authorName}</span>
      {review.authorCop && (
        <span className="max-w-[8rem] text-[0.8rem] text-gray-400">
          {review.authorCop}
        </span>
      )}
      <span className="text-[0.8rem] text-gray-400 font-bold">
        {review.date}
      </span>
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
      <a
        href={review.fullReviewLink}
        rel="noreferrer"
        target="_blank"
        className="text-cyan-500"
      >
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
      <tr
        onClick={() =>
          isLaptop &&
          setOpenExtend(() => {
            if (openExtend && openExtend === reviewIndex) {
              return null;
            } else {
              return reviewIndex;
            }
          })
        }
      >
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
      <tr
        className={`${
          (!(openExtend === reviewIndex) || !isLaptop) && "hidden"
        }`}
      >
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
