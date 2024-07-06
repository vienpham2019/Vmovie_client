import { FaEye, FaLock, FaLockOpen, FaStar, FaTrash } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import {
  useDeleteMovieByIdMutation,
  useDraftMovieMutation,
  usePublishedMovieMutation,
} from "../movie/movieApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";

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
const viewContent = (IMDBScore, RottenTomatoesScore, TMDBScore) => (
  <div className="min-w-[4rem] text-white text-center flex flex-col px-2 gap-1">
    <div className="flex items-center gap-1">
      <img
        className="h-[0.7rem]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
        alt="moviedb_logo"
      />
      <span className="text-[0.7rem]">{IMDBScore}</span>
    </div>
    <div className="flex items-center gap-1 ">
      <img
        className="h-[0.7rem]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/2019px-Rotten_Tomatoes.svg.png"
        alt="moviedb_logo"
      />
      <span className="text-[0.7rem]">{RottenTomatoesScore}</span>
    </div>
    <div className="flex items-center gap-1">
      <img
        className="h-[0.7rem]"
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="moviedb_logo"
      />
      <span className="text-[0.7rem]">{TMDBScore}</span>
    </div>
  </div>
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
const actionsContent = ({
  movie,
  handleDelete,
  handlePublished,
  handleDraft,
}) => {
  return (
    <div className="flex gap-4 min-w-[15rem] justify-center">
      {movie["isPublished"] ? (
        <div
          onClick={handleDraft}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(250,139,117,0.2)]"
        >
          <FaLock className="text-[rgb(250,139,117)]" />
          <div className="tooltip tooltip_bottom">Draft</div>
        </div>
      ) : (
        <div
          onClick={handlePublished}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(87,213,123,0.2)]"
        >
          <FaLockOpen className="text-[rgb(87,213,123)]" />
          <div className="tooltip tooltip_bottom">Public</div>
        </div>
      )}
      <Link
        to={`/movies/${movie._id}`}
        className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(168,111,248,0.2)]"
      >
        <FaEye className="text-[rgb(168,111,248)]" />
        <div className="tooltip tooltip_bottom">Preview</div>
      </Link>
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

const DisplayMovie = ({ movie, movieIndex, openExtend, setOpenExtend }) => {
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const { modalResponse } = useSelector((state) => state.modal);
  const [deleteMovie, { isLoading: deleteLoading }] =
    useDeleteMovieByIdMutation();
  const [publishedMovie, { isLoading: publishedLoading }] =
    usePublishedMovieMutation();
  const [draftMovie, { isLoading: draftLoading }] = useDraftMovieMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleModalResponse = async () => {
      if (modalResponse?.isConfirm) {
        if (
          modalResponse.confirmAction.action ===
            ConfirmModalActionEnum.DELETE_MOVIE_BY_ID &&
          modalResponse.confirmAction.movieId === movie._id
        ) {
          const res = await deleteMovie({ movieId: movie._id });
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
  }, [modalResponse, movie._id, dispatch, deleteMovie]);

  const handleDelete = async () => {
    dispatch(
      setModalParams({
        message: `Are you sure you want to delete this movie ?`,
        confirmAction: {
          action: ConfirmModalActionEnum.DELETE_MOVIE_BY_ID,
          movieId: movie._id,
        },
      })
    );
    dispatch(openModal(modalComponentEnum.CONFIRM));
  };

  const handlePublished = async () => {
    const res = await publishedMovie({ movieId: movie._id });
    if (!res?.error) {
      dispatch(
        setMessage({
          message: "Published movie success",
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
    }
  };

  const handleDraft = async () => {
    const res = await draftMovie({ movieId: movie._id });
    if (!res?.error) {
      dispatch(
        setMessage({
          message: "Draft movie success",
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
    }
  };

  let contents = {
    id: indexContent(movieIndex),
    poster: posterContent(movie["poster"]),
    title: titleContent(movie["title"]),
    rating: ratingContent(movie["ratingScores"]),
    views: viewContent(
      movie["IMDBScore"],
      movie["RottenTomatoesScore"],
      movie["TMDBScore"]
    ),
    status: statusContent(movie["isPublished"]),
    createdAt: createdAtContent(movie["createdAt"]),
    updatedAt: updatedAtContent(movie["updatedAt"]),
    actions: actionsContent({
      movie,
      handleDelete,
      handlePublished,
      handleDraft,
    }),
  };

  if (deleteLoading || publishedLoading || draftLoading)
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
      <tr
        onClick={() =>
          isLaptop &&
          setOpenExtend(() => {
            if (openExtend && openExtend === movieIndex) {
              return null;
            } else {
              return movieIndex;
            }
          })
        }
      >
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
      <tr
        className={`${(!(openExtend === movieIndex) || !isLaptop) && "hidden"}`}
      >
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

export default DisplayMovie;
