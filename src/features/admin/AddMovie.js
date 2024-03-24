import { useEffect, useRef } from "react";
import MovieForm from "../../components/form/MovieForm";
import {
  useGetUncompletedMovieMutation,
  useUpdateUncompletedMovieMutation,
} from "./adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  initMovieFormData,
  resetMovieFormdata,
} from "../../components/form/formSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const AddMovie = () => {
  const [getUncompletedMovie] = useGetUncompletedMovieMutation();
  const [updateUncompletedMovie] = useUpdateUncompletedMovieMutation();
  const initialized = useRef(false);
  const { movieFormData } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMovie = async () => {
      if (initialized.current) return;
      initialized.current = true;
      try {
        const res = await getUncompletedMovie();
        let formData = JSON.parse(JSON.stringify(movieFormData));
        Object.keys(res.data.metadata).forEach((key) => {
          formData[key].value = res.data.metadata[key];
        });
        dispatch(initMovieFormData(formData));
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
  }, [getUncompletedMovie, movieFormData, dispatch]);

  const handleOnSubmit = async () => {
    try {
      let submitFormData = {};
      Object.keys(movieFormData).forEach((key) => {
        submitFormData[key] = movieFormData[key].value;
      });
      console.log(submitFormData);
      const res = await updateUncompletedMovie(submitFormData);
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      dispatch(resetMovieFormdata());
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
      <div className="py-[0.4rem] border-b border-gray-600">
        <h2 className="admin_page_title">Add new movie</h2>
      </div>
      {/* Body */}
      <div className="p-2">
        <MovieForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default AddMovie;
