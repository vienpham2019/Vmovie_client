import { FaClock } from "react-icons/fa6";

const TimePicker = ({
  showTime = {
    startTime: "06:00",
    endTime: "23:00",
  },
  setShowTime,
  handleSaveTime,
}) => {
  return (
    <div>
      <div className="z-10 bg-white rounded-lg shadow w-auto dark:bg-gray-700 p-3">
        <div className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-2">
          <div>
            <label
              htmlFor="start-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <FaClock className="text-gray-400 " />
              </div>
              <input
                type="time"
                id="start-time"
                onChange={(e) => {
                  setShowTime((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }));
                }}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value={showTime.startTime}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="end-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <FaClock className="text-gray-400" />
              </div>
              <input
                type="time"
                id="end-time"
                onChange={(e) => {
                  setShowTime((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }));
                }}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value={showTime.endTime}
                required
              />
            </div>
          </div>
        </div>
        {handleSaveTime && (
          <button
            type="button"
            className="text-blue-500 text-sm hover:text-blue-200 p-0"
            onClick={handleSaveTime}
          >
            Save time
          </button>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
