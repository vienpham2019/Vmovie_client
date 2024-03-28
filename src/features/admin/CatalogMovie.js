import { FaEye, FaLock, FaLockOpen, FaStar, FaTrash } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const indexContent = (index) => <span>{index}</span>;
const posterContent = (poster) => (
  <img className="max-w-[3.4rem]" src={poster.url} alt={poster.url} />
);
const titleContent = (title) => (
  <div className="flex gap-4 items-center justify-between">
    <span className="min-w-[15rem] mobile:min-w-[6rem]">{title}</span>
    <IoIosArrowDown className="mobile:block hidden" />
  </div>
);
const ratingContent = (rating) => (
  <div className="flex items-center gap-1 min-w-[3rem]">
    <FaStar className="text-red-500" />
    <span>{rating}</span>
  </div>
);
const viewContent = (view) => <span className="min-w-[3rem]">{view}</span>;
const statusContent = (status) => {
  if (status) {
    return (
      <div className="flex gap-4 items-center justify-between">
        <span className="text-[rgb(103,243,103)]">Public</span>
        <IoIosArrowDown className="tablet:block hidden" />
      </div>
    );
  } else {
    return (
      <div className="flex gap-4 items-center justify-between">
        <span className="text-[rgb(254,102,102)]">Draft</span>
        <IoIosArrowDown className="tablet:block hidden" />
      </div>
    );
  }
};
const actionsContent = (movie) => {
  return (
    <div className="flex gap-4 min-w-[15rem]">
      {movie["isPublished"] ? (
        <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(250,139,117,0.2)]">
          <FaLock className="text-[rgb(250,139,117)]" />
          <div className="tooltip">Draft</div>
        </div>
      ) : (
        <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(87,213,123,0.2)]">
          <FaLockOpen className="text-[rgb(87,213,123)]" />
          <div className="tooltip">Public</div>
        </div>
      )}
      <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(168,111,248,0.2)]">
        <FaEye className="text-[rgb(168,111,248)]" />
        <div className="tooltip">Preview</div>
      </div>
      <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(135,189,255,0.4)]">
        <RiEdit2Fill className="text-[rgb(135,189,255)]" />
        <div className="tooltip">Edit</div>
      </div>
      <div className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(255,99,99,0.2)]">
        <FaTrash className="text-[rgb(250,117,117)]" />
        <div className="tooltip">Delete</div>
      </div>
    </div>
  );
};
const createdAtContent = (createdAt) => (
  <span className="min-w-[7rem]">{createdAt.split("T")[0]}</span>
);
const updatedAtContent = (updatedAt) => (
  <div className="flex gap-4 items-center justify-between">
    <span className="min-w-[7rem]">{updatedAt.split("T")[0]}</span>
    <IoIosArrowDown className="laptop:block hidden" />
  </div>
);

const CatalogMovie = ({ header, movie, movieIndex }) => {
  const isLoading = false;
  let contents = {
    id: indexContent(movieIndex),
    poster: posterContent(movie["poster"]),
    title: titleContent(movie["title"]),
    rating: ratingContent(movie["ratingScores"]),
    views: viewContent(movie["reviews"]),
    status: statusContent(movie["isPublished"]),
    actions: actionsContent(movie),
    createdAt: createdAtContent(movie["createdAt"]),
    updatedAt: updatedAtContent(movie["updatedAt"]),
  };

  if (isLoading)
    return (
      <div
        className={`flex justify-center items-center animate-pulse h-[6rem] bg-[rgb(36,36,41)] px-4 my-2`}
      >
        {header === "title" && (
          <div className="grid gap-1 w-full">
            <div className="h-[1rem] bg-[rgb(52,52,59)] w-full rounded-md"></div>
            <div className="h-[1rem] bg-[rgb(52,52,59)] w-[50%] rounded-md"></div>
          </div>
        )}
        {header === "poster" && (
          <div className="h-full w-[3.2rem] bg-[rgb(52,52,59)]"></div>
        )}
      </div>
    );

  return (
    <div
      className={`flex justify-center items-center h-[6rem] bg-[rgb(34,34,39)] px-4 my-2`}
    >
      {contents[header]}
    </div>
  );
};

export default CatalogMovie;
