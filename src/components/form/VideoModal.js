import { useSelector } from "react-redux";
const VideoModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const parts = modalParams.videoUrl.split("/");
  const videoId = parts[parts.length - 1]; // Get the last part of the URL
  return (
    <div className="relative w-[80vw] max-w-[80rem] overflow-x-hidden">
      <iframe
        className="w-full aspect-video"
        src={`${modalParams.videoUrl}?autoplay=1&rel=0&loop=1&playlist=${videoId}`}
        title={modalParams.videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default VideoModal;
