const separatedWords = (string) => string.replace(/([a-z])([A-Z])/g, "$1 $2");
const isArrayString = (string) => {
  return string.startsWith("[") && string.endsWith("]");
};

const stringToArray = (string) => {
  const dataArray = string
    .replace(/^\[|\]$/g, "") // Remove square brackets at the beginning and end of the string
    .split(","); // Split the string by comma

  // Trim each element in the array to remove any leading or trailing whitespace
  return dataArray.map((item) => item.trim());
};

export { separatedWords, isArrayString, stringToArray };
