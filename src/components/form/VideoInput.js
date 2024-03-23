import { RiFolderVideoFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../modal/ModalSlice";

const VideoInput = ({ formData, name, setOnChange }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!formData[name].value) return;
    dispatch(setModalParams({ videoUrl: formData[name].value }));
    dispatch(openModal(modalComponentEnum.VIDEO));
  };
  return (
    <>
      <input
        className={`input ${formData[name].validate} border-gray-500 pl-[2rem]`}
        value={formData[name].value}
        onChange={(e) => setOnChange(e.target.value)}
      />
      <div
        className="input_attachment border-l border-gray-500 text-[1.5rem] cursor-pointer"
        onClick={handleClick}
      >
        <RiFolderVideoFill />
      </div>
    </>
  );
};

export default VideoInput;
