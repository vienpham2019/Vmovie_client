import { useSelector } from "react-redux";
import { FiAlertTriangle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
const NotificationMessage = () => {
  const { message, messageType } = useSelector(
    (state) => state.notificationMessage
  );
  return (
    <>
      {message && (
        <div className="absolute left-1/2 top-[1rem] transform -translate-x-1/2">
          <div className="relative w-[20rem] rounded-lg bg-red-300 text-black overflow-hidden">
            <div className="py-[1rem] px-[0.5rem] text-sm flex gap-[0.5rem]">
              <RxCross2 className="absolute p-[0.1rem] right-2 top-2 cursor-pointer text-lg bg-gray-200 text-red-500 rounded-full" />
              <div className="text-lg w-[2rem] h-[2rem] flex justify-center items-center rounded-lg bg-red-300">
                <FiAlertTriangle />
              </div>
              <div className="grid gap-1">
                <h3 className="text-[1rem]">Error</h3>
                <span className="text-[0.8rem]">
                  Password and confirm password not match!
                </span>
              </div>
            </div>

            <div className="absolute w-full h-[0.5rem] bg-red-500 bottom-0 rounded-e-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
