import { useEffect, useRef, useState } from "react";
import UploadFile from "../../components/form/image/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLink } from "react-icons/io";
import { FaFile } from "react-icons/fa6";
import {
  useCreateProductOptionMutation,
  useUpdateProductOptionMutation,
} from "./productApiSlice";
import { closeModal } from "../../components/modal/ModalSlice";
import { useDeleteImageMutation } from "../../components/form/image/imageApiSlice";

const imageModeEnum = Object.freeze({
  URL: "url",
  FILE: "file",
});

const modeEnum = Object.freeze({
  ADD: "Add",
  EDIT: "Edit",
});
const ProductOptionsModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const [name, setName] = useState("");
  const [mode, setMode] = useState(modeEnum.ADD);
  const [addImageType, setAddImageType] = useState(imageModeEnum.URL);
  const [imageUrl, setImageUrl] = useState();
  const [createOption] = useCreateProductOptionMutation();
  const [editOption] = useUpdateProductOptionMutation();
  const [deleteImage] = useDeleteImageMutation();
  const dispatch = useDispatch();
  const uploadImageFileName = useRef("");

  useEffect(() => {
    const { name: paramsName, img: paramImg } = modalParams?.option;
    if (paramsName || paramImg) {
      setName(paramsName);
      setImageUrl(paramImg);
      setMode(modeEnum.EDIT);
    }
    return async () => {
      if (uploadImageFileName.current !== "") {
        await deleteImage({ fileName: uploadImageFileName.current });
      }
    };
  }, [modalParams]);

  const handleSubmit = async () => {
    const payload = {
      ...modalParams.option,
      name,
      img: imageUrl || null,
    };
    let res;
    if (mode === modeEnum.ADD) {
      res = await createOption(payload);
    } else if (mode === modeEnum.EDIT) {
      res = await editOption(payload);
    }
    uploadImageFileName.current = "";
    if (res?.data?.message) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-[#2b2b31] p-[1rem]">
      <div className="input_group w-[30rem] mobile:w-[15rem]">
        <input
          type="text"
          className={`input border-gray-500 `}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={`input_title `}>
          <span>
            Name <small className="text-red-400">*</small>
          </span>
        </div>
      </div>
      <div className="text-gray-200 flex gap-4">
        <span>Add Image</span>
        <button
          className={` ${
            addImageType === imageModeEnum.URL && "text-cyan-400"
          } tooltip_container`}
          onClick={() => setAddImageType(imageModeEnum.URL)}
        >
          <IoMdLink />
          <span className="tooltip tooltip-bottom">Url</span>
        </button>
        <button
          className={` ${
            addImageType === imageModeEnum.FILE && "text-cyan-400"
          } tooltip_container`}
          onClick={() => setAddImageType(imageModeEnum.FILE)}
        >
          <FaFile />
          <span className="tooltip tooltip-bottom">File</span>
        </button>
      </div>
      {addImageType === imageModeEnum.URL ? (
        <div className="input_group">
          <input
            type="text"
            className={`input border-gray-500 `}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className={`input_title `}>
            <span>Image</span>
          </div>
        </div>
      ) : (
        <div className="input_group">
          <UploadFile
            type={"single"}
            validate={""}
            value={""}
            name={"flavor img"}
            setOnChange={(value) => {
              setImageUrl(value.url);
              uploadImageFileName.current = value.name;
            }}
          />
          <div className={`input_title `}>
            <span>Image</span>
          </div>
        </div>
      )}

      <button
        className={`min-w-[15rem] border flex justify-center hover:bg-gray-500 border-gray-500 rounded py-2 cursor-pointer
        ${!name ? "text-gray-600 pointer-events-none" : "text-gray-300"}
        `}
        onClick={handleSubmit}
      >
        {mode}
      </button>
    </div>
  );
};

export default ProductOptionsModal;
