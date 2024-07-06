import Slider from "./Slider";

const PhotoSlider = ({ photos = [] }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1,
    },
  };
  const handleDisplay = () => {
    return photos.map((photoUrl, index) => (
      <div
        key={"photos " + index}
        className="w-full h-full p-1 text-white flex justify-center items-center"
      >
        <img className="rounded-md" src={photoUrl} alt={"media " + index} />
      </div>
    ));
  };
  if (photos.length === 0) return;
  return (
    <div className="w-[75rem] laptop:w-[80vw] mobile:max-w-[15rem]">
      <Slider
        totalAmount={photos.length}
        handleDisplay={handleDisplay}
        centerMode={true}
        responsive={responsive}
        dots={true}
      />
    </div>
  );
};

export default PhotoSlider;
