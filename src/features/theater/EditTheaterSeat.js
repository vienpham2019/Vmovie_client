import { useEffect, useState } from "react";
import { FaWheelchair } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowDropDown, MdOutlineWheelchairPickup } from "react-icons/md";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { BiHandicap } from "react-icons/bi";
import { modifyTypeEnum, seatTypeEnum } from "./theaterEnum";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useDispatch } from "react-redux";
import { expandGrid } from "../../util/grid";

const EditTheaterSeat = ({ theaterSeat, handleSubmit }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [selectCols, setSelectCols] = useState({ start: null, end: null });
  const [selectRows, setSelectRows] = useState({ start: null, end: null });
  const colMax = 30;
  const rowMax = 30;
  const [openColControll, setOpenColControll] = useState(null);
  const [openRowControll, setOpenRowControll] = useState(null);
  const [selectSeatType, setSelectSeatType] = useState(seatTypeEnum.NORMAL);
  const [roomName, setRoomName] = useState("");
  const [targetSelectedSeat, setTargetSelectedSeat] = useState({
    row: null,
    col: null,
  });
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    if (theaterSeat?.name) {
      setRoomName(theaterSeat.name);
    }
    if (theaterSeat?.grid.length) {
      const initGrid = expandGrid(theaterSeat.grid);
      const setInitGrid = [];
      for (let rowIndex = 0; rowIndex < initGrid.length; rowIndex++) {
        const row = [];
        for (
          let colIndex = 0;
          colIndex < initGrid[rowIndex].length;
          colIndex++
        ) {
          row.push({
            seatType: initGrid[rowIndex][colIndex],
            isSelected: false,
          }); // Example seat identifier, customize as needed
        }
        setInitGrid.push(row);
      }
      setGrid(setInitGrid);
      setRows(initGrid.length);
      setCols(initGrid[0].length);
    }
  }, [theaterSeat, setGrid, setRoomName]);

  const getSeatGrid = () => {
    const setInitGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          seatType: seatTypeEnum.NORMAL,
          isSelected: false,
        }); // Example seat identifier, customize as needed
      }
      setInitGrid.push(row);
    }
    setGrid(setInitGrid);
  };

  const modifyColumn = ({ currentColumnIndex, type }) => {
    if (
      (cols <= 1 && type === modifyTypeEnum.REMOVE) ||
      (type !== modifyTypeEnum.REMOVE && cols + 1 > colMax)
    )
      return;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, i) => {
        const newRow = [...row];
        const seat = {
          seatType: seatTypeEnum.NORMAL,
          isSelected: false,
        };
        if (type === modifyTypeEnum.INSERT_LEFT) {
          if (currentColumnIndex <= newRow.length) {
            newRow.splice(currentColumnIndex, 0, seat);
          } else {
            newRow.unshift(seat);
          }
        } else if (type === modifyTypeEnum.INSERT_RIGHT) {
          if (currentColumnIndex + 1 <= newRow.length) {
            newRow.splice(currentColumnIndex + 1, 0, seat);
          } else {
            newRow.push(seat);
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
    if (
      (rows <= 1 && type === modifyTypeEnum.REMOVE) ||
      (type !== modifyTypeEnum.REMOVE && rows + 1 > rowMax)
    )
      return;
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const seat = {
        seatType: seatTypeEnum.NORMAL,
        isSelected: false,
      };
      const newRow = Array(newGrid[0].length).fill(seat); // Fill new row with default seatType "H"

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
          let seatNumber = 0;
          return (
            <div className="flex gap-2 justify-center" key={rowIndex}>
              {row.map((seat, colIndex) => {
                if (seat.seatType !== seatTypeEnum.HALL) seatNumber++;
                return (
                  <div key={`Seat - row ${rowIndex} - col ${colIndex}`}>
                    {SeatComponent({
                      seat: { ...seat, seatNumber },
                      cordinate: { col: colIndex + 1, row: rowIndex + 1 },
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

    const updateGrid = [...grid];
    for (let row = 0; row < updateGrid.length; row++) {
      for (let col = 0; col < updateGrid[row].length; col++) {
        const seat = updateGrid[row][col];
        if (!seat.isSelected) {
          updateGrid[row][col].isSelected =
            isInColumn(col + 1) && isInRow(row + 1);
        }
      }
    }
    setGrid(updateGrid);
    setSelectCols(() => ({ start: null, end: null }));
    setSelectRows(() => ({ start: null, end: null }));
  };

  const SeatComponent = ({ seat, cordinate }) => {
    const { seatType, seatNumber, isSelected } = seat;
    let className =
      "w-[2rem] aspect-square rounded-md flex justify-center items-center cursor-pointer text-[0.7rem] hover:bg-cyan-600 ";
    if (seatType === seatTypeEnum.HALL) {
      className += "text-transparent";
    } else {
      className += "border border-gray-500 text-white";
    }

    const isStartSelected =
      selectCols.start === cordinate.col && selectRows.start === cordinate.row;

    const isTargetSelectedSeat =
      targetSelectedSeat.col === cordinate.col &&
      targetSelectedSeat.row === cordinate.row;

    if (isInColumn(cordinate.col) && isInRow(cordinate.row)) {
      className += " bg-cyan-800";
    } else if (isSelected) {
      className += " bg-cyan-600";
    }

    if (isStartSelected) {
      className += " border-red-700";
    } else if (isTargetSelectedSeat) {
      className += " border-red-600 bg-red-400";
    }

    if (
      seatType === seatTypeEnum.WHEELCHAIR ||
      seatType === seatTypeEnum.COMPANITION
    ) {
      className += " bg-[#2f76b8]";
    }

    return (
      <div
        key={"seat " + seatNumber}
        className={className}
        onClick={() => {
          if (selectCols.start === null) {
            setSelectCols((prev) => ({ ...prev, start: cordinate.col }));
            setSelectRows((prev) => ({ ...prev, start: cordinate.row }));
          } else if (isStartSelected) {
            setSelectCols(() => ({ start: null, end: null }));
            setSelectRows(() => ({ start: null, end: null }));
          } else {
            handleSelectedSeat();
          }
        }}
        onMouseEnter={() => {
          if (selectCols.start !== null) {
            setSelectCols((prev) => ({ ...prev, end: cordinate.col }));
            setSelectRows((prev) => ({ ...prev, end: cordinate.row }));
          }
        }}
      >
        {seatType === seatTypeEnum.WHEELCHAIR ? (
          <FaWheelchair />
        ) : seatType === seatTypeEnum.COMPANITION ? (
          <MdOutlineWheelchairPickup />
        ) : (
          seatNumber
        )}
      </div>
    );
  };

  const displayColControll = () => {
    return (
      <div className="flex gap-2 justify-center mb-3">
        {grid.length > 0 &&
          grid[0].map((_, i) => (
            <div className="relative" key={`Col ${i}`}>
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
              <div className="relative" key={`Rows ${i}`}>
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
    const updateGrid = [...grid];
    updateGrid[row - 1][col - 1].isSelected = false;
    setGrid(updateGrid);
  };

  const handleClearSelectedSeat = (selectedSeatList) => {
    const updateGrid = [...grid];
    for (let cordinate of selectedSeatList) {
      const { row, col } = cordinate;
      updateGrid[row - 1][col - 1].isSelected = false;
    }
    setGrid(updateGrid);
    setSelectSeatType(seatTypeEnum.NORMAL);
  };

  const handleSetSeat = (selectedSeatList) => {
    const updateGrid = [...grid];
    for (let cordinate of selectedSeatList) {
      const { row, col } = cordinate;
      updateGrid[row - 1][col - 1].seatType = selectSeatType;
      updateGrid[row - 1][col - 1].isSelected = false;
    }
    setGrid(updateGrid);
    setSelectSeatType(seatTypeEnum.NORMAL);
  };

  const displaySelectedSeat = () => {
    const selectedSeat = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].isSelected) {
          selectedSeat.push({ row: row + 1, col: col + 1 });
        }
      }
    }

    if (selectedSeat.length === 0) {
      return (
        <span className="text-gray-400 text-[0.8rem]">No seat selected</span>
      );
    }
    return (
      <div className="flex flex-col gap-3 w-auto mobile:max-w-[15rem]">
        <div className="flex flex-wrap gap-2 max-h-[10rem] overflow-y-auto p-2 border border-gray-500">
          {selectedSeat.map(({ row, col }) => {
            return (
              <div
                key={`Select Seat - row ${row} - col ${col}`}
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
        <button
          className="border border-gray-400 p-2 bg-cyan-950 hover:bg-cyan-800 rounded"
          onClick={() => {
            setTargetSelectedSeat({ row: null, col: null });
            handleClearSelectedSeat(selectedSeat);
          }}
        >
          Clear selected seat{" "}
        </button>
        <div className="flex flex-col gap-3">
          {displaySetSeat()}{" "}
          <button
            className="flex-1 border border-gray-500 py-2 bg-cyan-950 hover:bg-cyan-800 rounded"
            onClick={() => handleSetSeat(selectedSeat)}
          >
            Set Seat
          </button>
        </div>
      </div>
    );
  };

  const displaySetSeat = () => {
    const seatClass =
      "w-[2rem] aspect-square border border-gray-400 rounded text-white flex justify-center items-center bg-[rgb(33,37,41)]";
    const seatType = {
      [seatTypeEnum.NORMAL]: (
        <div className="flex items-center gap-3 px-2">
          <div className={`${seatClass}`}></div>
          <span>Normal</span>
        </div>
      ),
      [seatTypeEnum.HALL]: (
        <div className="flex items-center gap-3 px-2">
          <div className={`${seatClass}`}>
            <RxCross2 />
          </div>
          <span>Hall</span>
        </div>
      ),
      [seatTypeEnum.WHEELCHAIR]: (
        <div className="flex items-center gap-3 px-2 ">
          <div className={`${seatClass} `}>
            <BiHandicap />
          </div>
          <span>Wheelchair</span>
        </div>
      ),
      [seatTypeEnum.COMPANITION]: (
        <div className="flex items-center gap-3 px-2">
          <div className={`${seatClass}`}>
            <MdOutlineWheelchairPickup />
          </div>
          <span>Companition</span>
        </div>
      ),
    };
    return (
      <div className="flex flex-wrap gap-3">
        {Object.entries(seatTypeEnum).map(([_, seat]) => (
          <div
            key={`Set seat type ${seat}`}
            onClick={() => setSelectSeatType(seat)}
            className={`border border-gray-400 rounded-md p-2 cursor-pointer ${
              selectSeatType === seat && "bg-cyan-900"
            }`}
          >
            {seatType[seat]}
          </div>
        ))}
      </div>
    );
  };

  const onHandleSubmit = () => {
    if (roomName === "" || grid.length === 0) {
      dispatch(
        setMessage({
          message:
            roomName === ""
              ? "Theater room required"
              : grid.length === 0
              ? "Grid empty"
              : "",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }
    const modifyTheater = {
      name: roomName,
      grid: [],
    };
    for (let row = 0; row < grid.length; row++) {
      const rows = [];
      for (let col = 0; col < grid[row].length; col++) {
        rows.push(grid[row][col].seatType);
      }
      modifyTheater.grid.push(rows);
    }

    handleSubmit(modifyTheater);
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
      className="overflow-x-scroll flex flex-wrap justify-center flex-1 px-5 bg-[#172532] rounded-md"
    >
      <div className="flex flex-col gap-1 py-2 min-w-[40rem] flex-auto items-center">
        <div className="flex flex-col  m-2 pl-[2rem]">
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen w-full bg-gray-400"></div>
          </div>
          <div className="w-[30rem] h-[5rem] screen-container ">
            <div className="screen-shadow w-full bg-gradient-to-b from-gray-700"></div>
          </div>
        </div>
        <div className="flex  mb-[2rem]">
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
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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
            className="border p-1 text-white rounded border-cyan-300 bg-cyan-950 hover:bg-cyan-800"
          >
            Generate
          </button>
        </div>
        <div className="flex flex-col gap-3 text-white">
          <h3>Selected Seat</h3>
          {displaySelectedSeat()}
        </div>
        <button
          onClick={() => onHandleSubmit()}
          className="border border-gray-500 py-2 bg-cyan-950 rounded text-white hover:bg-cyan-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditTheaterSeat;
