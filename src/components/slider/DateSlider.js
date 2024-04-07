import Slider from "./Slider";

const DateSlider = ({ dates = [] }) => {
  const width = 4;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 5,
      slidesToSlide: 5,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };
  const handleDisplay = () => {
    return dates.map((date, index) => (
      <div
        key={"date slider " + index}
        className={`w-[${width}rem] h-[4rem] text-gray-200 px-[4px] flex cursor-pointer`}
      >
        <div className="border border-gray-600 w-full flex flex-col py-1 justify-center items-center gap-1 bg-[rgb(33,53,72)] hover:bg-[rgb(42,68,92)] rounded-md">
          <span className="text-[0.5rem]">{date.split("-")[0]}</span>
          <span className="text-[0.9rem] font-bold">{date.split("-")[1]}</span>
          <span className="text-[0.5rem]">{date.split("-")[2]}</span>
        </div>
      </div>
    ));
  };
  if (dates.length === 0) return;
  return (
    <div className={`w-[${width * 5}rem] mobile:w-[12rem]`}>
      <Slider
        displayAmount={5}
        totalAmount={10}
        minWidth={"20rem"}
        dots={false}
        handleDisplay={handleDisplay}
        responsive={responsive}
      />
    </div>
  );
};

export default DateSlider;
