import { useState } from "react";
import Selection from "../../components/form/Selection";
import { SlMagnifier } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const Catalog = () => {
  const initFilter = {
    value: "Date created",
    validate: "",
    options: ["Date created", "Rating", "Views"],
  };
  const [filter, setFilter] = useState(initFilter);
  const navigate = useNavigate();
  return (
    <div className="p-[1rem]">
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Catalog</h2>
            <span className="text-gray-500 text-[0.9rem]">14,452 Total</span>
          </div>
          <div className="flex flex-wrap gap-[1rem] items-center">
            <div className="w-[10rem]">
              <Selection
                formData={filter}
                handleOnChange={(value) =>
                  setFilter((prev) => ({ ...prev, value }))
                }
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
      <div className="h-full py-4">
        <div className="flex justify-end px-[1rem]">
          <button
            className="btn-blue flex gap-1 items-center px-5"
            onClick={() => navigate("addItem")}
          >
            <MdAdd />
            Add Movie
          </button>
          {/* <Link to={"addItem"} className="text-cyan-500">
            Add Movie
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
