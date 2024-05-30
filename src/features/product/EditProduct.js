import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "./productApiSlice";
import { useEffect } from "react";
import { initProductFormData } from "../../components/form/formSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const { data: { metadata: product } = {}, isLoading } =
    useGetProductDetailsQuery(
      { _id: productId },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );
  const { productFormData } = useSelector((state) => state.form);
  useEffect(() => {
    if (product) {
      const updateProduct = JSON.parse(JSON.stringify(productFormData));
      for (let key in updateProduct) {
        if (key === "imgUrl") {
          updateProduct[key].value.url = product[key];
        } else if (key === "options") {
          updateProduct[key].value = product[key].map((o) => ({
            ...o,
            selected: o.selected.map(({ _id }) => _id),
          }));
        } else {
          updateProduct[key].value = product[key];
        }
      }
      dispatch(initProductFormData(updateProduct));
    }
  }, [product]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();

  const handleEditProduct = async () => {
    try {
      const updateProductObj = {};
      Object.entries(productFormData).forEach(([k, v]) => {
        if (k === "imgUrl") {
          updateProductObj[k] = v.value.url;
        } else {
          updateProductObj[k] = v.value;
        }
      });
      const res = await updateProduct({
        _id: productId,
        payload: updateProductObj,
      });
      dispatch(
        setMessage({
          message: res.data.message,
          messageType: notificationMessageEnum.SUCCESS,
        })
      );
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-[1rem] mobile:p-2">
      <div className="py-[0.4rem] border-b border-gray-600 flex items-center gap-2 text-white font-thin">
        <Link className="text-cyan-500 text-[1.5rem]" to="/admin/product">
          Product
        </Link>
        <span className="text-gray-400">-</span>
        <h2 className="text-[1.5rem] capitalize">Edit product</h2>
      </div>
      {/* Body */}
      <div className="p-2 mobile:p-1">
        <ProductForm handleOnSubmit={handleEditProduct} />
      </div>
    </div>
  );
};

export default EditProduct;
