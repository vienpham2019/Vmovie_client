import { Link } from "react-router-dom";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/product">
          Product
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Add new product</h2>
      </div>
      {/* Body */}
      <div className="p-2 mobile:p-1">
        <ProductForm handleOnSubmit={() => console.log("submit")} />
      </div>
    </div>
  );
};

export default AddProduct;
