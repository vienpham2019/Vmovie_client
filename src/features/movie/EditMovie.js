import { useEffect } from "react";
import {
  useGetMovieByIdQuery,
  useUpdateUncompletedMovieMutation,
} from "../movie/movieApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { initMovieFormData } from "../../components/form/formSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieForm from "./MovieForm";

const EditMovie = () => {
  const { movieId } = useParams(); // Extract movieId from route params

  const {
    data: movie,
    isLoading,
    isSuccess,
  } = useGetMovieByIdQuery(
    { movieId },
    {
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );
  const [updateUncompletedMovie] = useUpdateUncompletedMovieMutation();
  const { movieFormData, id } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      const initMovieForm = {};
      Object.keys(movie.metadata).forEach((key) => {
        initMovieForm[key] = { value: movie.metadata[key] };
      });
      dispatch(initMovieFormData(initMovieForm));
    }
  }, [movie, isSuccess, dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOnSubmit = async () => {
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
  };

  return (
    <div className="p-[1rem]">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/catalog">
          Catalog
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Edit movie</h2>
      </div>
      {/* Body */}
      <div className="p-2">
        <MovieForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default EditMovie;
