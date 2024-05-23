import { Link, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { useCreateProductMutation } from "./productApiSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const AddProduct = () => {
  const { productFormData } = useSelector((state) => state.form);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddProduct = async () => {
    try {
      let submitFormData = {};
      Object.keys(productFormData).forEach((key) => {
        if (key === "img") {
          submitFormData["imgUrl"] = productFormData[key].value.url;
        } else {
          submitFormData[key] = productFormData[key].value;
        }
      });
      const res = await createProduct(submitFormData);
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      navigate("/admin/product");
    } catch (error) {
      dispatch(
        setMessage({
          message: error,
          messageType: notificationMessageEnum.ERROR,
        })
      );
    }
  };
  if (isLoading) return <div>Loading...</div>;
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
        <ProductForm handleOnSubmit={handleAddProduct} />
      </div>
    </div>
  );
};

export default AddProduct;
