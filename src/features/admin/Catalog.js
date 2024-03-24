import { useState } from "react";
import Selection from "../../components/form/Selection";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

const Catalog = () => {
  const initFilter = {
    value: "Date created",
    validate: "",
    options: ["Date created", "Rating", "Views"],
  };
  const [filter, setFilter] = useState(initFilter);

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
      <div className="h-full py-2">
        <Link to={"addItem"} className="text-cyan-500">
          Add Movie
        </Link>
      </div>
    </div>
  );
};

export default Catalog;
