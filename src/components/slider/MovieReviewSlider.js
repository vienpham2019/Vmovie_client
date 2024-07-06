import Slider from "./Slider";

const MovieReviewSlider = ({ reviews = [] }) => {
  const reviewTypeLogo = {
    IMDB: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png",
    Rotten_Tomatoes:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/2019px-Rotten_Tomatoes.svg.png",
    TMDB: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg",
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const handleDisplay = () => {
    return reviews.map(
      (
        {
          type,
          authorName,
          authorCop,
          reviewContent,
          date,
          rating,
          fullReviewLink,
        },
        index
      ) => (
        <div
          key={"movie review " + index}
          className="max-w-[15rem] h-[12rem] p-1 text-white"
        >
          <div className="w-full h-full flex flex-col gap-1 justify-between rounded p-3 bg-[#172532]">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <img
                  className="w-[2.3rem]"
                  src={reviewTypeLogo[type]}
                  alt="moviedb_logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="truncate ...">{authorName}</span>
                <span className="text-[0.7rem] text-gray-400 truncate ...">
                  {authorCop}
                </span>
              </div>
            </div>
            <div>
              <p className="text-[0.8rem] ellipsis-multiline ellipsis-3line ">
                {reviewContent}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-gray-300 text-[0.7rem]">
              <span>Date: {date}</span>
              <div className="flex justify-between">
                <span>Rating: {rating}</span>
                <a
                  href={fullReviewLink}
                  className=" text-cyan-400 truncate ..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read full review
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  if (reviews.length === 0) return;
  return (
    <div className="w-[75rem] laptop:w-[80vw] mobile:max-w-[15rem]">
      <Slider
        totalAmount={reviews.length}
        handleDisplay={handleDisplay}
        responsive={responsive}
      />
    </div>
  );
};

export default MovieReviewSlider;
