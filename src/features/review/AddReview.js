import { Link, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { useCreateReviewMutation } from "./reviewSliceApi";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useEffect } from "react";
import { resetReviewFormdata } from "../../components/form/formSlice";

const AddReview = () => {
  const { reviewFormData } = useSelector((state) => state.form);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createReview] = useCreateReviewMutation();

  useEffect(() => {
    dispatch(resetReviewFormdata());
  }, [dispatch]);

  const handleAddReview = async () => {
    const newReview = Object.entries(reviewFormData).reduce(
      (acc, [key, value]) => {
        let val = value.value;
        if (typeof val === "string") {
          val = val.trim();
        }
        acc[key] = val;
        return acc;
      },
      {}
    );
    const res = await createReview(newReview);
    dispatch(
      setMessage({
        message: res?.data?.message || "",
        messageType: notificationMessageEnum.SUCCESS,
      })
    );
    navigate("/admin/review");
  };

  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/review">
          Review
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Add new review</h2>
      </div>
      <div className="p-2 mobile:p-1">
        <ReviewForm handleSubmit={handleAddReview} />
      </div>
    </div>
  );
};

export default AddReview;
