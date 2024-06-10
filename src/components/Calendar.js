import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  getAllDaysInMonth,
  getCurrentMonth,
  getLastDayOfMonth,
  getLastMonth,
  getNextMonth,
  isBeforeDate,
  isDateBetween,
  MonthEnum,
  WeekdaysEnum,
} from "../util/date";
import { convertTo2DArray } from "../util/array";
import { capitalizeString } from "../util/string";
import OutsideClickDetector from "./OutsideClickDetector";

const Calendar = ({ onSelectDate }) => {
  const [years, setYears] = useState([]);
  const [openCurrentMonthSelect, setOpenCurrentMonthSelect] = useState(false);
  const [openCurrentYearSelect, setOpenCurrentYearSelect] = useState(false);
  const [openNextMonthSelect, setOpenNextMonthSelect] = useState(false);
  const [openNextYearSelect, setOpenNextYearSelect] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [daysOfCurrentMonth, setDayOfCurrentMonth] = useState([]);
  const [nextMonth, setNextMonth] = useState(null);
  const [nextYear, setNextYear] = useState(null);
  const [daysOfNextMonth, setDayOfNextMonth] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);

  useEffect(() => {
    const { year, month } = getCurrentMonth();
    setYears(Array.from({ length: 4 }, (_, index) => year + index));
    updateDateBaseOnCurrentMonth({ year, month });
  }, []);

  const resetOpenSelect = () => {
    if (openCurrentMonthSelect) setOpenCurrentMonthSelect(false);
    if (openCurrentYearSelect) setOpenCurrentYearSelect(false);
    if (openNextMonthSelect) setOpenNextMonthSelect(false);
    if (openNextYearSelect) setOpenNextYearSelect(false);
  };

  const updateDateBaseOnCurrentMonth = ({ month, year }) => {
    const { year: updateNextYear, month: updateNextMonth } = getNextMonth({
      currentYear: year,
      currentMonth: month,
    });
    const updateDayOfCurrentMonth = getDayOfMonth({
      year: year,
      month: month,
    });
    const updateDayOfNextMonth = getDayOfMonth({
      year: updateNextYear,
      month: updateNextMonth,
    });
    setCurrentMonth(month);
    setCurrentYear(year);
    setDayOfCurrentMonth(updateDayOfCurrentMonth);

    setNextMonth(updateNextMonth);
    setNextYear(updateNextYear);
    setDayOfNextMonth(updateDayOfNextMonth);
    resetOpenSelect();
  };

  const updateDateBaseOnNextMonth = ({ month, year }) => {
    const { year: updateCurrentYear, month: updateCurrentMonth } = getLastMonth(
      {
        currentYear: year,
        currentMonth: month,
      }
    );
    const updateDayOfCurrentMonth = getDayOfMonth({
      year: updateCurrentYear,
      month: updateCurrentMonth,
    });
    const updateDayOfNextMonth = getDayOfMonth({
      year,
      month,
    });

    setCurrentMonth(updateCurrentMonth);
    setCurrentYear(updateCurrentYear);
    setDayOfCurrentMonth(updateDayOfCurrentMonth);

    setNextMonth(month);
    setNextYear(year);
    setDayOfNextMonth(updateDayOfNextMonth);
    resetOpenSelect();
  };

  const getDayOfMonth = ({ month, year }) => {
    const daysArray = getAllDaysInMonth({
      year,
      month,
    });
    return convertTo2DArray({ arr: daysArray, columns: 7 });
  };

  const handleDisplayWeekDay = ({ isCurrent }) => {
    return (
      <div className="flex pb-1.5">
        {Object.keys(WeekdaysEnum).map((weekday, index) => {
          return (
            <span
              key={`${isCurrent ? "Current" : "Next"} weekday ${index}`}
              className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500"
            >
              {capitalizeString(weekday)}
            </span>
          );
        })}
      </div>
    );
  };

  const handleSelectDay = (day) => {
    let updateSelectedDate = [];
    if (selectedDay.length === 2) {
      updateSelectedDate = [day];
    } else {
      if (isBeforeDate(day, selectedDay[0])) {
        updateSelectedDate = [day, ...selectedDay];
      } else {
        updateSelectedDate = [...selectedDay, day];
      }
    }
    setSelectedDay(updateSelectedDate);
    onSelectDate(updateSelectedDate);
  };

  const handleDisplayDay = ({ isCurrent, days }) => {
    const dayClass = "m-px size-10 flex justify-center items-center text-sm";
    const dayActiceClass =
      "text-neutral-200 hover:border-neutral-500 hover:border rounded-full cursor-pointer";
    const dayDisableClass = "text-gray-700";
    const selectedDayClass = "bg-cyan-700";
    const month = isCurrent ? currentMonth : nextMonth;
    return days.map((row, rowIndex) => {
      return (
        <div
          className="flex"
          key={`${isCurrent ? "Current" : "Next"} row ${rowIndex}`}
        >
          {row.map((day, dayIndex) => {
            const [numYear, numMonth, numDay] = day.split("/");
            const isTheSameMonth = +numMonth - 1 === month;
            const isDayInBetweenSelected =
              selectedDay.length === 2 &&
              isTheSameMonth &&
              isDateBetween({
                dateToCheck: day,
                startDate: selectedDay[0],
                endDate: selectedDay[1],
              });
            const isFirstSelected = selectedDay[0] === day;
            const isLastSelected = selectedDay[1] === day;
            const isStartOfTheMonth =
              selectedDay.length === 2 &&
              +numDay === 1 &&
              isTheSameMonth &&
              +selectedDay[0].split("/")[1] - 1 !== month;

            const isEndOfTheMonth =
              selectedDay.length === 2 &&
              +numDay ===
                getLastDayOfMonth({ year: numYear, month: numMonth }) &&
              isTheSameMonth &&
              +selectedDay[0].split("/")[0] - 1 !== month;

            return (
              <div
                className={`
                ${isFirstSelected && "rounded-s-full"} 
                ${isLastSelected && "rounded-e-full"}  
                ${
                  isDayInBetweenSelected &&
                  "first:rounded-s-full last:rounded-e-full"
                }
               
                ${
                  isDayInBetweenSelected &&
                  !isStartOfTheMonth &&
                  !isEndOfTheMonth &&
                  "bg-neutral-800"
                }
                ${
                  isStartOfTheMonth &&
                  isDayInBetweenSelected &&
                  "bg-gradient-to-l from-neutral-800"
                }
                ${
                  isEndOfTheMonth &&
                  isDayInBetweenSelected &&
                  "bg-gradient-to-r from-neutral-800"
                }
                `}
                key={`${
                  isCurrent ? "Current" : "Next"
                } day ${rowIndex} ${dayIndex}`}
              >
                <div
                  onClick={() => handleSelectDay(day)}
                  className={`${dayClass} ${
                    isTheSameMonth ? dayActiceClass : dayDisableClass
                  } ${
                    selectedDay.includes(day) &&
                    isTheSameMonth &&
                    selectedDayClass
                  }`}
                >
                  {numDay}
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  if (
    currentMonth === null ||
    currentYear === null ||
    nextMonth === null ||
    nextYear === null
  )
    return <div>Loading ...</div>;

  const handleGoToNextOneMonth = () => {
    const { year, month } = getNextMonth({ currentMonth, currentYear });
    updateDateBaseOnCurrentMonth({ year, month });
  };

  const handleGoToBackOneMonth = () => {
    const { year, month } = getLastMonth({ currentMonth, currentYear });
    updateDateBaseOnCurrentMonth({ year, month });
  };

  return (
    // <!-- Datepicker -->
    <div className="w-auto md:w-[40.4rem] flex flex-col border shadow-lg rounded-xl overflow-hidden bg-neutral-900 border-neutral-700">
      <div className="p-3 flex flex-wrap gap-8 justify-center">
        {/* <!-- Calendar --> */}
        <div className=" w-[20rem]">
          {/* <!-- Months --> */}
          <div className="flex items-center justify-center gap-3 mx-1.5 pb-3">
            {/* <!-- Prev Button --> */}
            <div>
              <button
                onClick={handleGoToBackOneMonth}
                type="button"
                className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <IoIosArrowBack />
              </button>
            </div>
            {/* <!-- End Prev Button --> */}

            {/* <!-- Month / Year --> */}
            <div className="flex-1 flex justify-center items-center gap-x-2">
              <OutsideClickDetector
                onOutsideClick={() => setOpenCurrentMonthSelect(false)}
              >
                <div className="relative text-gray-200">
                  <span
                    className="cursor-pointer"
                    onClick={() => setOpenCurrentMonthSelect(true)}
                  >
                    {capitalizeString(Object.keys(MonthEnum)[currentMonth])}
                  </span>
                  <div
                    className={`absolute ${
                      openCurrentMonthSelect ? "flex" : "hidden"
                    } flex-col py-2 bg-white rounded text-gray-800`}
                  >
                    {Object.entries(MonthEnum).map(([month, monthIndex]) => {
                      return (
                        <div
                          onClick={() =>
                            updateDateBaseOnCurrentMonth({
                              month: MonthEnum[month],
                              year: currentYear,
                            })
                          }
                          key={`Current month ${month}`}
                          className={`hover:bg-gray-300 px-3 cursor-pointer ${
                            monthIndex === currentMonth && "bg-cyan-400"
                          }`}
                        >
                          {capitalizeString(month)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </OutsideClickDetector>

              <span className="text-gray-800 dark:text-neutral-200">/</span>

              <OutsideClickDetector
                onOutsideClick={() => setOpenCurrentYearSelect(false)}
              >
                <div className="relative text-gray-200">
                  <span
                    className="cursor-pointer"
                    onClick={() => setOpenCurrentYearSelect(true)}
                  >
                    {currentYear}
                  </span>
                  <div
                    className={`absolute ${
                      openCurrentYearSelect ? "flex" : "hidden"
                    } flex-col py-2 bg-white rounded text-gray-800`}
                  >
                    {years.map((year) => {
                      return (
                        <div
                          onClick={() =>
                            updateDateBaseOnCurrentMonth({
                              month: currentMonth,
                              year,
                            })
                          }
                          key={`Current year ${year}`}
                          className={`hover:bg-gray-300 px-3 cursor-pointer ${
                            currentYear === year && "bg-cyan-400"
                          }`}
                        >
                          {year}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </OutsideClickDetector>
            </div>
            {/* <!-- End Month / Year --> */}

            {/* <!-- Next Button --> */}
            <div className="col-span-1 flex justify-end">
              <button
                type="button"
                className="opacity-0 size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <IoIosArrowForward />
              </button>
            </div>
            {/* <!-- End Next Button --> */}
          </div>
          {/* <!-- Months --> */}

          <div className="flex flex-col items-center">
            {/* <!-- Weeks --> */}
            {handleDisplayWeekDay({ isCurrent: true })}
            {/* <!-- Weeks --> */}

            {handleDisplayDay({ isCurrent: true, days: daysOfCurrentMonth })}
          </div>
        </div>
        {/* <!-- End Calendar --> */}

        {/* <!-- Calendar --> */}
        <div className="w-[20rem]">
          {/* <!-- Months --> */}
          <div className="flex items-center justify-center gap-3 mx-1.5 pb-3">
            {/* <!-- Month / Year --> */}
            <div className="flex flex-1 items-center justify-center gap-x-2">
              <OutsideClickDetector
                onOutsideClick={() => setOpenNextMonthSelect(false)}
              >
                <div className="relative text-gray-200">
                  <span
                    className="cursor-pointer"
                    onClick={() => setOpenNextMonthSelect(true)}
                  >
                    {capitalizeString(Object.keys(MonthEnum)[nextMonth])}
                  </span>
                  <div
                    className={`absolute ${
                      openNextMonthSelect ? "flex" : "hidden"
                    } flex-col py-2 bg-white rounded text-gray-800`}
                  >
                    {Object.entries(MonthEnum).map(([month, monthIndex]) => {
                      return (
                        <div
                          onClick={() =>
                            updateDateBaseOnNextMonth({
                              month: MonthEnum[month],
                              year: nextYear,
                            })
                          }
                          key={`Next month ${month}`}
                          className={`hover:bg-gray-300 px-3 cursor-pointer ${
                            monthIndex === nextMonth && "bg-cyan-400"
                          }`}
                        >
                          {capitalizeString(month)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </OutsideClickDetector>

              <span className="text-gray-800 dark:text-neutral-200">/</span>

              <OutsideClickDetector
                onOutsideClick={() => setOpenNextYearSelect(false)}
              >
                <div className="relative text-gray-200">
                  <span
                    className="cursor-pointer"
                    onClick={() => setOpenNextYearSelect(true)}
                  >
                    {nextYear}
                  </span>
                  <div
                    className={`absolute ${
                      openNextYearSelect ? "flex" : "hidden"
                    } flex-col py-2 bg-white rounded text-gray-800`}
                  >
                    {years.map((year) => {
                      return (
                        <div
                          onClick={() =>
                            updateDateBaseOnNextMonth({
                              month: nextMonth,
                              year,
                            })
                          }
                          key={`Next year ${year}`}
                          className={`hover:bg-gray-300 px-3 cursor-pointer ${
                            nextYear === year && "bg-cyan-400"
                          }`}
                        >
                          {year}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </OutsideClickDetector>
            </div>
            {/* <!-- End Month / Year --> */}

            {/* <!-- Next Button --> */}
            <div className="flex ">
              <button
                onClick={handleGoToNextOneMonth}
                type="button"
                className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <IoIosArrowForward />
              </button>
            </div>
            {/* <!-- End Next Button --> */}
          </div>
          {/* <!-- Months --> */}

          <div className="flex flex-col items-center">
            {/* <!-- Weeks --> */}
            {handleDisplayWeekDay({ isCurrent: false })}
            {/* <!-- Weeks --> */}

            {handleDisplayDay({ isCurrent: false, days: daysOfNextMonth })}
          </div>
        </div>
        {/* <!-- End Calendar --> */}
      </div>
    </div>
    // <!-- End Datepicker -->
  );
};

export default Calendar;
