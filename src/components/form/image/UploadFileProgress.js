// import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaTrash, FaPhotoFilm } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "./imageApiSlice";
import { useEffect, useRef, useState } from "react";
import { uploadFileStatusEnum } from "./UploadFile";
import { useSelector } from "react-redux";

const UploadFileProgress = ({
  uploadImageFile,
  updateUploadObj,
  deleteUploadObj,
  field,
  db,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading }] = useDeleteImageMutation();
  const { id } = useSelector((state) => state.form);
  const [errorMessage, setErrorMessage] = useState(null);
  const isUpload = useRef(false);
  useEffect(() => {
    const uploadFile = async () => {
      if (uploadImageFile.status !== uploadFileStatusEnum.LOADING) return;
      const { file } = uploadImageFile;
      const fileName = file.name;
      const formData = new FormData();
      formData.append("imgFile", file);
      isUpload.current = true;
      try {
        const res = await uploadImage({
          payload: formData,
          field,
          db,
          id,
        });
        if (res?.error) {
          setErrorMessage(res.error.data.message);
          updateUploadObj({
            payload: {
              status: uploadFileStatusEnum.ERROR,
            },
            fileName,
          });
        } else if (res?.data) {
          updateUploadObj({
            payload: {
              imageSrc: res.data.metadata,
              status: uploadFileStatusEnum.COMPLETED,
            },
            fileName,
          });
        }
      } catch (error) {
        // Handle error
        console.error(`Error uploading ${fileName}:`, error);
      }
    };

    if (!isUpload.current) uploadFile();
  }, [uploadImageFile, uploadImage, updateUploadObj, db, field, id]);

  const handleRemove = async () => {
    try {
      if (uploadImageFile.status === uploadFileStatusEnum.COMPLETED) {
        await deleteImage({
          fileName: uploadImageFile.imageSrc.name,
          field,
          db,
          id,
        });
        deleteUploadObj(uploadImageFile.imageSrc.name);
        return;
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
    <div className="h-[4rem] bg-cyan-900 rounded-sm flex gap-2 p-1 mobile:max-w-[15rem]">
      <div className="rounded-sm overflow-hidden w-[4rem] mobile:w-[2rem] flex-none flex items-center justify-center">
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
          <p className="max-w-[12rem] mobile:max-w-[8rem] mobileM:w-[4rem] truncate">
            {uploadImageFile.status === uploadFileStatusEnum.COMPLETED
              ? uploadImageFile.imageSrc.name
              : uploadImageFile.file.name}
          </p>
          <div className="font-bold capitalize mobile:hidden">
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
            <small className="text-[0.6rem] text-gray-200 truncate max-w-[10rem]">
              <strong>Type: </strong>
              {uploadImageFile.imageSrc.mimeType}
            </small>
          </div>
        )}
        {uploadImageFile.status === uploadFileStatusEnum.LOADING && (
          <div className="relative w-[10rem] h-[0.5rem] bg-gray-200 rounded-full">
            <div className="absolute top-0 h-full bg-cyan-600 rounded-full"></div>
            <span className="text-[0.6rem] text-white">0%</span>
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
        <FaTrash />
      </div>
    </div>
  );
};

export default UploadFileProgress;
