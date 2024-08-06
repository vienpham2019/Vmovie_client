import { getWeekday } from "../../util/date";
import Slider from "./Slider";

const DateSlider = ({ dates = [], handleSelecDay, selectedDate }) => {
  const width = 4;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: Math.min(5, dates.length),
      slidesToSlide: Math.min(5, dates.length),
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: Math.min(5, dates.length),
      slidesToSlide: Math.min(5, dates.length),
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: Math.min(3, dates.length),
      slidesToSlide: Math.min(3, dates.length),
    },
  };
  const handleDisplay = () => {
    return dates.map((date, index) => {
      const [day, month] = date.split("/");
      const weekday = getWeekday(date);
      return (
        <div
          onClick={() => handleSelecDay(date)}
          key={"date slider " + index}
          className={`w-[${width}rem]  h-[4rem] text-gray-200 px-[4px] flex cursor-pointer `}
        >
          <div
            className={`border ${
              selectedDate === date
                ? " border-cyan-800 bg-[rgb(19,93,136)]"
                : "border-gray-600 bg-[rgb(33,53,72)]"
            }  w-full flex flex-col py-1 justify-center items-center gap-1 hover:bg-[rgb(42,68,92)] rounded-md`}
          >
            <span className="text-[0.9rem] font-bold">{weekday}</span>
            <span className="text-[0.7rem]">
              {month} / {day}
            </span>
          </div>
        </div>
      );
    });
  };
  if (dates.length === 0) return;
  return (
    <div
      className={`w-[${
        width * 5
      }rem] mobile:w-[12rem] border-b border-gray-500 py-2`}
    >
      <Slider
        totalAmount={dates.length}
        handleDisplay={handleDisplay}
        responsive={responsive}
      />
    </div>
  );
};

export default DateSlider;
