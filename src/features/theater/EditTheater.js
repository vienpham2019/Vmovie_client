import { Link, useNavigate, useParams } from "react-router-dom";
import EditTheaterSeat from "./EditTheaterSeat";
import {
  useEditTheaterMutation,
  useGetTheaterDetailsQuery,
} from "./theaterApiSlice";
import { useDispatch } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import AdminSkeleton from "../admin/AdminSkeleton";

const EditTheater = () => {
  const [editTheater] = useEditTheaterMutation();
  const { theaterId } = useParams();
  const { data: { metadata: theater } = {}, isLoading } =
    useGetTheaterDetailsQuery(
      {
        _id: theaterId,
      },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEditTheater = async (newTheater) => {
    try {
      const res = await editTheater({ payload: newTheater, _id: theaterId });
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      navigate("/admin/theater");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <AdminSkeleton />;
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
        <EditTheaterSeat
          handleSubmit={handleEditTheater}
          theaterSeat={theater}
        />
      </div>
    </div>
  );
};

export default EditTheater;
