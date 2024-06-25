import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { convertToAmPm } from "../../util/time";
import { FaPencilAlt } from "react-icons/fa";
import { initState } from "../showtime/showtimeSlice";
import { useNavigate } from "react-router-dom";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useDeleteShowtimeMutation } from "../showtime/showtimeApiSlice";

const DisplayShowtime = ({ showtime, showtimeIndex }) => {
  const [open, setOpen] = useState(false);
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const { modalResponse } = useSelector((state) => state.modal);
  const [deleteShowtime] = useDeleteShowtimeMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleModalResponse = async () => {
      if (modalResponse?.isConfirm) {
        if (
          modalResponse.confirmAction.action ===
            ConfirmModalActionEnum.DELETE_SHOWTIME_BY_ID &&
          modalResponse.confirmAction.showtimeId === showtime._id
        ) {
          const res = await deleteShowtime({ _id: showtime._id });
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
  }, [modalResponse, showtime._id, dispatch]);

  const handleDelete = async () => {
    dispatch(
      setModalParams({
        message: `Are you sure you want to delete this showtime ?`,
        confirmAction: {
          action: ConfirmModalActionEnum.DELETE_SHOWTIME_BY_ID,
          showtimeId: showtime._id,
        },
      })
    );
    dispatch(openModal(modalComponentEnum.CONFIRM));
  };

  const handleEdit = async () => {
    const { date, theaterDetails, movieDetails } = showtime;
    const initEditForm = {
      selectedDay: date,
      selectedMovie: movieDetails,
      selectedMovieId: movieDetails._id,
      selectedTheater: theaterDetails.name,
    };
    dispatch(initState(initEditForm));
    navigate(`/admin/showtime/editShowtime/${showtime._id}`);
  };

  const indexContent = (index) => <div className="text-center">{index}</div>;
  const movieDetailsContent = () => (
    <div className="flex gap-4 items-center justify-between p-2  flex-1">
      <img
        src={showtime.movieDetails.poster.url}
        alt="poster"
        className="w-[3rem]"
      />
      <div className="flex flex-col gap-1">
        <span className="w-[10rem]">{showtime.movieDetails.title}</span>
        <div className="flex gap-2">
          <span
            className={`text-[0.8rem] ${
              showtime.movieDetails.isPublished
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {showtime.movieDetails.isPublished ? "Public" : "Draft"}
          </span>
          <span className="text-gray-500">-</span>
          <span className="text-[0.8rem] text-gray-400">
            {showtime.movieDetails.runtime}
          </span>
        </div>
      </div>

      <IoIosArrowDown className="mobile:block hidden" />
    </div>
  );

  const theaterDetailContent = () => (
    <div className="flex p-2 flex-1 text-gray-300 text-[0.9rem]">
      <span>Room: {showtime.theaterDetails.name}</span>
    </div>
  );

  const dateContent = () => (
    <div className="flex p-2 flex-1 text-gray-300 text-[0.9rem]">
      <span>{showtime.date}</span>
    </div>
  );

  const timeContent = () => (
    <div className="flex gap-4 items-center p-2 flex-1 text-[0.9rem]">
      <div className="flex flex-col gap-2">
        <span>{convertToAmPm(showtime.startTime)}</span>
        <span>{convertToAmPm(showtime.endTime)}</span>
      </div>

      <IoIosArrowDown className="tablet:block hidden" />
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
    id: indexContent(showtimeIndex),
    movieDetails: movieDetailsContent(),
    theaterDetails: theaterDetailContent(),
    date: dateContent(),
    time: timeContent(),
    createdAt: createdAtContent(showtime["createdAt"]),
    updatedAt: updatedAtContent(showtime["updatedAt"]),
    actions: actionsContent(),
  };

  return (
    <>
      <tr onClick={() => isLaptop && setOpen(!open)}>
        {Object.entries(contents).map(([key, productContent], index) => (
          <td
            // key={"content" + product["itemName"] + index}
            key={Math.random()}
            className={`bg-[rgb(36,36,41)] laptop:cursor-pointer ${
              key === "actions" && "laptop:hidden"
            } ${["updatedAt", "createdAt"].includes(key) && "tablet:hidden"} ${
              ["theaterDetails", "date", "time"].includes(key) &&
              "mobile:hidden"
            }`}
          >
            {productContent}
          </td>
        ))}
      </tr>
      <tr className={`${(!open || !isLaptop) && "hidden"}`}>
        <td
          colSpan={9}
          className="border border-gray-500 border-t-0 border-l-0 bg-[rgb(36,36,41)]"
        >
          <div className="flex flex-wrap p-2 items-center gap-3">
            <div className="mobile:grid gap-2 flex-1 justify-center hidden">
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Theater:</span>
                {contents["theaterDetails"]}
              </div>
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Time:</span>
                {contents["time"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">Date:</span>
                {contents["date"]}
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

export default DisplayShowtime;
