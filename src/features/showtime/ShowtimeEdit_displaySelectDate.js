import React, { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import Calendar from "../../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { setKey } from "./showtimeSlice";

const ShowtimeEdit_displaySelectDate = () => {
  const { selectDay } = useSelector((state) => state.showtime);
  const dispatch = useDispatch();
  const onSelectDate = (day) => {
    dispatch(setKey({ key: "selectDay", value: day }));
  };
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
              type="string"
              value={selectDay}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
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

export default ShowtimeEdit_displaySelectDate;
