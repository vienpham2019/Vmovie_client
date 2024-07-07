const compressGrid = (gridArr) => {
  const updateGrid = [];
  let rowsCount = 0;
  let hallCount = 0;
  for (let seat of gridArr) {
    const isHall = seat.every((element) => element === "H");
    if (isHall) {
      updateGrid.push({
        key: `Hall${++hallCount}`,
        value: [`${seat.length}H`],
      });
    } else {
      const rowGrid = [];
      let currentChar = seat[0];
      let count = 1;
      for (let i = 1; i < seat.length; i++) {
        if (seat[i] === currentChar) {
          count++;
        } else {
          rowGrid.push(`${count}${currentChar}`);
          currentChar = seat[i];
          count = 1;
        }
      }
      rowGrid.push(`${count}${currentChar}`);
      updateGrid.push({
        key: String.fromCharCode(65 + rowsCount++),
        value: rowGrid,
      });
    }
  }
  return updateGrid;
};

const expandGrid = (gridObj) => {
  let expandedArray = [];

  for (let row of gridObj) {
    const { value: rowGrid } = row;
    expandedArray.push(
      rowGrid
        .map((item) => {
          const count = parseInt(item.match(/\d+/)[0], 10); // Get the number part of the item
          const character = item.replace(/\d+/g, ""); // Get the character part of the item
          return Array(count).fill(character);
        })
        .flat()
    );
  }
  return expandedArray;
};

export { compressGrid, expandGrid };
