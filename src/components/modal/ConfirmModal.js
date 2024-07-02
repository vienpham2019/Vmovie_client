import { useDispatch, useSelector } from "react-redux";
import { closeModal, setModalResponse } from "./ModalSlice";

const ConfirmModalActionEnum = Object.freeze({
  DELETE_ALL_OPTION_TYPE: "DELETE ALL OPTION TYPE",
  DELETE_MOVIE_BY_ID: "DELETE MOVIE BY ID",
  DELETE_PRODUCT_BY_ID: "DELETE PRODUCT BY ID",
  DELETE_THEATER_BY_ID: "DELETE THEATER BY ID",
  DELETE_SHOWTIME_BY_ID: "DELETE SHOWTIME BY ID",
  DELETE_REVIEW_BY_ID: "DELETE REVIEW BY ID",
});

const ConfirmModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const { message, confirmAction } = modalParams;
  const dispatch = useDispatch();

  const handleConfirmAction = (isConfirm) => {
    if (isConfirm) {
      dispatch(setModalResponse({ isConfirm, confirmAction }));
    }
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-3 bg-[#2b2b31] p-[1rem] text-gray-200 max-w-[18rem]">
      <p>{message}</p>
      <div className="flex gap-2">
        <button
          className="border border-gray-400 hover:bg-cyan-800 flex-1 py-1"
          onClick={() => handleConfirmAction(false)}
        >
          No
        </button>
        <button
          className="border border-gray-400 hover:bg-cyan-800 flex-1 py-1"
          onClick={() => handleConfirmAction(true)}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
export { ConfirmModalActionEnum };
export default ConfirmModal;
