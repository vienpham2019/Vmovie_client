import { Link, useNavigate } from "react-router-dom";
import EditTheaterSeat from "./EditTheaterSeat";

const AddTheater = () => {
  const navigate = useNavigate();
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/theater">
          Theater
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Add new theater</h2>
      </div>
      <div className="p-2 mobile:p-1">
        <EditTheaterSeat />
      </div>
    </div>
  );
};

export default AddTheater;
