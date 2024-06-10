import { IoCalendar } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Calendar from "../../components/Calendar";
import { useState } from "react";

const ShowtimeForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const onSelectDate = (selectedDates) => {
    if (selectedDates.length !== 2) {
      setStartDate("");
      setEndDate("");
      return;
    }
    const [start_date, end_date] = selectedDates;
    if (start_date) {
      setStartDate(start_date);
    }
    if (end_date) {
      setEndDate(end_date);
    }
  };

  const displaySelectDate = () => {
    return (
      <div>
        <span className="text-white">Select date</span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 text-[1.3rem]">
                <IoCalendar />
              </div>
              <input
                name="start"
                type="text"
                readOnly
                value={startDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 text-[1.3rem]">
                <IoCalendar />
              </div>
              <input
                name="end"
                type="text"
                readOnly
                value={endDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
              />
            </div>
          </div>
          <div className="">
            <Calendar onSelectDate={onSelectDate} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-auto gap-4 w-[50rem] mobile:min-w-[15rem]">
          {/* Selecdate */}
          {displaySelectDate()}
        </div>
      </div>
      {/* Body */}
      <div className="flex gap-[1rem]">
        <button className="btn-blue w-[15rem]" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ShowtimeForm;
