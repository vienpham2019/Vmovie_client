import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductTypesQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "./productApiSlice";
import { useEffect } from "react";
import {
  formInitState,
  initProductFormData,
} from "../../components/form/formSlice";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const { data: { metadata: allProductTypes } = [] } =
    useGetAllProductTypesQuery(
      {},
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );
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
    let initFormData = JSON.parse(
      JSON.stringify(formInitState.productFormData)
    );
    if (allProductTypes) {
      initFormData["type"].options = allProductTypes;
    }
    if (product) {
      for (let key in initFormData) {
        if (key === "imgUrl") {
          initFormData[key].value.url = product[key];
        } else if (key === "options") {
          initFormData[key].value = product[key].map((o) => ({
            ...o,
            selected: o.selected.map(({ _id }) => _id),
          }));
        } else {
          initFormData[key].value = product[key];
        }
      }
      dispatch(initProductFormData(initFormData));
    }
  }, [product, dispatch, allProductTypes]);

  const handleEditProduct = async () => {
    try {
      const updateProductObj = {};
      Object.entries(productFormData).forEach(([k, v]) => {
        if (k === "imgUrl") {
          updateProductObj[k] = v.value.url;
        } else if (k === "options") {
          updateProductObj[k] = v.value.filter(
            (val) => val.selected.length > 0
          );
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
  if (isLoading) return <div>Loading...</div>;
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
