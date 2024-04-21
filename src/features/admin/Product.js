import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Selection from "../../components/form/Selection";
import { MdAdd } from "react-icons/md";

const Product = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortDir, setSortDir] = useState(-1);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const limit = 10;
  return (
    <div className="p-[1rem]">
      {" "}
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Product</h2>
          </div>
        </div>
        {/* Body */}
        <div className="flex justify-center">
          <div className="h-full py-4 grid justify-center gap-3 w-fit p-4 mt-4 rounded-md ">
            <div className="flex flex-wrap items-center gap-3 justify-end px-[1rem]">
              <div className="w-[8rem] mobile:w-full">
                <div className="input_group">
                  <Selection
                    formData={{
                      value: filter,
                      options: ["All", "Draft", "Published"],
                    }}
                    handleOnChange={(value) => setFilter(value)}
                  />
                  <div className={`input_title`}>
                    <span>Filter By Status</span>
                  </div>
                </div>
              </div>
              {/* Search */}
              <div className="input_group mobile:w-full">
                <input
                  type="text"
                  className="input py-[1.4rem]"
                  placeholder="Find moive"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input_attachment ">
                  <SlMagnifier />
                </div>
              </div>
              {/* Add product */}
              <div className="flex flex-wrap gap-[1rem] items-center ">
                <button
                  className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                  onClick={() => navigate("addProduct")}
                >
                  <MdAdd />
                  Add Product
                </button>
              </div>
            </div>
            {/* Movie List */}
            {/* {handleDisplayMovie()} */}
            {/* {false && (
              <div className="flex justify-between items-center">
                <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                  Showing 10 of {data.totalMovies}
                </div>
                <Pagination
                  currentPage={page}
                  totalPage={Math.ceil(data.totalMovies / 10)}
                  setCurrentPage={(page) => setPage(page)}
                />
              </div>
            )} */}
          </div>
        </div>
        {/* Body */}
      </div>
    </div>
  );
};

export default Product;
