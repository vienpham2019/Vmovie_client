import { useState } from "react";
import Selection from "../../components/form/Selection";
import { SlMagnifier } from "react-icons/sl";
import UploadFile from "../../components/form/UploadFile";

const Catalog = () => {
  const filterOptions = ["Date created", "Rating", "Views"];
  const [filter, setFilter] = useState([filterOptions[0]]);
  const handleFilter = (filterVal) => {
    if (filter.includes(filterVal)) return;

    setFilter([filterVal]);
  };
  return (
    <div className="p-[1rem]">
      <div className="grid gap-[1rem]">
        <div className="flex justify-between items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Catalog</h2>
            <span className="text-gray-500 text-[0.9rem]">14,452 Total</span>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="w-[10rem]">
              <Selection
                selected={filter}
                type="string"
                placeHolder="Select filter"
                selectOptions={filterOptions}
                handleSelect={handleFilter}
              />
            </div>
            <div className="input_group">
              <input type="text" className="input" placeholder="Find moive" />
              <div className="input_attachment">
                <SlMagnifier />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="h-full py-2">
        <UploadFile />
      </div>
    </div>
  );
};

export default Catalog;
