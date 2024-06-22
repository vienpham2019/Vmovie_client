import { useDispatch } from "react-redux";
import ShowtimeEdit from "./ShowtimeEdit";
import { useEffect } from "react";
import { resetState } from "./showtimeSlice";
import { Link, useParams } from "react-router-dom";

const EditShowtime = () => {
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/showtime">
          Showtime
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Edit showtime</h2>
      </div>
      {/* Body */}
      <div className="p-2 mobile:p-1">
        <ShowtimeEdit />
      </div>
    </div>
  );
};

export default EditShowtime;
