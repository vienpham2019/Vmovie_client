import { useEffect } from "react";
import MovieForm from "../../components/form/MovieForm";
import {
  useGetUncompletedMovieMutation,
  useUpdateUncompletedMovieMutation,
} from "../movie/movieApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { initMovieFormData } from "../../components/form/formSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { Link, useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [getUncompletedMovie] = useGetUncompletedMovieMutation();
  const [updateUncompletedMovie] = useUpdateUncompletedMovieMutation();
  const { movieFormData, id } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await getUncompletedMovie();
        const initMovieForm = {};
        Object.keys(res.data.metadata).forEach((key) => {
          initMovieForm[key] = { value: res.data.metadata[key] };
        });
        dispatch(initMovieFormData(initMovieForm));
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
  }, [getUncompletedMovie, dispatch]);

  const handleOnSubmit = async () => {
    try {
      let submitFormData = {};
      Object.keys(movieFormData).forEach((key) => {
        submitFormData[key] = movieFormData[key].value;
      });
      submitFormData._id = id;
      const res = await updateUncompletedMovie(submitFormData);
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      navigate("/admin/catalog");
    } catch (error) {
      dispatch(
        setMessage({
          message: error,
          messageType: notificationMessageEnum.ERROR,
        })
      );
    }
  };

  return (
    <div className="p-[1rem]">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/catalog">
          Catalog
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Add new movie</h2>
      </div>
      {/* Body */}
      <div className="p-2">
        <MovieForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default AddMovie;
