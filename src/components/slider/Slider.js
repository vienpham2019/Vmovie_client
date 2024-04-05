import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Slider = ({
  displayAmount = 3,
  totalAmount = 9,
  handleDisplay,
  minWidth,
  dots = true,
  arrows = true,
  responsive,
}) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleSetCurrentSlide = (index) => {
    if (index < 0 || index === totalAmount / displayAmount) return;
    setCurrentSlide(index);
  };
  return (
    <div className={`relative max-w-[${minWidth}]`}>
      <Carousel
        ref={sliderRef}
        arrows={false}
        responsive={responsive}
        swipeable={false}
        draggable={false}
      >
        {handleDisplay()}
      </Carousel>
      {arrows && (
        <div>
          <div
            className={`
        absolute h-full top-0 -left-[2rem] w-[2rem] rounded-s cursor-pointer text-white flex justify-center items-center`}
            onClick={() => {
              handleSetCurrentSlide(currentSlide - 1);
              sliderRef.current.previous();
            }}
          >
            <FaChevronLeft />
          </div>
          <div
            className={`
        absolute h-full top-0 -right-[2rem] w-[2rem] rounded-e cursor-pointer text-white flex justify-center items-center`}
            onClick={() => {
              handleSetCurrentSlide(currentSlide + 1);
              sliderRef.current.next();
            }}
          >
            <FaChevronRight />
          </div>
        </div>
      )}
      {dots && (
        <div
          className={`
        absolute h-[2rem] -bottom-[2rem] flex justify-center items-center gap-2 w-full`}
        >
          {Array.from({ length: totalAmount / displayAmount }).map(
            (_, index) => (
              <div
                className={`w-[0.7rem] h-[0.7rem] rounded-full ${
                  currentSlide === index ? "bg-gray-300" : "bg-gray-700"
                } cursor-pointer `}
                key={"dot" + index}
                onClick={() => {
                  handleSetCurrentSlide(index);
                  sliderRef.current.goToSlide(index * displayAmount);
                }}
              ></div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Slider;
