import { useState } from "react";
import { IoIosImages, IoMdImages } from "react-icons/io";
import UploadFileProgress from "./UploadFileProgress";
import { v4 as uuidv4 } from "uuid";
import { changeImageName } from "../../../util/file";

const uploadFileStatusEnum = Object.freeze({
  ERROR: "Error",
  COMPLETED: "Completed",
  LOADING: "Loading",
});

const UploadFile = ({ type, validate, name }) => {
  const [uploadImage, setUploadImage] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging === false) setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging === false) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging === true) setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    let files = e.dataTransfer.files;
    if (type === "single") {
      files = [files[0]];
    }
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newUploads = {}; // Object to accumulate new uploads

    // Iterate over each file
    for (const file of files) {
      if (!uploadImage[file.name]) {
        const uuid = uuidv4();
        const newFile = changeImageName(file, `movie_${name}_${uuid}`);
        newUploads[file.name] = {
          file: newFile,
          originalName: file.name,
          imageSrc: null,
          status: uploadFileStatusEnum.LOADING,
        };
      }
    }

    // Update the state with all new uploads
    setUploadImage((prevUploadImage) => ({
      ...prevUploadImage,
      ...newUploads,
    }));
  };

  const handleOnchange = async (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const updateUploadObj = ({ payload, originalName }) => {
    setUploadImage((prevUpload) => ({
      ...prevUpload,
      [originalName]: {
        ...prevUpload[originalName],
        ...payload,
      },
    }));
  };

  const deleteUploadObj = (key) => {
    setUploadImage((prevUpload) => {
      const updatedUploadImage = { ...prevUpload };

      delete updatedUploadImage[key];

      return updatedUploadImage; // Return the updated state object
    });
  };

  if (type === "single") {
    return (
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-around border ${
          isDragging ? "bg-[#393941]" : "bg-[#2b2b31]"
        } border-gray-500 ${validate} rounded-md h-[5rem] min-w-[15rem] items-center`}
      >
        {Object.keys(uploadImage).length !== 0 ? (
          <div className="text-white w-full pl-2">
            {Object.entries(uploadImage).map(([key, val]) => (
              <div key={key}>
                <UploadFileProgress
                  uploadImageFile={val}
                  updateUploadObj={updateUploadObj}
                  deleteUploadObj={deleteUploadObj}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-1 justify-around ${validate} items-center px-4`}
          >
            <div className="grid gap-[2px] justify-items-center ">
              <input
                type="file"
                className="hidden appearance-none"
                accept="image/*"
                id={`fileInput_${name}_single`}
                placeholder="Browse files"
                onChange={handleOnchange}
              />
              <label
                htmlFor={`fileInput_${name}_single`}
                className="cursor-pointer flex items-center text-cyan-400 font-thin px-2"
              >
                Choose image
              </label>
              <span className="text-gray-500 text-[10px]">Or</span>
              <span className="text-gray-300 text-[13px]">
                Drag image here to upload
              </span>
            </div>
            <div className="text-gray-500 grid text-[0.8rem] gap-[0.3rem] mobile:hidden">
              <span>Support JPEG, JPG, PNG.</span>
              <span>Maximim file size is 5MB.</span>
            </div>
          </div>
        )}
        <div className="text-[2rem] text-gray-300 flex items-center px-4 mobile:hidden">
          <IoMdImages />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap justify-center p-2 gap-[1rem] ${validate} border border-gray-500 bg-[#2b2b31] rounded-md`}
    >
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border border-dashed flex-1 min-w-[14rem] max-w-[25rem] mobile:max-w-[14rem] rounded-md text-center text-gray-300 h-[15rem] flex flex-col justify-center items-center gap-[0.6rem] ${
          isDragging ? "bg-cyan-950" : "bg-gray-800"
        }`}
      >
        <div className="text-[4rem]">
          <IoIosImages />
        </div>
        <span className="text-[0.9rem]">Drag image here to upload</span>
        <span className="text-gray-400 text-[0.8rem]">Or</span>
        <div>
          <input
            type="file"
            className="hidden appearance-none"
            accept="image/*"
            id={`fileInput_${name}_list`}
            placeholder="Browse files"
            onChange={handleOnchange}
            multiple
          />
          <label
            htmlFor={`fileInput_${name}_list`}
            className="cursor-pointer text-cyan-400"
          >
            Choose image
          </label>
        </div>
        <div className="text-gray-500 grid text-[0.8rem] gap-[0.3rem]">
          <span>Support JPEG, JPG, PNG.</span>
          <span>Maximim file size is 5MB.</span>
        </div>
      </div>
      {Object.keys(uploadImage).length !== 0 && (
        <div className="flex flex-col py-2 text-gray-300 gap-2 rounded-md overflow-y-auto overflow-x-hidden max-h-[15rem]">
          {Object.entries(uploadImage).map(([key, val]) => (
            <div key={key}>
              <UploadFileProgress
                uploadImageFile={val}
                updateUploadObj={updateUploadObj}
                deleteUploadObj={deleteUploadObj}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { uploadFileStatusEnum };

export default UploadFile;
