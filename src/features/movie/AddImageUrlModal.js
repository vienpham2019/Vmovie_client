import { useDispatch, useSelector } from "react-redux";
import UploadUrl from "../../components/form/image/UploadUrl";
import { useState } from "react";
import {
  closeModal,
  setModalResponse,
} from "../../components/modal/ModalSlice";

const AddImageUrlModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const { message, name } = modalParams;
  const dispatch = useDispatch();
  const [imgUrl, setImageUrl] = useState("");
  const handleResponse = () => {
    dispatch(setModalResponse({ url: imgUrl, name }));
    dispatch(closeModal());
  };
  return (
    <div className="flex flex-col gap-3 bg-[#2b2b31] p-[1rem] w-[18rem] text-gray-200">
      <p>{message}</p>
      <div className="flex flex-col gap-2 ">
        <UploadUrl
          validate={""}
          value={imgUrl}
          name={name}
          handleOnChange={(val, _) => setImageUrl(val.url)}
        />
        <button onClick={() => handleResponse()} className="border py-1 ">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddImageUrlModal;
