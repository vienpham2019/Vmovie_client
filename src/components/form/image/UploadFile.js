import { useState } from "react";
import { IoIosImages } from "react-icons/io";
import UploadFileProgress from "./UploadFileProgress";

const uploadFileStatusEnum = Object.freeze({
  ERROR: "Error",
  COMPLETED: "Completed",
  LOADING: "Loading",
});

const UploadFile = () => {
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

  return (
    <div className="flex flex-wrap justify-center p-2 gap-[1rem] border rounded-md relative">
      <span className="text-[0.8rem] px-[0.5rem] text-gray-200 absolute -top-3 left-3 bg-[#2b2b31] rounded capitalize">
        name *
      </span>
      <div className="border border-dashed flex-1 min-w-[17.5rem] max-w-[25rem] rounded-md text-center text-gray-300 h-[15rem] flex flex-col justify-center items-center gap-[0.6rem] bg-gray-800">
        <div className="text-[4rem]">
          <IoIosImages />
        </div>
        <span className="text-[0.9rem]">Drag image here to upload</span>
        <span className="text-gray-400 text-[0.8rem]">Or</span>
        <div>
          <input
            type="file"
            className="hidden appearance-none"
            // accept="image/*"
            id="fileInput"
            placeholder="Browse files"
            onChange={handleOnchange}
            multiple
          />
          <label htmlFor="fileInput" className="cursor-pointer text-cyan-400">
            Choose image
          </label>
        </div>
        <div className="text-gray-500 grid text-[0.8rem] gap-[0.3rem]">
          <span>Support JPEG, JPG, PNG.</span>
          <span>Maximim file size is 5MB.</span>
        </div>
      </div>
      {Object.keys(uploadImage).length !== 0 && (
        <div className="flex flex-col flex-auto min-w-[17.5rem] max-w-[25rem] text-gray-300 gap-2 rounded-md overflow-y-auto overflow-x-auto px-1 max-h-[15rem]">
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
