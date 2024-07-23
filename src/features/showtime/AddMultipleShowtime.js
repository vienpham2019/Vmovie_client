import { useState } from "react";
import Calendar from "../../components/Calendar";
import { isAfterDate } from "../../util/date";

const AddMultipleShowtime = () => {
  const [selectDay, setSelectDay] = useState([]);
  const handleSetSelectDay = (day) => {
    let updateDate = [];
    if (selectDay.length === 0) {
      updateDate = [day];
    } else {
      if (isAfterDate(day, selectDay[0])) {
        updateDate = [selectDay[0], day];
      } else {
        updateDate = [day, selectDay[0]];
      }
    }
    setSelectDay(updateDate);
  };
  return (
    <div className="flex flex-col gap-[1rem] p-4 border items-center border-gray-500 rounded bg-[#1f1f1f]">
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="flex flex-col gap-4">
          {/* Date picker */}
          <div className="flex flex-col gap-1">
            <Calendar
              type={"List"}
              onSelectDate={(day) => handleSetSelectDay(day)}
              selectDay={selectDay}
            />
            <div className="flex items-center py-3 px-4 justify-end gap-x-2 rounded-lg border border-gray-600 bg-neutral-900">
              {selectDay.length > 0 && (
                <span className="md:me-3 text-[0.9rem] text-gray-400 border border-gray-600 p-2 rounded">
                  {selectDay[0]}
                </span>
              )}
              {selectDay.length > 1 && (
                <>
                  <span className="text-gray-200 font-bold">-</span>
                  <span className="md:me-3 text-[0.9rem] text-gray-400 border border-gray-600 p-2 rounded">
                    {selectDay[1]}
                  </span>
                </>
              )}

              <button
                onClick={() => setSelectDay([])}
                type="button"
                className="px-2 py-[0.5rem] text-[0.9rem] rounded text-gray-400 border border-gray-500 bg-[#033656] hover:bg-[#1a3e54] "
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            className={`border text-white bg-gray-800 hover:bg-gray-900 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2`}
          >
            Generate
          </button>
          {/* Date picker */}
        </div>
      </div>
      {/* Body */}
    </div>
  );
};

export default AddMultipleShowtime;
