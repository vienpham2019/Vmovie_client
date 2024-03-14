import { useState } from "react";
import { IoIosImages, IoMdImages } from "react-icons/io";
import UploadFileProgress from "./UploadFileProgress";

const uploadFileStatusEnum = Object.freeze({
  ERROR: "Error",
  COMPLETED: "Completed",
  LOADING: "Loading",
});

const UploadFile = ({ type, name }) => {
  const [uploadImage, setUploadImage] = useState({});

  const handleOnchange = async (e) => {
    const files = e.target.files;
    Object.keys(files).forEach(async (index) => {
      const file = files[index];
      if (!uploadImage[file.name]) {
        setUploadImage((prevFile) => ({
          ...prevFile,
          [file.name]: {
            file,
            imageSrc: null,
            status: uploadFileStatusEnum.LOADING,
          },
        }));
      }
    });
  };

  const updateUploadObj = ({ payload, key }) => {
    setUploadImage((prevUpload) => ({
      ...prevUpload,
      [key]: {
        ...prevUpload[key],
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
      <div className="flex justify-around border border-gray-500 rounded-md bg-[#2b2b31] h-[5rem] min-w-[15rem] items-center">
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
          <div className="flex flex-1 justify-around items-center px-4">
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
    <div className="flex flex-wrap justify-center p-2 gap-[1rem] border border-gray-500 bg-[#2b2b31] rounded-md">
      <div className="border border-dashed flex-1 min-w-[14rem] max-w-[25rem] mobile:max-w-[14rem] rounded-md text-center text-gray-300 h-[15rem] flex flex-col justify-center items-center gap-[0.6rem] bg-gray-800">
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
