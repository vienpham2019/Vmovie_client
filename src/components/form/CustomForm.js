import { useState } from "react";
import Selection from "./Selection";
import InputList from "./InputList";
import { separatedWords } from "../../util/string";
import UploadFile from "./image/UploadFile";
import { RiFolderVideoFill } from "react-icons/ri";

const CustomForm = () => {
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
      value: "",
      validate: "",
    },
    language: {
      value: "",
      validate: "",
    },
    movieDetail: {
      value: "",
      validate: "",
    },
    backgroundUrl: {
      value: "",
      validate: "",
      type: "single",
    },
    posterUrl: {
      value: "",
      validate: "",
    },
    cast: {
      value: "",
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

  const displayInput = ({ type = "input", inputType = "text", name }) => {
    if (type === "text-area")
      return (
        <div className="input_group ">
          <textarea
            name={name}
            className="text-area h-[6rem] pt-2 resize-none border-gray-500"
          ></textarea>
          <div className="input_title">
            <span>{separatedWords(name)} *</span>
          </div>
        </div>
      );
    if (type === "select") {
      return (
        <div className="input_group ">
          <Selection
            selectOptions={formData[name].options}
            type={typeof formData[name].value === "string" ? "string" : "list"}
          />
          <div className="input_title">
            <span>{separatedWords(name)} *</span>
          </div>
        </div>
      );
    }
    if (type === "input-list") {
      return (
        <div className="input_group">
          <InputList height="h-[2.2rem]" />
          <div className="input_title">
            <span>{separatedWords(name)} *</span>
          </div>
        </div>
      );
    }

    if (type === "file") {
      return (
        <div className="input_group">
          <UploadFile
            name={name}
            type={typeof formData[name].value === "string" ? "single" : "list"}
          />
          <div className="input_title">
            <span>{separatedWords(name)} *</span>
          </div>
        </div>
      );
    }

    if (type === "video") {
      return (
        <div className="input_group">
          <input
            type={inputType}
            className={`input ${formData[name].validate} border-gray-500 pl-[2rem]`}
            // value={formData[name].value}
            // onChange={handleChange}
            required
          />
          <div className="input_attachment border-l border-gray-500 text-[1.5rem] cursor-pointer">
            <RiFolderVideoFill />
          </div>
          <div className="input_title">
            <span>{separatedWords(name)} *</span>
          </div>
        </div>
      );
    }

    return (
      <div className="input_group">
        <input
          type={inputType}
          className={`input ${formData[name].validate} border-gray-500`}
          // value={formData[name].value}
          // onChange={handleChange}
          required
        />
        <div className="input_title">
          <span>{separatedWords(name)} *</span>
        </div>
      </div>
    );
  };

  return (
    <form
      action="submit"
      className="flex flex-col gap-[1rem] p-4 border border-gray-500 rounded bg-[#1f1f1f]"
    >
      <div className="flex flex-wrap gap-4 ">
        <div className="grid flex-[5] gap-4 min-w-[30rem] mobile:min-w-[15rem]">
          {displayInput({ name: "title" })}
          {displayInput({ name: "movieDetail", type: "text-area" })}
          {displayInput({ name: "trailerUrl", type: "video" })}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[23rem] mobile:min-w-[15rem]">
              {displayInput({ name: "posterUrl", type: "file" })}
            </div>
            <div className="flex-1 min-w-[23rem] mobile:min-w-[15rem]">
              {displayInput({ name: "backgroundUrl", type: "file" })}
            </div>
          </div>
          <div className="flex-[5] min-w-[15rem]">
            {displayInput({ name: "photos", type: "file" })}
          </div>
        </div>
        <div className="grid gap-4 flex-auto min-w-[25rem] mobile:min-w-[15rem]">
          {/*  */}
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto min-w-[5rem]">
              {displayInput({ name: "rating", type: "select" })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {displayInput({ name: "yearRelease" })}
            </div>
            <div className="flex-[5] w-[7rem]">
              {displayInput({ name: "runtime" })}
            </div>
          </div>
          {/*  */}
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-1 min-w-[15rem]">
              {displayInput({ name: "country", type: "input-list" })}
            </div>
            <div className="flex-1 min-w-[15rem]">
              {displayInput({ name: "language", type: "input-list" })}
            </div>
          </div>
          {/*  */}
          <div className="flex-1">
            {displayInput({ name: "genre", type: "select" })}
          </div>
          {/*  */}
          <div className="flex-1 min-w-[12rem]">
            {displayInput({ name: "cast", type: "input-list" })}
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-[5]">
              {displayInput({ name: "writer", type: "input-list" })}
            </div>
            <div className="flex-auto w-[8rem]">
              {displayInput({ name: "director", type: "input-list" })}
            </div>
          </div>
          <div className="flex flex-wrap flex-1 gap-4 items-center">
            <div className="flex-1">
              {displayInput({ name: "producer", type: "input-list" })}
            </div>
            <div className="flex-1">
              {displayInput({ name: "studio", type: "input-list" })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="btn-blue w-[15rem]" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
