import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({ totalPage = 10, currentPage = 1, setCurrentPage }) => {
  const [paginationPage, setPaginationPage] = useState([1]);
  useEffect(() => {
    function generatePaginationArray() {
      let newPaginationPage = [1];
      if (totalPage <= 4) {
        setPaginationPage(
          Array.from({ length: totalPage }).map((_, index) => index + 1)
        );
        return;
      }

      let pageNeighbors = Array.from({ length: 3 }).map(
        (_, index) => index + Math.max(currentPage - 1, 1)
      );
      if (currentPage === totalPage) {
        pageNeighbors.pop();
        pageNeighbors.unshift(currentPage - 2);
      }

      newPaginationPage = [
        ...new Set([...newPaginationPage, ...pageNeighbors, totalPage]),
      ];
      for (let i = 0; i < newPaginationPage.length - 1; i++) {
        if (newPaginationPage[i] + 1 !== newPaginationPage[i + 1]) {
          newPaginationPage.splice(++i, 0, "...");
        }
      }
      setPaginationPage(newPaginationPage);
    }
    generatePaginationArray();
  }, [currentPage, totalPage]);

  const handlePageButton = () => {
    return paginationPage.map((value, index) => (
      <div key={"pagination" + value + index}>
        {value !== "..." ? (
          <button
            type="button"
            className={`pagination-btn ${
              value === currentPage && "bg-gray-700 hover:bg-gray-700"
            } `}
            aria-current={value === currentPage ? "page" : undefined}
            onClick={() => setCurrentPage(value)}
          >
            {value}
          </button>
        ) : (
          <button
            type="button"
            className="group text-gray-400 min-w-[38px] py-2 px-2.5 tooltip_container"
            onClick={() =>
              setCurrentPage(() => {
                if (paginationPage[index - 1] > 1)
                  return Math.min(currentPage + 4, totalPage);
                return Math.max(1, currentPage - 4);
              })
            }
          >
            <span className="group-hover:hidden text-xs">•••</span>
            <div className="hidden group-hover:block text-cyan-500">
              {paginationPage[index - 1] > 1 ? (
                <MdOutlineKeyboardDoubleArrowRight />
              ) : (
                <MdOutlineKeyboardDoubleArrowLeft />
              )}
            </div>
            <div className="tooltip tooltip_top">
              {paginationPage[index - 1] > 1 ? "Next" : "Previous"} 4 pages
            </div>
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`pagination-btn border border-gray-400 ${
          currentPage === 1 && "opacity-50 pointer-events-none border-gray-700"
        } `}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>
      <div className="flex items-center gap-1 mobile:hidden">
        {handlePageButton()}
      </div>
      <div className="hidden mobile:flex text-white min-h-[38px] min-w-[38px] justify-center items-center">
        {currentPage}
      </div>
      <button
        type="button"
        className={`pagination-btn border border-gray-400 ${
          currentPage === totalPage &&
          "opacity-50 pointer-events-none border-gray-700"
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
