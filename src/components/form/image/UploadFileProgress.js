// import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCircleXmark, FaTrash, FaPhotoFilm } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { useUploadImageMutation } from "./imageApiSlice";
import { useEffect, useRef, useState } from "react";

const UploadFileProgress = ({ file }) => {
  const [uploadImage, { isError, isLoading, isSuccess }] =
    useUploadImageMutation();

  //   const [imageSrc, setImageSrc] = useState(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append(file.name, file);
      try {
        await uploadImage({
          payload: formData,
          onProgress: setProgress,
        });
      } catch (error) {
        // Handle error
        console.error(`Error uploading ${file.name}:`, error);
      }
    };

    uploadFile();
  }, [file, uploadImage]);

  useEffect(() => {
    setProgress(0);
  }, []);
  return (
    <div className="h-[4rem] bg-cyan-900 rounded-sm flex gap-2 p-2">
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
            perferendis, vero numquam ratione, vel id nulla quia omnis pariatur
            explicabo veniam iusto inventore.
          </p>
          <span>-</span>
          <div className="font-bold">
            {isError && <span className="text-red-500">Error</span>}
            {isLoading && <span>Uploading</span>}
            {isSuccess && <span className="text-green-500">Uploaded</span>}
          </div>
        </div>
        {isSuccess && (
          <small className="text-[0.6rem] text-gray-200">87.42KB</small>
        )}
        {isLoading && (
          <div className="relative w-full h-[0.5rem] bg-gray-200 rounded-full">
            <div
              className="absolute top-0 h-full bg-cyan-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
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
  );
};

export default UploadFileProgress;
