import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import {
  notificationMessageEnum,
  resetMessage,
} from "./notificationMessageSlice";
import { useRef, useState } from "react";

const NotificationMessage = () => {
  const dispatch = useDispatch();
  const { message, messageType, delayTime } = useSelector(
    (state) => state.notificationMessage
  );
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  let primary_color, text_color, icon;
  switch (messageType) {
    case notificationMessageEnum.ERROR:
      primary_color = "bg-red-500";
      text_color = "text-[#ba0a00]";
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/ygvjgdmk.json"
          trigger="in"
          delay="10"
          state="in-error"
          colors="primary:#ba0a00"
        ></lord-icon>
      );
      break;
    case notificationMessageEnum.SUCCESS:
      primary_color = "bg-green-500";
      text_color = "text-[#0cb300]";
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/oqdmuxru.json"
          trigger="in"
          delay="10"
          state="in-check"
          colors="primary:#0cb300"
        ></lord-icon>
      );
      break;
    case notificationMessageEnum.INFO:
      primary_color = "bg-blue-500";
      text_color = "text-[#0077b3]";
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/yxczfiyc.json"
          trigger="in"
          delay="10"
          state="in-info"
          colors="primary:#0077b3"
        ></lord-icon>
      );
      break;
    case notificationMessageEnum.WARNING:
      primary_color = "bg-yellow-500";
      text_color = "text-[#9ea300]";
      icon = (
        <lord-icon
          src="https://cdn.lordicon.com/vihyezfv.json"
          trigger="in"
          delay="10"
          state="in-warning"
          colors="primary:#9ea300"
        ></lord-icon>
      );
      break;
    default:
      primary_color = "";
      text_color = "";
      icon = null;
  }

  const handleClose = () => {
    dispatch(resetMessage());
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <>
      {message && (
        <div
          ref={animationRef}
          className="fixed z-[100] left-1/2 top-[1rem] transform -translate-x-1/2 animate__fadeIn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`relative w-[20rem] bg-slate-100 text-black overflow-hidden rounded-sm`}
          >
            <div className="py-[1rem] px-[0.5rem] text-sm flex gap-[0.5rem]">
              <RxCross2
                className={`absolute p-[0.1rem] right-2 top-2 cursor-pointer text-[1.4rem] rounded-full`}
                onClick={handleClose}
              />

              <div
                className={`w-[2rem] h-[2rem] flex justify-center items-center rounded-lg`}
              >
                {icon}
              </div>
              <div className="grid gap-1 border-l border-gray-400 pl-3">
                <h3 className={`text-[1rem] font-bold ${text_color}`}>
                  {messageType}
                </h3>
                <span className="text-[0.8rem] text-gray-800">{message}</span>
              </div>
            </div>

            <div
              key={`${message}${messageType}`}
              className={`absolute w-full h-[0.5rem] ${primary_color} bottom-0 ttl_animate ${
                isPaused ? "animate__animated_paused" : ""
              }`}
              style={{ animationDuration: `${delayTime / 1000}s` }}
              onAnimationEnd={() => handleClose()}
            ></div>
            <div
              className={`absolute w-full h-[0.5rem] ${primary_color} opacity-50 bottom-0`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
