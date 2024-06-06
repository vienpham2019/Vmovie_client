import { useCallback, useEffect, useState } from "react";
import { FaWheelchair } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const modifyTypeEnum = Object.freeze({
  INSERT_LEFT: "Insert left",
  INSERT_RIGHT: "Insert right",
  INSERT_ABOVE: "Insert above",
  INSERT_BELOW: "Insert below",
  REMOVE: "Remove",
});

const EditTheaterSeat = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [selectCols, setSelectCols] = useState({ start: null, end: null });
  const [selectRows, setSelectRows] = useState({ start: null, end: null });
  const colMax = 20;
  const rowMax = 15;
  const [openColControll, setOpenColControll] = useState(null);
  const [openRowControll, setOpenRowControll] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [targetSelectedSeat, setTargetSelectedSeat] = useState({
    row: null,
    col: null,
  });
  const [grid, setGrid] = useState([]);

  const getSeatGrid = () => {
    const initGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push("N"); // Example seat identifier, customize as needed
      }
      initGrid.push(row);
    }
    setGrid(initGrid);
  };

  const modifyColumn = ({ currentColumnIndex, type }) => {
    if ((cols <= 1 && type === modifyTypeEnum.REMOVE) || cols + 1 > colMax)
      return;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => {
        const newRow = [...row];
        const seatType = "N";
        if (type === modifyTypeEnum.INSERT_LEFT) {
          if (currentColumnIndex <= newRow.length) {
            newRow.splice(currentColumnIndex, 0, seatType);
          } else {
            newRow.unshift(seatType);
          }
        } else if (type === modifyTypeEnum.INSERT_RIGHT) {
          if (currentColumnIndex + 1 <= newRow.length) {
            newRow.splice(currentColumnIndex + 1, 0, seatType);
          } else {
            newRow.push(seatType);
          }
        } else if (type === modifyTypeEnum.REMOVE) {
          newRow.splice(currentColumnIndex, 1);
        }

        return newRow;
      });
      return newGrid;
    });
    if (type === modifyTypeEnum.REMOVE) {
      setCols(cols - 1);
    } else {
      setCols(cols + 1);
    }
    setOpenColControll(null);
  };

  const modifyRow = ({ currentRowIndex, type }) => {
    if ((rows <= 1 && type === modifyTypeEnum.REMOVE) || rows + 1 > rowMax)
      return;
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const newRow = Array(newGrid[0].length).fill("N"); // Fill new row with default seatType "H"

      if (type === modifyTypeEnum.INSERT_ABOVE) {
        if (currentRowIndex <= newGrid.length) {
          newGrid.splice(currentRowIndex, 0, newRow);
        } else {
          newGrid.unshift(newRow);
        }
      } else if (type === modifyTypeEnum.INSERT_BELOW) {
        if (currentRowIndex + 1 <= newGrid.length) {
          newGrid.splice(currentRowIndex + 1, 0, newRow);
        } else {
          newGrid.push(newRow);
        }
      } else if (type === modifyTypeEnum.REMOVE) {
        if (currentRowIndex < newGrid.length) {
          newGrid.splice(currentRowIndex, 1);
        }
      }

      return newGrid;
    });
    if (type === modifyTypeEnum.REMOVE) {
      setRows(rows - 1);
    } else {
      setRows(rows + 1);
    }
    setOpenRowControll(null);
  };

  const disPlaySeatLayOut = () => {
    return (
      <div className="flex flex-col gap-2">
        {grid.map((row, rowIndex) => {
          let count = 0;
          return (
            <div className="flex gap-2 justify-center" key={rowIndex}>
              {row.map((seat, colIndex) => {
                if (seat === "N") {
                  count++;
                }
                const seatNumber = {
                  N: count,
                  H: "",
                };
                return (
                  <div>
                    {SeatComponent({
                      seatNumber: seatNumber[seat],
                      seatCordinate: { col: colIndex + 1, row: rowIndex + 1 },
                      seatType: seat,
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const isInColumn = (colIndex) => {
    const start_c = Math.min(selectCols.start, selectCols.end);
    const end_c = Math.max(selectCols.start, selectCols.end);
    return start_c <= colIndex && colIndex <= end_c;
  };

  const isInRow = (rowIndex) => {
    const start_r = Math.min(selectRows.start, selectRows.end);
    const end_r = Math.max(selectRows.start, selectRows.end);
    return start_r <= rowIndex && rowIndex <= end_r;
  };

  const handleSelectedSeat = () => {
    if (
      selectRows.start === null ||
      selectRows.end === null ||
      selectCols.start === null ||
      selectCols.end === null
    ) {
      return;
    }

    let updateSelectedSeat = [...selectedSeat];
    const s_r = Math.min(selectRows.start, selectRows.end);
    const e_r = Math.max(selectRows.start, selectRows.end);

    const s_c = Math.min(selectCols.start, selectCols.end);
    const e_c = Math.max(selectCols.start, selectCols.end);
    for (let rowIndex = s_r; rowIndex <= e_r; rowIndex++) {
      for (let colIndex = s_c; colIndex <= e_c; colIndex++) {
        if (!isSelected({ row: rowIndex, col: colIndex })) {
          updateSelectedSeat.push({ row: rowIndex, col: colIndex });
        }
      }
    }
    updateSelectedSeat.sort((a, b) => {
      if (a.row === b.row) {
        return a.col - b.col;
      }
      return a.row - b.row;
    });
    setSelectedSeat(updateSelectedSeat);
    setSelectCols(() => ({ start: null, end: null }));
    setSelectRows(() => ({ start: null, end: null }));
  };

  const isSelected = ({ row, col }) => {
    return selectedSeat.some((seat) => seat.row === row && seat.col === col);
  };

  const SeatComponent = ({ seatNumber, seatType, seatCordinate }) => {
    let className =
      "w-[2rem] aspect-square rounded-md flex justify-center items-center cursor-pointer text-gray-300 text-[0.7rem] hover:bg-cyan-600 border border-gray-400";
    if (seatType === "H") {
      className = "w-[2rem] aspect-square";
    }

    const isStartSelected =
      selectCols.start === seatCordinate.col &&
      selectRows.start === seatCordinate.row;

    const isTargetSelectedSeat =
      targetSelectedSeat.col === seatCordinate.col &&
      targetSelectedSeat.row === seatCordinate.row;

    if (isInColumn(seatCordinate.col) && isInRow(seatCordinate.row)) {
      className += " bg-cyan-800";
    } else if (isSelected(seatCordinate)) {
      className += " bg-cyan-600";
    }

    if (isStartSelected) {
      className += " border-red-700";
    } else if (isTargetSelectedSeat) {
      className += " border-red-600 bg-red-400";
    }

    return (
      <div
        key={"seat " + seatNumber}
        className={className}
        onClick={() => {
          if (selectCols.start === null) {
            setSelectCols((prev) => ({ ...prev, start: seatCordinate.col }));
            setSelectRows((prev) => ({ ...prev, start: seatCordinate.row }));
          } else if (isStartSelected) {
            setSelectCols(() => ({ start: null, end: null }));
            setSelectRows(() => ({ start: null, end: null }));
          } else {
            handleSelectedSeat();
          }
        }}
        onMouseEnter={() => {
          if (selectCols.start !== null) {
            setSelectCols((prev) => ({ ...prev, end: seatCordinate.col }));
            setSelectRows((prev) => ({ ...prev, end: seatCordinate.row }));
          }
        }}
      >
        {seatType === "D" ? <FaWheelchair /> : seatNumber}
      </div>
    );
  };

  const displayColControll = () => {
    return (
      <div className="flex gap-2 justify-center mb-3">
        {grid.length > 0 &&
          grid[0].map((_, i) => (
            <div className="relative">
              <div
                key={i + "col_controll"}
                onClick={() =>
                  setOpenColControll(openColControll === i ? null : i)
                }
                className="text-white w-[2rem] aspect-square border border-gray-500 flex justify-center items-center cursor-pointer"
              >
                <span className="text-[0.7rem]">{i + 1}</span>
                <MdArrowDropDown />
              </div>
              <div
                className={`absolute bg-gray-700 py-2 text-[0.8rem] ${
                  openColControll === i ? "flex" : "hidden"
                } flex flex-col gap-2 text-white w-[10rem]`}
              >
                <span
                  className="hover:bg-cyan-600 cursor-pointer px-2"
                  onClick={() =>
                    modifyColumn({
                      currentColumnIndex: i,
                      type: modifyTypeEnum.REMOVE,
                    })
                  }
                >
                  Remove Column
                </span>
                <span
                  className="hover:bg-cyan-600 cursor-pointer px-2 "
                  onClick={() =>
                    modifyColumn({
                      currentColumnIndex: i,
                      type: modifyTypeEnum.INSERT_LEFT,
                    })
                  }
                >
                  Insert Column Left
                </span>
                <span
                  className="hover:bg-cyan-600 cursor-pointer px-2 "
                  onClick={() =>
                    modifyColumn({
                      currentColumnIndex: i,
                      type: modifyTypeEnum.INSERT_RIGHT,
                    })
                  }
                >
                  Insert Column Right
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const displayRowControll = () => {
    return (
      <div className="flex flex-col mt-[2.8rem] mx-3 gap-2">
        {grid.length &&
          grid.map((_, i) => {
            return (
              <div className="relative">
                <div
                  key={i + "row_controll"}
                  onClick={() =>
                    setOpenRowControll(openRowControll === i ? null : i)
                  }
                  className="text-white w-[2rem] aspect-square border border-gray-500 flex justify-center items-center cursor-pointer"
                >
                  <span className="text-[0.7rem]">{i + 1}</span>
                  <IoMdArrowDropright />
                </div>
                <div
                  className={`absolute bg-gray-700 py-2 text-[0.8rem] z-10 -top-full left-full ${
                    openRowControll === i ? "flex" : "hidden"
                  } flex-col gap-2 text-white w-[8rem]`}
                >
                  <span
                    className="hover:bg-cyan-600 cursor-pointer px-2"
                    onClick={() =>
                      modifyRow({
                        currentRowIndex: i,
                        type: modifyTypeEnum.REMOVE,
                      })
                    }
                  >
                    Remove Row
                  </span>
                  <span
                    className="hover:bg-cyan-600 cursor-pointer px-2 "
                    onClick={() =>
                      modifyRow({
                        currentRowIndex: i,
                        type: modifyTypeEnum.INSERT_ABOVE,
                      })
                    }
                  >
                    Insert Row Above
                  </span>
                  <span
                    className="hover:bg-cyan-600 cursor-pointer px-2 "
                    onClick={() =>
                      modifyRow({
                        currentRowIndex: i,
                        type: modifyTypeEnum.INSERT_BELOW,
                      })
                    }
                  >
                    Insert Row Below
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const handleUnselectedSeat = ({ row, col }) => {
    setTargetSelectedSeat({ row: null, col: null });
    setSelectedSeat((prevSelectedSeat) =>
      prevSelectedSeat.filter((seat) => !(seat.row === row && seat.col === col))
    );
  };

  const displaySelectedSeat = () => {
    return (
      <div className="flex flex-wrap gap-2 max-h-[10rem] overflow-y-auto p-2 border border-gray-500">
        {selectedSeat.map(({ row, col }) => {
          return (
            <div
              onMouseEnter={() => setTargetSelectedSeat({ row, col })}
              onMouseLeave={() =>
                setTargetSelectedSeat({ row: null, col: null })
              }
              className="border border-gray-600 bg-cyan-900 p-2 text-[0.8rem] text-white flex gap-2 items-center cursor-pointer hover:bg-cyan-500"
            >
              <span>R-{row}</span>
              <span>C-{col}</span>
              <span
                className="text-[1rem] text-red-500 cursor-pointer"
                onClick={() => handleUnselectedSeat({ row, col })}
              >
                <RxCrossCircled />
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        if (openColControll !== null) {
          setOpenColControll(null);
        }
        if (openRowControll !== null) {
          setOpenRowControll(null);
        }
      }}
      className="overflow-x-scroll flex flex-wrap justify-center flex-1 tablet:max-w-[47rem] mobile:w-[19rem] px-5 bg-[#172532] rounded-md"
    >
      <div className="flex flex-col gap-1 py-2 min-w-[40rem] flex-auto">
        <div className="flex flex-col items-center m-2 pl-[2rem]">
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen w-full bg-gray-400"></div>
          </div>
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen-shadow w-full bg-gradient-to-b from-gray-700"></div>
          </div>
        </div>
        <div className="flex justify-center mb-[2rem]">
          {displayRowControll()}
          <div>
            {displayColControll()}
            {disPlaySeatLayOut()}
          </div>
        </div>
      </div>
      {/* Seat controll */}
      <div className="flex flex-col gap-4 flex-1 justify-center p-2">
        {/* Room # */}
        <div className="input_group">
          <input
            type="text"
            className={`input  border-gray-500`}
            value={""}
            onChange={(e) => console.log(e.target.value)}
          />
          <div className={`input_title`}>
            <span>
              Theater Room <small className="text-red-400">*</small>
            </span>
          </div>
        </div>
        {/* Room # */}
        <div className="flex gap-4">
          <div className="input_group">
            <input
              type="number"
              min={1}
              max={colMax}
              className={`input  border-gray-500`}
              value={cols}
              onChange={(e) => setCols(e.target.value - "0")}
            />
            <div className={`input_title`}>
              <span>Cols</span>
            </div>
          </div>
          <div className="input_group">
            <input
              type="number"
              min={1}
              max={rowMax}
              className={`input  border-gray-500`}
              value={rows}
              onChange={(e) => setRows(e.target.value - "0")}
            />
            <div className={`input_title`}>
              <span>Rows</span>
            </div>
          </div>
          <button
            onClick={getSeatGrid}
            className="border p-1 text-white rounded border-cyan-300"
          >
            Generate
          </button>
        </div>
        <div className="flex flex-col gap-3 text-white">
          <h3>Selected Seat</h3>
          {selectedSeat.length ? (
            <div className="flex flex-col gap-3 w-auto">
              {" "}
              {displaySelectedSeat()}
              <button
                className="border border-gray-400 p-2 hover:bg-cyan-900"
                onClick={() => {
                  setTargetSelectedSeat({ row: null, col: null });
                  setSelectedSeat([]);
                }}
              >
                Clear selected seat{" "}
              </button>
            </div>
          ) : (
            <span className="text-gray-500 text-[0.8rem]">
              No seat selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTheaterSeat;
