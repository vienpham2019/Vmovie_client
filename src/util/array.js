const convertTo2DArray = ({ arr, columns }) => {
  const rows = Math.ceil(arr.length / columns);
  const result = [];

  for (let i = 0; i < rows; i++) {
    result.push(arr.slice(i * columns, (i + 1) * columns));
  }

  return result;
};

module.exports = { convertTo2DArray };
