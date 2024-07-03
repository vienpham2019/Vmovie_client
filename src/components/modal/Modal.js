import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getModalComponent } from "./ModalSlice";

const Modal = () => {
  const { modalContentTitle } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  return (
    <div
      className="z-50 absolute w-screen h-full bg-[rgba(0,0,0,0.8)] cursor-pointer"
      onClick={(e) => {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
          dispatch(closeModal());
        }
      }}
    >
      <div className=" w-screen h-screen fixed flex justify-center items-center">
        <div className="rounded-sm cursor-default" ref={contentRef}>
          <div className="overflow-auto">
            {getModalComponent(modalContentTitle)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
