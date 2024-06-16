const MonthEnum = Object.freeze({
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
});

const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Returns a number from 0 to 11 representing the month (0 for January, 1 for February, ..., 11 for December)
  const currentYear = currentDate.getFullYear();
  return { year: currentYear, month: currentMonth };
};

const getLastMonth = ({ currentYear, currentMonth }) => {
  // If current month is January, subtract 1 from the year
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  // If current month is January, set previous month to December, otherwise subtract 1 from the current month
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  return { year: prevYear, month: prevMonth };
};

const getLastNumberOfDaysInLastMonth = ({
  currentYear,
  currentMonth,
  numOfDay,
}) => {
  // Note: month is zero-based (0 for January, 1 for February, etc.)
  const { year, month } = getLastMonth({ currentYear, currentMonth });
  // Find out the number of days in the specified month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate an array of all days in the specified month
  const daysArray = [];
  for (let day = daysInMonth - numOfDay; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    daysArray.push(
      formatDate({ date, formatType: DateFormatTypeEnum.MM_DD_YYYY })
    );
  }

  return daysArray;
};

const getNextMonth = ({ currentYear, currentMonth }) => {
  // If current month is December, add 1 to the year
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  // If current month is December, set next month to January, otherwise add 1 to the current month
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  return { year: nextYear, month: nextMonth };
};

const getFirstNumberOfDaysInNextMonth = ({
  currentYear,
  currentMonth,
  numOfDay,
}) => {
  // Generate an array of all days in the specified month
  const { year, month } = getNextMonth({ currentYear, currentMonth });
  const daysArray = [];
  for (let day = 1; day <= numOfDay; day++) {
    const date = new Date(year, month, day);

    daysArray.push(
      formatDate({ date, formatType: DateFormatTypeEnum.MM_DD_YYYY })
    );
  }

  return daysArray;
};

const getShortWeekDay = ({ year, month, day }) => {
  const date = new Date(year, month, day);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
  });
};

const getAllDaysInMonth = ({ year, month }) => {
  // Note: month is zero-based (0 for January, 1 for February, etc.)

  // Find out the number of days in the specified month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekDay = getShortWeekDay({ month, year, day: 1 });
  // Generate an array of all days in the specified month
  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    daysArray.push(
      formatDate({ date, formatType: DateFormatTypeEnum.MM_DD_YYYY })
    );
  }

  const numOfDayOfWeek = 7;
  const numOfRow = 6;
  const numOfDayLastMonth = WeekdaysEnum[startWeekDay.toLocaleUpperCase()] - 1;
  const numOfDayNextMonth =
    numOfDayOfWeek * numOfRow - (numOfDayLastMonth + daysArray.length + 1);
  return [
    ...getLastNumberOfDaysInLastMonth({
      currentMonth: month,
      currentYear: year,
      numOfDay: numOfDayLastMonth,
    }),
    ...daysArray,
    ...getFirstNumberOfDaysInNextMonth({
      currentMonth: month,
      currentYear: year,
      numOfDay: numOfDayNextMonth,
    }),
  ];
};

const WeekdaysEnum = Object.freeze({
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
});

const DateFormatTypeEnum = Object.freeze({
  MM_DD_YYYY: "MM/DD/YYYY",
  DD_MM_YYYY: "DD/MM/YYYY",
  YYYY_MM_DD: "YYYY/MM/DD",
  VERBOSE: "Verbose",
  SHORT: "Short",
});

const formatDate = ({ date, formatType }) => {
  switch (formatType) {
    case DateFormatTypeEnum.MM_DD_YYYY:
      return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    case DateFormatTypeEnum.DD_MM_YYYY:
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    case DateFormatTypeEnum.YYYY_MM_DD:
      return `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

    case DateFormatTypeEnum.VERBOSE:
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString(undefined, options);

    case DateFormatTypeEnum.SHORT:
      return `${(date.getMonth() + 1).toString()}/${date
        .getDate()
        .toString()}/${date.getFullYear()}`;

    default:
      throw new Error("Unsupported format type");
  }
};

const isDateBetween = ({ dateToCheck, startDate, endDate }) => {
  const date = new Date(dateToCheck);
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure start date is before or equal to end date
  if (start > end) {
    throw new Error("Start date must be before or equal to end date.");
  }

  // Check if the date is between the start and end dates
  return date >= start && date <= end;
};

const isBeforeDate = (dateToCheck, referenceDate) => {
  const date = new Date(dateToCheck);
  const reference = new Date(referenceDate);

  return date < reference;
};

const isAfterDate = (dateToCheck, referenceDate) => {
  const date = new Date(dateToCheck);
  const reference = new Date(referenceDate);

  return date > reference;
};

const getLastDayOfMonth = ({ year, month }) => {
  // Create a date object for the first day of the next month
  const nextMonth = new Date(year, month, 1);
  // Subtract one day to get the last day of the input month
  nextMonth.setDate(nextMonth.getDate() - 1);
  return nextMonth.getDate();
};

module.exports = {
  MonthEnum,
  WeekdaysEnum,
  DateFormatTypeEnum,
  getCurrentMonth,
  getLastMonth,
  getNextMonth,
  getAllDaysInMonth,
  formatDate,
  isDateBetween,
  isBeforeDate,
  isAfterDate,
  getLastDayOfMonth,
};
