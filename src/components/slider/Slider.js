import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Slider = ({
  totalAmount = 9,
  handleDisplay,
  dots = false,
  arrows = true,
  centerMode = false,
  responsive,
}) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hideArrowLeft, setHideArrowLeft] = useState(true);
  const [hideArrowRight, setHideArrowRight] = useState(false);

  const handleSetCurrentSlide = () => {
    const {
      currentSlide: refCurrentSlide,
      totalItems,
      slidesToShow,
    } = sliderRef.current.state;
    if (refCurrentSlide === currentSlide) return;
    setCurrentSlide(refCurrentSlide);
    setHideArrowLeft(refCurrentSlide === 0);
    setHideArrowRight(refCurrentSlide + slidesToShow === totalItems);
  };
  return (
    <div className={`relative`}>
      <Carousel
        ref={sliderRef}
        arrows={false}
        responsive={responsive}
        swipeable={false}
        draggable={false}
        centerMode={centerMode}
      >
        {handleDisplay()}
      </Carousel>
      {arrows && (
        <div>
          <div
            className={`
            ${hideArrowLeft && "hidden"}
        absolute h-full top-0 -left-[2rem] w-[2rem] rounded-s cursor-pointer text-white flex justify-center items-center`}
            onClick={async () => {
              await sliderRef.current.previous();
              handleSetCurrentSlide();
            }}
          >
            <FaChevronLeft />
          </div>
          <div
            className={`
            ${hideArrowRight && "hidden"}
        absolute h-full top-0 -right-[2rem] w-[2rem] rounded-e cursor-pointer text-white flex justify-center items-center`}
            onClick={async () => {
              await sliderRef.current.next();
              handleSetCurrentSlide();
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
          {Array.from({ length: totalAmount }).map((_, index) => (
            <div
              className={`w-[0.7rem] h-[0.7rem] rounded-full ${
                currentSlide === index ? "bg-gray-300" : "bg-gray-700"
              } cursor-pointer `}
              key={"dot" + index}
              onClick={async () => {
                await sliderRef.current.goToSlide(index);
                handleSetCurrentSlide();
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
