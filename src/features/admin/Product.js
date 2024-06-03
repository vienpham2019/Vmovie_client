import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Selection from "../../components/form/Selection";
import { MdAdd } from "react-icons/md";
import {
  useGetAllProductByAdminQuery,
  useGetAllProductTypesQuery,
} from "../product/productApiSlice";
import { Pagination } from "../../components/Pagination";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";
import AdminSkeleton from "./AdminSkeleton";
import DisplayProduct from "./DisplayProduct";

const Product = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortDir, setSortDir] = useState(-1);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const limit = 10;
  const { data: { metadata: allProductTypes } = [] } =
    useGetAllProductTypesQuery(
      {},
      {
        pollingInterval: 120000, // 2min the data will fetch again
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true,
      }
    );

  const { data, isLoading } = useGetAllProductByAdminQuery(
    { search, page, limit, sortBy, sortDir, filter },
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
      // Set the query key to include the page so it updates when the page changes
      queryKey: [
        "getAllProductByAdmin",
        { search, page, sortBy, sortDir, filter },
      ],
    }
  );

  const handleSortClick = (header) => {
    setPage(1);
    setSortDir(() => (header === sortBy ? sortDir * -1 : -1));
    setSortBy(header);
  };

  const handleDisplayProduct = () => {
    if (Object.keys(data.products.entities).length === 0) {
      return (
        <div className="h-[30vh] flex justify-center items-center text-white">
          No Product
        </div>
      );
    }

    const duplicatedProducts = Object.entries(data.products?.entities).flatMap(
      ([_, product]) => product
    );

    const headers = [
      "id",
      "thumbnail",
      "itemName",
      "price",
      "type",
      "createdAt",
      "updatedAt",
    ];

    return (
      <table className="table-auto text-gray-200 gap-1 border-separate border-spacing-1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                className={`laptop:cursor-pointer
               ${header === "actions" && "laptop:hidden"} ${
                  ["updatedAt", "createdAt"].includes(header) && "tablet:hidden"
                } ${["price", "type"].includes(header) && "mobile:hidden"}`}
                key={Math.random()}
              >
                <div
                  className={`uppercase font-thin p-2 h-[3rem] flex items-center gap-2  ${
                    header === sortBy && "text-cyan-400"
                  }`}
                  // key={header + "attach"}
                >
                  {header === "actions" ? "" : header}{" "}
                  {!["id", "actions", "thumbnail"].includes(header) && (
                    <div
                      className="cursor-pointer"
                      onClick={() => handleSortClick(header)}
                    >
                      {header === sortBy && sortDir === -1 ? (
                        <FaArrowDownWideShort />
                      ) : header === sortBy && sortDir === 1 ? (
                        <FaArrowUpShortWide />
                      ) : (
                        <LuArrowDownUp />
                      )}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(duplicatedProducts).map(
            ([_, product], productIndex) => (
              <DisplayProduct
                product={product}
                productIndex={productIndex + 1 + limit * (page - 1)}
                key={Math.random()}
                className={`h-[6rem]  px-4`}
              />
            )
          )}
        </tbody>
      </table>
    );
  };

  if (isLoading) return <AdminSkeleton />;

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
                      options: ["All", ...allProductTypes],
                    }}
                    handleOnChange={(value) => setFilter(value)}
                  />
                  <div className={`input_title`}>
                    <span>Filter By Type</span>
                  </div>
                </div>
              </div>
              {/* Search */}
              <div className="input_group mobile:w-full">
                <input
                  type="text"
                  className="input py-[1.4rem]"
                  placeholder="Find product"
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
            {handleDisplayProduct()}
            {false && (
              <div className="flex justify-between items-center">
                <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                  Showing 10 of {data.totalProducts}
                </div>
                <Pagination
                  currentPage={page}
                  totalPage={Math.ceil(data.totalProducts / 10)}
                  setCurrentPage={(page) => setPage(page)}
                />
              </div>
            )}
          </div>
        </div>
        {/* Body */}
      </div>
    </div>
  );
};

export default Product;
