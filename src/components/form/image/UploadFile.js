import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import UploadFileProgress from "./UploadFileProgress";

const UploadFile = () => {
  const [uploadImage, setUploadImage] = useState([]);
  const handleOnchange = async (e) => {
    const files = e.target.files;

    Object.keys(files).forEach(async (index) => {
      const file = files[index];
      if (!uploadImage.some((uploadFile) => uploadFile.name === file.name)) {
        setUploadImage((prevImage) => [...prevImage, file]);
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center py-2 gap-2 border rounded-md relative max-w-[42rem]">
      <span className="text-[0.8rem] px-[0.5rem] text-gray-200 absolute -top-3 left-3 bg-[#2b2b31] rounded capitalize">
        name *
      </span>
      <div className="border border-dashed rounded-md text-center text-gray-300 min-w-[15rem] h-[15rem] mx-2 flex-1  flex flex-col justify-center items-center gap-[0.6rem] bg-gray-800">
        <div className="text-[4rem]">
          <AiOutlineCloudUpload />
        </div>
        <span className="text-[0.9rem]">Drag image here to upload</span>
        <span className="">Or</span>
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
      </div>
      <div className="flex flex-col text-gray-300 gap-2 rounded-md overflow-y-auto overflow-x-hidden min-w-[15rem] mx-2 flex-1 max-h-[15rem] p-2">
        {uploadImage.map((imageFile) => (
          <div key={imageFile.name}>
            <UploadFileProgress file={imageFile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
