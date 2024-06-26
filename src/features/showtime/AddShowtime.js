import { Link } from "react-router-dom";
import ShowtimeEdit from "./ShowtimeEdit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetState } from "./showtimeSlice";

const AddShowtime = () => {
  const dispatch = useDispatch();
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
        <ShowtimeEdit />
      </div>
    </div>
  );
};

export default AddShowtime;
