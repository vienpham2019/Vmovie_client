import { useState } from "react";
import { displayInput } from "./formUtil";

const MovieForm = ({ handleOnSubmit }) => {
  const initFormData = {
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
    backgroundUrl: {
      value: "",
      validate: "",
    },
    posterUrl: {
      value: "",
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
    trailerUrl: {
      value: "",
      validate: "",
    },
  };

  const [formData, setFormData] = useState(initFormData);
  const handleOnChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value,
      },
    }));
    console.log(formData);
  };

  const input = (options) => {
    return displayInput({ formData, handleOnChange, ...options });
  };

  return (
    <form
      action="submit"
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-[5] gap-4 min-w-[30rem] mobile:min-w-[15rem]">
          {input({ name: "title" })}
          {input({ name: "movieDetail", type: "text-area" })}
          {input({ name: "trailerUrl", type: "video" })}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[23rem] mobile:min-w-[15rem]">
              {input({ name: "posterUrl", type: "file" })}
            </div>
            <div className="flex-1 min-w-[23rem] mobile:min-w-[15rem]">
              {input({ name: "backgroundUrl", type: "file" })}
            </div>
          </div>
          <div className="flex-[5] min-w-[15rem]">
            {input({ name: "photos", type: "file" })}
          </div>
        </div>
        <div className="grid gap-4 flex-auto min-w-[25rem] mobile:min-w-[15rem]">
          {/*  */}
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto min-w-[5rem]">
              {input({ name: "rating", type: "select" })}
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
              {input({ name: "country", type: "input-list" })}
            </div>
            <div className="flex-1 w-[15rem]">
              {input({ name: "language", type: "input-list" })}
            </div>
          </div>
          {/*  */}
          <div className="flex-1">
            {input({ name: "genre", type: "select" })}
          </div>
          {/*  */}
          <div className="flex-1 min-w-[12rem]">
            {input({ name: "cast", type: "input-list" })}
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-[5] w-[20rem] mobile:w-[15rem]">
              {input({ name: "writer", type: "input-list" })}
            </div>
            <div className="flex-auto w-[8rem]">
              {input({ name: "director", type: "input-list" })}
            </div>
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-1">
              {input({ name: "producer", type: "input-list" })}
            </div>
            <div className="flex-1">
              {input({ name: "studio", type: "input-list" })}
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
