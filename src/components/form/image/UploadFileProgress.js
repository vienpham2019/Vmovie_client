// import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCircleXmark, FaTrash, FaPhotoFilm } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "./imageApiSlice";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadFileStatusEnum } from "./UploadFile";
const UploadFileProgress = ({
  uploadImageFile,
  updateUploadObj,
  deleteUploadObj,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading }] = useDeleteImageMutation();

  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const isUpload = useRef(false);
  useEffect(() => {
    const uploadFile = async () => {
      if (uploadImageFile.status !== uploadFileStatusEnum.LOADING) return;
      const { file } = uploadImageFile;
      const formData = new FormData();
      const blob = file.slice(0, file.size, file.type);
      const uuid = uuidv4();
      const newFile = new File([blob], `${uuid}.${file.type.split("/")[1]}`, {
        type: file.type,
      });
      formData.append("imgFile", newFile);
      isUpload.current = true;
      try {
        const res = await uploadImage({
          payload: formData,
          onProgress: setProgress,
        });
        if (res?.error) {
          setErrorMessage(res.error.message);
          updateUploadObj({
            payload: {
              imageSrc: null,
              status: uploadFileStatusEnum.ERROR,
            },
            key: file.name,
          });
        }
        if (res?.data) {
          updateUploadObj({
            payload: {
              imageSrc: res.data.metadata,
              status: uploadFileStatusEnum.COMPLETED,
            },
            key: file.name,
          });
        }
      } catch (error) {
        // Handle error
        console.error(`Error uploading ${file.name}:`, error);
      }
    };

    if (!isUpload.current) uploadFile();
  }, [uploadImageFile, uploadImage, updateUploadObj]);

  useEffect(() => {
    setProgress(0);
  }, []);

  const handleRemove = async () => {
    try {
      if (uploadImageFile.status === uploadFileStatusEnum.COMPLETED) {
        await deleteImage(uploadImageFile.imageSrc.name);
      }
      deleteUploadObj(uploadImageFile.file.name);
    } catch (error) {
      console.error(error);
    }
  };

  if (deleteLoading) {
    return (
      <div className="animate-pulse skeleton h-[4rem] bg-cyan-900 rounded-sm flex gap-2 p-2">
        <div className="w-[4rem] aspect-square bg-gray-500 rounded-sm"></div>
        <div className="grow grid">
          <div className="h-[1rem] bg-gray-500 rounded-sm"></div>{" "}
          <div className="h-[1rem] bg-gray-500 rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[4rem] bg-cyan-900 rounded-sm flex gap-2 p-2">
      <div className="rounded-sm overflow-hidden w-[4rem] flex-none flex items-center justify-center">
        {!uploadImageFile.imageSrc && (
          <span className="text-[2rem]">
            <FaPhotoFilm />
          </span>
        )}{" "}
        {uploadImageFile.imageSrc && (
          <img
            className="rounded-sm"
            src={uploadImageFile.imageSrc.url}
            alt="Google Drive"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <div className="flex gap-1 text-[0.7rem]">
          <p className="max-w-[12rem] mobile:max-w-[10rem] mobileM:w-[4rem] truncate">
            {uploadImageFile.file.name}
          </p>
          <div className="font-bold capitalize">
            {uploadImageFile.status === uploadFileStatusEnum.ERROR && (
              <span className="text-red-500">{uploadImageFile.status}</span>
            )}
            {uploadImageFile.status === uploadFileStatusEnum.LOADING && (
              <span>{uploadImageFile.status}</span>
            )}
            {uploadImageFile.status === uploadFileStatusEnum.COMPLETED && (
              <span className="text-green-500">{uploadImageFile.status}</span>
            )}
          </div>
        </div>
        {uploadImageFile.imageSrc && (
          <div className="grid gap-1">
            <small className="text-[0.6rem] text-gray-200">
              <strong>Size: </strong>
              {uploadImageFile.imageSrc.size}
            </small>
            <small className="text-[0.6rem] text-gray-200">
              <strong>Type: </strong>
              {uploadImageFile.imageSrc.mimeType}
            </small>
          </div>
        )}
        {uploadImageFile.status === uploadFileStatusEnum.LOADING && (
          <div className="relative w-full h-[0.5rem] bg-gray-200 rounded-full">
            <div
              className="absolute top-0 h-full bg-cyan-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="text-[0.6rem] text-white">{progress}%</span>
          </div>
        )}
        {uploadImageFile.status === uploadFileStatusEnum.ERROR && (
          <div className="text-[#f71e1e] flex items-center gap-1">
            <span className="text-[1.1rem]">
              <TiWarning />
            </span>
            <span className="text-[0.7rem]">{errorMessage}</span>{" "}
          </div>
        )}
      </div>
      <div
        className="w-[2rem] flex-none flex items-center justify-center text-[1.2rem] cursor-pointer"
        onClick={handleRemove}
      >
        {uploadImageFile.imageSrc ||
        uploadImageFile.status === uploadFileStatusEnum.ERROR ? (
          <FaTrash />
        ) : (
          <FaCircleXmark />
        )}
      </div>
    </div>
  );
};

export default UploadFileProgress;
