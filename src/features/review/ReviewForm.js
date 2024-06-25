import { useDispatch, useSelector } from "react-redux";
import {
  initReviewFormData,
  resetReviewFormdata,
  setReviewFormData,
} from "../../components/form/formSlice";
import {
  inputTypeEnum,
  inputValidateEnum,
} from "../../components/form/formEnum";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { displayInput } from "../../components/form/formUtil";
import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
} from "../../components/modal/ModalSlice";
import { IoCalendar } from "react-icons/io5";
import Calendar from "../../components/Calendar";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaStar } from "react-icons/fa6";

const ReviewForm = ({ handleSubmit }) => {
  const { modalResponse } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { reviewFormData } = useSelector((state) => state.form);
  const [openSelectDay, setOpenSelectDay] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  useEffect(() => {
    if (modalResponse?.selectedMovie) {
      setSelectedMovie(modalResponse?.selectedMovie);
      dispatch(
        setReviewFormData({
          name: "movieId",
          value: modalResponse.selectedMovie._id,
        })
      );
      dispatch(clearModalResponse());
    }
  }, [modalResponse, dispatch]);

  const handleOnChange = (value, name) => {
    dispatch(
      setReviewFormData({
        name,
        value,
      })
    );
  };

  const input = (options) => {
    return displayInput({
      formData: reviewFormData,
      handleOnChange,
      ...options,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isInvalid = false;
    if (!selectedMovie) {
      dispatch(
        setMessage({
          message: "Please select movie.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }
    let updatedFormData = JSON.parse(JSON.stringify(reviewFormData));

    for (const key in reviewFormData) {
      const value = updatedFormData[key].value;
      if (updatedFormData.hasOwnProperty(key)) {
        if (value === "") {
          console.log(updatedFormData[key], key);
          isInvalid = true;
          updatedFormData[key].validate = inputValidateEnum.INVALID;
        }
      }
    }

    if (isInvalid) {
      dispatch(initReviewFormData(updatedFormData));
      dispatch(
        setMessage({
          message: "All fields are required.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }

    await handleSubmit();
    dispatch(resetReviewFormdata());
  };

  const onSelectDate = (date) => {
    setOpenSelectDay(false);
    handleOnChange(date, "date");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      {/* Body */}
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-auto gap-4 w-[50rem] mobile:min-w-[15rem]">
          <div className="flex gap-4 flex-wrap flex-1 ">
            {/* Select Movie */}
            <div className="flex flex-col gap-3 w-[20rem] mobile:w-[18rem]">
              <span className="text-white">Select movie</span>
              {selectedMovie && (
                <div className="flex gap-3 text-white">
                  <img
                    className="w-[5rem]"
                    src={selectedMovie.poster.url}
                    alt="poster"
                  />
                  <div className="flex flex-col gap-3">
                    <span className="text-wrap max-w-[15rem]">
                      {selectedMovie.title}
                    </span>
                  </div>
                </div>
              )}
              <div
                className="text-white p-3 border border-white w-[15rem] cursor-pointer"
                onClick={() =>
                  dispatch(openModal(modalComponentEnum.SELECT_MOVIE))
                }
              >
                Select Movie
              </div>
            </div>
            {/* Select Movie */}
            <div className="grid flex-auto gap-4">
              <div className="flex gap-4 flex-wrap flex-1">
                <div className="flex flex-col gap-2 relative">
                  <div
                    className="flex items-center"
                    onClick={() => setOpenSelectDay(true)}
                  >
                    <div
                      className={`relative ${
                        reviewFormData.date.validate ===
                          inputValidateEnum.INVALID && "border border-red-500"
                      } rounded-lg`}
                    >
                      <div className="absolute cursor-pointer inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 text-[1.3rem]">
                        <IoCalendar />
                      </div>

                      <input
                        name="date"
                        type="string"
                        value={reviewFormData.date.value}
                        readOnly
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                  {openSelectDay && (
                    <div className="absolute flex flex-col w-[50rem] laptop:w-[20rem] gap-2 z-10  bg-gray-700 p-2 rounded-lg">
                      <div className="flex justify-end">
                        <ImCross
                          className="text-red-500 cursor-pointer"
                          onClick={() => setOpenSelectDay(false)}
                        />
                      </div>

                      <Calendar
                        onSelectDate={onSelectDate}
                        selectDay={reviewFormData.date.value}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex gap-2 items-center text-white">
                  <span>Rating: </span>
                  {Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <FaStar
                        className={`cursor-pointer ${
                          +reviewFormData.rating.value >= index + 1
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleOnChange(index + 1, "rating")}
                        key={`rating ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  {input({ name: "type", type: inputTypeEnum.SELECT })}
                </div>
                <div className="flex-1">{input({ name: "authorName" })}</div>
                <div className="flex-1">{input({ name: "authorCop" })}</div>
              </div>
              <div className="flex-1">
                {input({
                  name: "reviewContent",
                  type: inputTypeEnum.TEXT_AREA,
                })}
              </div>
              <div className="flex-1">{input({ name: "fullReviewLink" })}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[1rem]">
        <button className="btn-blue w-[15rem]" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
