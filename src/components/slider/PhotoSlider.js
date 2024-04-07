import Slider from "./Slider";

const PhotoSlider = ({
  photos = [
    "https://static01.nyt.com/images/2019/12/24/arts/24justmercy-hppromo/24justmercy-hppromo-superJumbo-v3.jpg",
    "https://www.usatoday.com/gcdn/presto/2020/01/10/USAT/2d786a0a-bfbf-4ad6-aa6d-d4286e3f8709-rev-1-JM-FP-0060_High_Res_JPEG.jpeg",
    "https://www.hollywoodreporter.com/wp-content/uploads/2020/01/just_mercy_-_publicity_still_-_embed_2_-2019.jpg?w=928",
    "https://www.oxygen.com/sites/oxygen/files/2019-12/just-mercy-wb-9.jpg",
    "https://dims.apnews.com/dims4/default/9992bd5/2147483647/strip/true/crop/3000x1688+0+0/resize/599x337!/quality/90/?url=https%3A%2F%2Fstorage.googleapis.com%2Fafs-prod%2Fmedia%2Fd296951d62484e51802229df44ffbb22%2F3000.jpeg",
  ],
}) => {
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
