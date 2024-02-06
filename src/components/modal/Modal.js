import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./ModalSlice";

// Icon
import { RxCross2 } from "react-icons/rx";

const Modal = () => {
  const { modalContent, modalContentTitle } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  return (
    <div
      className="z-50 absolute w-full h-full bg-[rgba(0,0,0,0.3)] cursor-pointer flex justify-center items-center"
      onClick={(e) => {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
          dispatch(closeModal());
        }
      }}
    >
      <div
        className=" p-[1rem] rounded-lg bg-white cursor-default"
        ref={contentRef}
      >
        <div className="flex justify-between">
          <h2 className="text-lg capitalize">
            {modalContentTitle?.toLowerCase().replace(/_/g, " ")}
          </h2>
          <span
            className="cursor-pointer text-lg"
            onClick={() => dispatch(closeModal())}
          >
            <RxCross2 />
          </span>
        </div>
        <hr className="mb-[0.4rem]" />
        <div className="overflow-auto">{modalContent}</div>
      </div>
    </div>
  );
};

export default Modal;
