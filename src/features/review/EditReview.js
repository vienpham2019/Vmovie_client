import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import {
  useGetReviewDetailsQuery,
  useUpdateReviewMutation,
} from "./reviewSliceApi";
import {
  formInitState,
  initReviewFormData,
} from "../../components/form/formSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const EditReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState();
  const { reviewFormData } = useSelector((state) => state.form);
  const [updateReview] = useUpdateReviewMutation();
  const { data: { metadata: reviewDetails } = {}, isLoading } =
    useGetReviewDetailsQuery(
      {
        _id: reviewId,
      },
      {
        skip: !reviewId,
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );
  useEffect(() => {
    if (reviewDetails) {
      const { movieId } = reviewDetails;
      setSelectedMovie(movieId);
      const editForm = JSON.parse(JSON.stringify(formInitState.reviewFormData));
      Object.keys(editForm).forEach((key) => {
        if (key === "movieId") {
          setSelectedMovie(movieId);
          editForm[key].value = movieId._id;
        } else {
          editForm[key].value = reviewDetails[key];
        }
      });
      dispatch(initReviewFormData(editForm));
    }
  }, [reviewDetails, setSelectedMovie, dispatch]);

  const handleEditReview = async () => {
    try {
      const updateReviewObj = {};
      Object.entries(reviewFormData).forEach(([key, val]) => {
        updateReviewObj[key] = val.value;
      });
      const res = await updateReview({
        _id: reviewId,
        payload: updateReviewObj,
      });
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      navigate("/admin/review");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/review">
          Review
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Edit review</h2>
      </div>
      <div className="p-2 mobile:p-1">
        <ReviewForm
          handleSubmit={handleEditReview}
          selectedMovieInit={selectedMovie}
        />
      </div>
    </div>
  );
};

export default EditReview;
