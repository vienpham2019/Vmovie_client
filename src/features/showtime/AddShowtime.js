import { Link } from "react-router-dom";
import ShowtimeEdit from "./ShowtimeEdit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetState } from "./showtimeSlice";
import AddMultipleShowtime from "./AddMultipleShowtime";

const AddShowtime = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("Single");
  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/showtime">
          Showtime
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Add new showtime</h2>
      </div>
      {/* Body */}
      <div className="p-2 mobile:p-1">
        <div className="flex gap-1">
          <button
            onClick={() => setType("Single")}
            className={`border ${
              type === "Single" ? "text-white" : "border-gray-600 text-gray-600"
            } bg-gray-800 hover:bg-gray-900 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2`}
          >
            Single
          </button>
          <button
            onClick={() => setType("Multiple")}
            className={`border ${
              type === "Multiple"
                ? "text-white"
                : "border-gray-600 text-gray-600"
            } bg-gray-800 hover:bg-gray-900 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2`}
          >
            Multiple
          </button>
        </div>
        {type === "Single" ? <ShowtimeEdit /> : <AddMultipleShowtime />}
      </div>
    </div>
  );
};

export default AddShowtime;
