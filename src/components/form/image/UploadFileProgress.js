// import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCircleXmark, FaTrash, FaPhotoFilm } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { useUploadImageMutation } from "./imageApiSlice";
import { useEffect, useRef, useState } from "react";

const UploadFileProgress = ({ file }) => {
  const [uploadImage, { isError, isSuccess, isLoading }] =
    useUploadImageMutation();

  const [imageSrc, setImageSrc] = useState(null);
  const [progress, setProgress] = useState(0);
  const isUpload = useRef(false);
  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("file", file);
      isUpload.current = true;
      try {
        const res = await uploadImage({
          payload: formData,
          onProgress: setProgress,
        });
        setImageSrc(res.data.metadata);
        console.log(res.data.metadata.url);
      } catch (error) {
        // Handle error
        console.error(`Error uploading ${file.name}:`, error);
      }
    };

    if (!isUpload.current) uploadFile();
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
        {isSuccess && <img src={imageSrc?.url} alt="Google Drive" />}
      </div>
      <div className="grow flex flex-col justify-evenly">
        <div className="flex gap-1 text-[0.7rem]">
          <p className="max-w-[7rem] truncate">{file.name}</p>
          <span>-</span>
          <div className="font-bold">
            {isError && <span className="text-red-500">Error</span>}
            {isLoading && <span>Uploading</span>}
            {isSuccess && <span className="text-green-500">Loaded</span>}
          </div>
        </div>
        {isSuccess && (
          <small className="text-[0.6rem] text-gray-200">
            {imageSrc?.size}
          </small>
        )}
        {isLoading && (
          <div className="relative w-full h-[0.5rem] bg-gray-200 rounded-full">
            <div
              className="absolute top-0 h-full bg-cyan-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="text-[0.6rem] text-white">{progress}%</span>
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
