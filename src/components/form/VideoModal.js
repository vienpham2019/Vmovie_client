import { useSelector } from "react-redux";

const VideoModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  return (
    <div className="w-[40rem] mobile:w-[15rem]">
      <iframe
        className="w-full aspect-video rounded-md"
        src={modalParams.videoUrl}
        title={modalParams.videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoModal;
