import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import { FaCircleXmark, FaTrash, FaPhotoFilm } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";

const UploadFile = () => {
  const isLoading = false;
  const isSuccess = false;
  const isError = true;
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
            accept="image/*"
            id="fileInput"
            placeholder="Browse files"
          />
          <label for="fileInput" className="cursor-pointer text-cyan-400">
            Choose image
          </label>
        </div>
      </div>
      <div className="flex flex-col text-gray-300 gap-2 rounded-md overflow-y-auto overflow-x-hidden min-w-[15rem] mx-2 flex-1 max-h-[15rem] p-2">
        <div className="h-[4rem] bg-cyan-800 rounded-sm flex gap-2 p-2">
          <div className="rounded-sm overflow-hidden w-[4rem] flex items-center justify-center">
            {!isSuccess && (
              <span className="text-[2rem]">
                <FaPhotoFilm />
              </span>
            )}{" "}
            {isSuccess && (
              <img
                src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p170620_p_v8_az.jpg"
                alt="iron man"
              />
            )}
          </div>
          <div className="grow flex flex-col justify-evenly">
            <div className="flex gap-1 text-[0.7rem]">
              <p className="max-w-[7rem] truncate">
                image_03.png Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Illum repellat sunt soluta corporis natus quasi! Ex
                perferendis, vero numquam ratione, vel id nulla quia omnis
                pariatur explicabo veniam iusto inventore.
              </p>
              <span>-</span>
              {isError && <span className="text-[#f71e1e]">Error</span>}
              {isLoading && <span>Uploading</span>}
              {isSuccess && <span className="text-green-500">Uploaded</span>}
            </div>
            {isSuccess && (
              <small className="text-[0.6rem] text-gray-200">87.42KB</small>
            )}
            {isLoading && (
              <div className="relative w-full h-[0.5rem] bg-gray-200 rounded-full">
                <div className="absolute top-0 w-[50%] h-full bg-cyan-600 rounded-full"></div>
              </div>
            )}
            {isError && (
              <div className="text-[#f71e1e] flex items-center gap-1">
                <span className="text-[0.8rem]">Upload failed</span>{" "}
                <span className="text-[1.1rem]">
                  <TiWarning />
                </span>
              </div>
            )}
          </div>
          <div className="w-[2rem] flex items-center justify-center text-[1.2rem] cursor-pointer">
            {isSuccess ? <FaTrash /> : <FaCircleXmark />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
