const hourAndMinToMin = (hour, min) => {
  return hour * 60 + min;
};

const convertMinutesToHoursAndMinutesString = (durationStr) => {
  const totalMinutes = +durationStr.replace("min", "");
  return convertMinutesToHoursAndMinutes(totalMinutes);
};

const convertMinutesToHoursAndMinutes = (duration) => {
  // Calculate hours and minutes
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
};

const addTime = (timeStr, hoursToAdd, minutesToAdd) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Create a new Date object with the given time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Add the hours and minutes
  date.setHours(date.getHours() + hoursToAdd);
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Format the result back to "HH:mm"
  const resultHours = String(date.getHours()).padStart(2, "0");
  const resultMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${resultHours}:${resultMinutes}`;
};

const subtractTime = (timeStr, hoursToSubtract, minutesToSubtract) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Create a new Date object with the given time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Subtract the hours and minutes
  date.setHours(date.getHours() - hoursToSubtract);
  date.setMinutes(date.getMinutes() - minutesToSubtract);

  // Format the result back to "HH:mm"
  const resultHours = String(date.getHours()).padStart(2, "0");
  const resultMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${resultHours}:${resultMinutes}`;
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const subtractTimes = (timeStr1, timeStr2) => {
  // Convert times to minutes
  const minutes1 = timeToMinutes(timeStr1);
  const minutes2 = timeToMinutes(timeStr2);

  // Calculate the difference in minutes
  const differenceInMinutes = Math.abs(minutes1 - minutes2);

  // Convert the difference back to hours and minutes
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  return { hours, minutes };
};

const timeMax = (timeStr1, timeStr2) => {
  // Parse the first time
  const [hours1, minutes1] = timeStr1.split(":").map(Number);

  // Parse the second time
  const [hours2, minutes2] = timeStr2.split(":").map(Number);

  // Compare hours
  if (hours1 < hours2) {
    return timeStr2;
  } else if (hours1 > hours2) {
    return timeStr1;
  }

  // If hours are equal, compare minutes
  if (minutes1 < minutes2) {
    return timeStr2;
  } else if (minutes1 > minutes2) {
    return timeStr1;
  }

  // If both hours and minutes are equal, return either (choosing the first time for simplicity)
  return timeStr1;
};

const timeMin = (timeStr1, timeStr2) => {
  // Parse the first time
  const [hours1, minutes1] = timeStr1.split(":").map(Number);

  // Parse the second time
  const [hours2, minutes2] = timeStr2.split(":").map(Number);

  // Compare hours
  if (hours1 > hours2) {
    return timeStr2;
  } else if (hours1 < hours2) {
    return timeStr1;
  }

  // If hours are equal, compare minutes
  if (minutes1 > minutes2) {
    return timeStr2;
  } else if (minutes1 < minutes2) {
    return timeStr1;
  }

  // If both hours and minutes are equal, return either (choosing the first time for simplicity)
  return timeStr1;
};

const isTimeBetween = ({ startTime, endTime, checkTime }) => {
  // Convert times to total minutes since midnight for easier comparison
  const totalStartMinutes = timeToMinutes(startTime);
  const totalEndMinutes = timeToMinutes(endTime);
  const totalCheckMinutes = timeToMinutes(checkTime);

  // Check if checkTime is between startTime and endTime
  return (
    totalCheckMinutes >= totalStartMinutes &&
    totalCheckMinutes <= totalEndMinutes
  );
};

const convertToAmPm = (time24) => {
  // Split the time string into hours and minutes
  let [hours, minutes] = time24.split(":");

  // Convert hours from string to number
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Determine the period (AM/PM)
  const period = hours >= 12 ? "PM" : "AM";

  // Handle the special case for midnight
  if (hours === 0 && period === "AM") {
    hours = 0; // Keep 0 hours for midnight
  } else if (hours === 12 && period === "AM") {
    hours = 0; // Change 12 AM to 0
  } else {
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;
  }

  // Return the formatted time string
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export {
  convertMinutesToHoursAndMinutesString,
  convertMinutesToHoursAndMinutes,
  addTime,
  subtractTime,
  timeMax,
  timeMin,
  timeToMinutes,
  subtractTimes,
  hourAndMinToMin,
  isTimeBetween,
  convertToAmPm,
  convertTo24Hour,
};
