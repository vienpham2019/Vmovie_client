import { useSelector } from "react-redux";
import { RxCross2, RxInfoCircled } from "react-icons/rx";
import {
  PiWarningOctagonLight,
  PiWarningLight,
  PiCheckCircleLight,
} from "react-icons/pi";

const NotificationMessage = () => {
  const { message, messageType } = useSelector(
    (state) => state.notificationMessage
  );
  let primary_color, secondary_color, icon;
  if (messageType === "Error") {
    primary_color = "bg-red-500";
    secondary_color = "bg-red-300";
    icon = <PiWarningOctagonLight />;
  } else if (messageType === "Success") {
    primary_color = "bg-green-500";
    secondary_color = "bg-green-300";
    icon = <PiCheckCircleLight />;
  } else if (messageType === "Info") {
    primary_color = "bg-blue-500";
    secondary_color = "bg-blue-300";
    icon = <RxInfoCircled />;
  } else if (messageType === "Warning") {
    primary_color = "bg-yellow-500";
    secondary_color = "bg-yellow-300";
    icon = <PiWarningLight />;
  }
  return (
    <>
      {message && (
        <div className="absolute left-1/2 top-[1rem] transform -translate-x-1/2">
          <div
            className={`relative w-[20rem] rounded-lg ${secondary_color} text-black overflow-hidden`}
          >
            <div className="py-[1rem] px-[0.5rem] text-sm flex gap-[0.5rem]">
              <RxCross2
                className={`absolute p-[0.1rem] right-2 top-2 cursor-pointer text-lg bg-white rounded-full`}
              />

              <div
                className={`text-[1.7rem] w-[2rem] h-[2rem] flex justify-center items-center rounded-lg  ${secondary_color}`}
              >
                {icon}
              </div>
              <div className="grid gap-1">
                <h3 className="text-[1rem]">{messageType}</h3>
                <span className="text-[0.8rem]">{message}</span>
              </div>
            </div>

            <div
              className={`absolute w-full h-[0.5rem] ${primary_color} bottom-0 rounded-e-full`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
