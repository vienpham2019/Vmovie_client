import { useEffect, useState } from "react";
import { displayInput } from "./formUtil";
import { inputTypeEnum, inputValidateEnum } from "./formEnum";
import { useDispatch } from "react-redux";
import {
  notificationMessageEnum,
  setMessage,
} from "../notificationMessage/notificationMessageSlice";

const MovieForm = ({ initFormData, handleOnSubmit, setOnChange }) => {
  const stateFormData = {
    title: {
      value: "",
      validate: "",
    },
    yearRelease: {
      value: "",
      validate: "",
    },
    runtime: {
      value: "",
      validate: "",
    },
    rating: {
      value: "",
      validate: "",
      options: ["G", "PG", "PG_13", "R", "NC_17"],
    },
    genre: {
      value: [],
      validate: "",
      options: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "Thriller",
        "War",
        "Western",
      ],
    },
    country: {
      value: [],
      validate: "",
    },
    language: {
      value: [],
      validate: "",
    },
    movieDetail: {
      value: "",
      validate: "",
    },
    background: {
      value: {},
      validate: "",
    },
    poster: {
      value: {},
      validate: "",
    },
    cast: {
      value: [],
      validate: "",
    },
    director: {
      value: [],
      validate: "",
    },
    producer: {
      value: [],
      validate: "",
    },
    writer: {
      value: [],
      validate: "",
    },
    studio: {
      value: [],
      validate: "",
    },
    photos: {
      value: [],
      validate: "",
    },
    trailer: {
      value: "",
      validate: "",
    },
  };
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(stateFormData);

  useEffect(() => {
    const setInitFormData = () => {
      setFormData(() => ({ ...initFormData, ...stateFormData }));
    };
    setInitFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value,
        validate: "",
      },
    }));
  };

  const input = (options) => {
    return displayInput({ formData, handleOnChange, ...options });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isInvalid = false;

    const updatedFormData = { ...formData };

    for (const key in updatedFormData) {
      if (updatedFormData.hasOwnProperty(key)) {
        if (
          updatedFormData[key].value === "" ||
          updatedFormData[key].value?.length === 0
        ) {
          isInvalid = true;
          updatedFormData[key].validate = inputValidateEnum.INVALID;
        }
      }
    }

    if (isInvalid) {
      dispatch(
        setMessage({
          message: "All fields are required.",
          messageType: notificationMessageEnum.ERROR,
        })
      );
      setFormData(updatedFormData);
      return;
    }

    await handleOnSubmit(formData);
    setFormData(initFormData);
  };

  return (
    <form
      action="submit"
      onSubmit={onSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-[5] gap-4 min-w-[30rem] mobile:min-w-[15rem]">
          {input({ name: "title" })}
          {input({ name: "movieDetail", type: inputTypeEnum.TEXT_AREA })}
          {input({ name: "trailer", type: inputTypeEnum.VIDEO })}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[27rem] mobile:min-w-[15rem]">
              {input({ name: "poster", type: inputTypeEnum.FILE })}
            </div>
            <div className="flex-1 min-w-[27rem] mobile:min-w-[15rem]">
              {input({ name: "background", type: inputTypeEnum.FILE })}
            </div>
          </div>
          <div className="flex-[5] min-w-[15rem]">
            {input({ name: "photos", type: inputTypeEnum.FILE })}
          </div>
        </div>
        <div className="grid gap-4 flex-auto min-w-[25rem] mobile:min-w-[15rem]">
          {/*  */}
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto min-w-[5rem]">
              {input({ name: "rating", type: inputTypeEnum.SELECT })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {input({ name: "yearRelease" })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {input({ name: "runtime" })}
            </div>
          </div>
          {/*  */}
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
        <button className="btn-red w-[15rem]" type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
