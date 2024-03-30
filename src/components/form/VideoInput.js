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
        className="input_attachment rounded-sm bg-gray-700 border border-l-0 border-gray-500 text-[1.5rem] cursor-pointer"
        style={{ height: "2.5rem" }}
        onClick={handleClick}
      >
        <RiFolderVideoFill />
      </div>
    </>
  );
};

export default VideoInput;
