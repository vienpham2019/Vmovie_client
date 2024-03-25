import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getModalComponent } from "./ModalSlice";

// Icon
import { RxCross2 } from "react-icons/rx";

const Modal = () => {
  const { modalContentTitle } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  return (
    <div
      className="z-50 absolute w-full h-full bg-[rgba(0,0,0,0.8)] cursor-pointer flex justify-center items-center"
      onClick={(e) => {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
          dispatch(closeModal());
        }
      }}
    >
      <div className="rounded-sm cursor-default bg-white" ref={contentRef}>
        <div className="overflow-auto">
          {getModalComponent(modalContentTitle)}
        </div>
      </div>
    </div>
  );
};

export default Modal;
