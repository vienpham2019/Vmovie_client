import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./ModalSlice";
import { useDeleteAllProductOptionByTypeMutation } from "../../features/product/productApiSlice";

const ConfirmModalActionEnum = Object.freeze({
  DELETE_ALL_OPTION_TYPE: "DELETE ALL OPTION TYPE",
});

const ConfirmModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const { message, confirmAction, confirmActionParams } = modalParams;
  const dispatch = useDispatch();
  const [deleteAllOptionByType] = useDeleteAllProductOptionByTypeMutation();

  const handleConfirmAction = async () => {
    switch (confirmAction) {
      case ConfirmModalActionEnum.DELETE_ALL_OPTION_TYPE:
        await deleteAllOptionByType(confirmActionParams);
        break;

      default:
        break;
    }
    dispatch(closeModal());
  };
  return (
    <div className="flex flex-col gap-3 bg-[#2b2b31] p-[1rem] text-gray-200 max-w-[18rem]">
      <p>{message}</p>
      <div className="flex gap-2">
        <button
          className="border border-gray-400 hover:bg-cyan-800 flex-1 py-1"
          onClick={() => dispatch(closeModal())}
        >
          No
        </button>
        <button
          className="border border-gray-400 hover:bg-cyan-800 flex-1 py-1"
          onClick={handleConfirmAction}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
export { ConfirmModalActionEnum };
export default ConfirmModal;
