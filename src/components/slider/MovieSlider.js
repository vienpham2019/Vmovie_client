import Slider from "./Slider";

const MovieSlider = ({
  movies = [
    {
      _id: "66098101e01b64a3ba7722ff",
      title: "Parasite",
      ratingScores: 0.1,
      reviews: 39,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        size: "N/A",
        name: "25cc514f-4d49-4a8e-816f-15fe47b8ea7b",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:01.686Z",
      updatedAt: "2024-03-31T16:23:47.387Z",
      id: "66098101e01b64a3ba7722ff",
    },
    {
      _id: "66098104e01b64a3ba772362",
      title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      ratingScores: 0,
      reviews: 95,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/z8onk7LV9Mmw6zKz4hT6pzzvmvl.jpg",
        size: "N/A",
        name: "926455ca-4375-4c3a-8b9e-bc0877a0a920",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:04.317Z",
      updatedAt: "2024-03-31T16:23:39.835Z",
      id: "66098104e01b64a3ba772362",
    },
    {
      _id: "66098103e01b64a3ba772354",
      title: "Harry Potter and the Philosopher's Stone",
      ratingScores: 5,
      reviews: 6,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        size: "N/A",
        name: "8950df90-06e3-498a-9529-07f666c4659d",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:03.971Z",
      updatedAt: "2024-03-31T16:10:17.495Z",
      id: "66098103e01b64a3ba772354",
    },
    {
      _id: "66098104e01b64a3ba772364",
      title: "Star Wars: The Last Jedi",
      ratingScores: 4.2,
      reviews: 8,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
        size: "N/A",
        name: "d89cc1e6-7962-4696-9b6c-cba8dd15ed57",
      },
      isPublished: true,
      createdAt: "2024-03-31T15:28:04.371Z",
      updatedAt: "2024-03-31T16:05:41.274Z",
      id: "66098104e01b64a3ba772364",
    },
    {
      _id: "66098104e01b64a3ba772366",
      title: "Doctor Sleep",
      ratingScores: 2.4,
      reviews: 18,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/p69QzIBbN06aTYqRRiCOY1emNBh.jpg",
        size: "N/A",
        name: "9ae051c2-98c2-4b03-840f-6c5b35f72ac1",
      },
      isPublished: true,
      createdAt: "2024-03-31T15:28:04.424Z",
      updatedAt: "2024-03-31T16:03:19.014Z",
      id: "66098104e01b64a3ba772366",
    },
    {
      _id: "66098104e01b64a3ba772368",
      title: "Frozen II",
      ratingScores: 1.9,
      reviews: 95,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/h6Wi81XNXCjTAcdstiCLRykN3Pa.jpg",
        size: "N/A",
        name: "053a6fb3-1462-4c41-9cfe-ebb4e6dd34f3",
      },
      isPublished: true,
      createdAt: "2024-03-31T15:28:04.471Z",
      updatedAt: "2024-03-31T16:03:14.867Z",
      id: "66098104e01b64a3ba772368",
    },
    {
      _id: "66098104e01b64a3ba772360",
      title: "The Lord of the Rings: The Fellowship of the Ring",
      ratingScores: 1.8,
      reviews: 51,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        size: "N/A",
        name: "d817e651-1162-4d6e-be8e-1b16c8660743",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:04.260Z",
      updatedAt: "2024-03-31T15:28:04.260Z",
      id: "66098104e01b64a3ba772360",
    },
    {
      _id: "66098104e01b64a3ba77235e",
      title: "Inception",
      ratingScores: 1.7,
      reviews: 32,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        size: "N/A",
        name: "e1756ee0-cd52-4f33-ab5b-b70f335ebab7",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:04.211Z",
      updatedAt: "2024-03-31T15:28:04.211Z",
      id: "66098104e01b64a3ba77235e",
    },
    {
      _id: "66098104e01b64a3ba77235c",
      title: "Harry Potter and the Chamber of Secrets",
      ratingScores: 2.3,
      reviews: 94,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
        size: "N/A",
        name: "7d717b7d-c2a2-48f5-a1af-43e353b962a5",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:04.164Z",
      updatedAt: "2024-03-31T15:28:04.164Z",
      id: "66098104e01b64a3ba77235c",
    },
    {
      _id: "66098104e01b64a3ba77235a",
      title: "Gemini Man",
      ratingScores: 2.4,
      reviews: 45,
      poster: {
        mimeType: "image/jpg",
        url: "https://image.tmdb.org/t/p/w500/uTALxjQU8e1lhmNjP9nnJ3t2pRU.jpg",
        size: "N/A",
        name: "0d087752-3c27-432a-93aa-2e3e4f098574",
      },
      isPublished: false,
      createdAt: "2024-03-31T15:28:04.114Z",
      updatedAt: "2024-03-31T15:28:04.114Z",
      id: "66098104e01b64a3ba77235a",
    },
  ],
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };
  const handleDisplay = () => {
    return movies.map((movie, index) => (
      <div
        key={"movie slider " + index}
        className={`text-gray-200 px-[4px] flex cursor-pointer group relative`}
      >
        <div className="w-full rounded-md overflow-hidden relative">
          <img src={movie.poster.url} alt={"slide poster" + index} />
          <div className="w-full h-full absolute top-0 bg-[rgba(0,0,0,0.3)]"></div>
          <div className="absolute text-[5rem] mobile:text-[2rem] mobile:-bottom-[0.6rem] -bottom-[1.2rem] font-bold text-stroke-white">
            {index + 1}
          </div>
          <div className="absolute p-2 bottom-0 translate-y-full w-full h-full flex flex-col justify-between group-hover:flex group-hover:translate-y-0 transform transition duration-500 ease-in-out bg-[rgba(0,0,0,0.6)]">
            <div className="mobile:hidden">
              <span className="p-2 border border-gray-300 rounded-md">
                NC_17
              </span>
              <div className="flex gap-2 items-center pt-2 text-gray-300 text-[0.8rem]">
                <span>2024</span>
                <div className="w-[3px] h-[3px] bg-gray-400 rounded-full"></div>
                <span>90 min</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[rgba(0,0,0,0.6)] p-2 mobile:border-none mobile:bg-transparent rounded-full flex justify-center items-center border cursor-pointer">
                <lord-icon
                  src="https://cdn.lordicon.com/becebamh.json"
                  trigger="hover"
                  colors="primary:#e4e4e4"
                  style={{
                    width: "2rem",
                    height: "2rem",
                  }}
                ></lord-icon>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1.1rem] mobile:text-[0.7rem] truncate ...">
                {movie.title}
              </h2>
              <span className="text-[0.8rem] mobile:text-[0.5rem] truncate ... text-gray-400">
                {["Action", "Family"].join(" | ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  if (movies.length === 0) return;
  return (
    <div className="w-[75rem] laptop:w-[80vw] mobile:max-w-[15rem]">
      <Slider
        totalAmount={movies.length}
        handleDisplay={handleDisplay}
        responsive={responsive}
      />
    </div>
  );
};

export default MovieSlider;
