import { displayInput } from "./formUtil";
import { inputTypeEnum, inputValidateEnum } from "./formEnum";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../notificationMessage/notificationMessageSlice";
import {
  initMovieFormData,
  resetMovieFormdata,
  setMovieFormData,
} from "./formSlice";

const MovieForm = ({ handleOnSubmit }) => {
  const dispatch = useDispatch();
  const { movieFormData } = useSelector((state) => state.form);

  const handleOnChange = (value, name) => {
    dispatch(
      setMovieFormData({
        name,
        value,
      })
    );
  };

  const input = (options) => {
    return displayInput({
      formData: movieFormData,
      handleOnChange,
      ...options,
      db: "movie",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isInvalid = false;

    let updatedFormData = JSON.parse(JSON.stringify(movieFormData));

    for (const key in movieFormData) {
      if (updatedFormData.hasOwnProperty(key)) {
        if (
          updatedFormData[key].value === "" ||
          updatedFormData[key].value?.length === 0 ||
          Object.keys(updatedFormData[key].value).length === 0
        ) {
          isInvalid = true;
          updatedFormData[key].validate = inputValidateEnum.INVALID;
        }
      }
    }

    if (isInvalid) {
      dispatch(initMovieFormData(updatedFormData));
      dispatch(
        setMessage({
          message: "All fields are required.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      return;
    }

    await handleOnSubmit();
    dispatch(resetMovieFormdata());
  };

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-auto gap-4 w-[50rem] mobile:min-w-[15rem]">
          {input({ name: "title" })}
          {input({ name: "movieDetail", type: inputTypeEnum.TEXT_AREA })}
          {input({ name: "trailer", type: inputTypeEnum.VIDEO })}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[27rem] mobile:min-w-[15rem]">
              {input({ name: "poster", type: inputTypeEnum.FILE })}
            </div>
            <div className="flex-1 min-w-[27rem] mobile:min-w-[15rem]">
              {input({ name: "thumbnail", type: inputTypeEnum.FILE })}
            </div>
          </div>
          <div className="flex-[5] min-w-[15rem]">
            {input({ name: "photos", type: inputTypeEnum.FILE })}
          </div>
        </div>
        <div className="grid content-start gap-4 flex-auto min-w-[25rem] mobile:min-w-[15rem]">
          {/*  */}
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto min-w-[5rem]">
              {input({ name: "rating", type: inputTypeEnum.SELECT })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {input({ name: "dateRelease" })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {input({ name: "runtime" })}
            </div>
          </div>
          {/*  */}
          <div className="flex-1">{input({ name: "awards" })}</div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-1 w-[15rem]">
              {input({ name: "country", type: inputTypeEnum.INPUT_LIST })}
            </div>
            <div className="flex-1 w-[15rem]">
              {input({ name: "language", type: inputTypeEnum.INPUT_LIST })}
            </div>
          </div>
          {/*  */}
          <div className="flex-1">
            {input({ name: "genre", type: inputTypeEnum.SELECT })}
          </div>
          {/*  */}
          <div className="flex-1 min-w-[12rem]">
            {input({ name: "cast", type: inputTypeEnum.INPUT_LIST })}
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-[5] w-[20rem] mobile:w-[15rem]">
              {input({ name: "writer", type: inputTypeEnum.INPUT_LIST })}
            </div>
            <div className="flex-auto w-[8rem]">
              {input({ name: "director", type: inputTypeEnum.INPUT_LIST })}
            </div>
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-1">
              {input({ name: "producer", type: inputTypeEnum.INPUT_LIST })}
            </div>
            <div className="flex-1">
              {input({ name: "studio", type: inputTypeEnum.INPUT_LIST })}
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

export default MovieForm;
