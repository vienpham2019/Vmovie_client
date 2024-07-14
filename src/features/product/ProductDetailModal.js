import Selection from "../../components/form/Selection";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery } from "./productApiSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  closeModal,
  setModalResponse,
} from "../../components/modal/ModalSlice";
import { useEffect, useState } from "react";

const productDetailTypeEnum = Object.freeze({
  EDIT: "Edit",
  ADD: "Add",
  DETAIL: "Detail",
});

const ProductDetailModal = () => {
  const {
    modalParams: { _id, type, amount: paramsAmount, product: editProduct },
  } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { data: { metadata: product } = {}, isLoading } =
    useGetProductDetailsQuery(
      { _id },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  useEffect(() => {
    if (editProduct) {
      setAmount(editProduct.amount);
      setSelectedOptions(editProduct.selectedOptions);
    } else if (product?.options) {
      const initSelectedOptions = product.options.reduce(
        (acc, { type, selected }) => {
          selected.forEach(({ isParent, name, optionType }) => {
            const key = isParent ? type : `${type}_${optionType}`;
            if (!acc[key]) {
              acc[key] = name;
            }
          });
          return acc;
        },
        {}
      );

      setSelectedOptions(initSelectedOptions);
    }
  }, [product, editProduct, setSelectedOptions, setAmount]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (paramsAmount) {
      setAmount(amount);
    }
  }, [paramsAmount, amount, setAmount]);

  const handleConfirmAction = () => {
    const { price, itemName } = product;
    dispatch(
      setModalResponse({
        product: { price, amount, itemName, _id, selectedOptions },
        editProduct,
        type,
      })
    );
    dispatch(closeModal());
  };

  const handleSelectOptions = ({ type, option }) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: option }));
  };

  const handleDisplayOptions = () => {
    return product.options.map((option) => {
      const transformedObject = option.selected.reduce((acc, item) => {
        // If the class key is not already in the accumulator, add it with an empty array
        if (!acc[item.optionType]) {
          acc[item.optionType] = [];
        }
        // Push the name to the corresponding class array
        acc[item.optionType].push(item);
        return acc;
      }, {});
      return (
        <div key={option.type} className="border p-2">
          <h3 className="border-b font-bold">{option.type}</h3>
          <div className="grid gap-2">
            {Object.entries(transformedObject).map(([k, v], i) => (
              <div key={k + i}>
                {v[0]?.img
                  ? displayFlavors(option.type, v)
                  : displaySelectOptions(option.type, v)}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const displaySelectOptions = (type, options) => {
    const { isParent, name, optionType } = options[0];
    return (
      <div>
        {!isParent && (
          <span className="capitalize font-light">
            {optionType.split("_").join(" ")}
          </span>
        )}
        <Selection
          formData={{
            value:
              selectedOptions[isParent ? type : `${type}_${optionType}`] ||
              name,
            options: options.map((o) => o.name),
          }}
          border={"border border-gray-600"}
          handleOnChange={(selecOption) =>
            handleSelectOptions({
              type: isParent ? type : `${type}_${optionType}`,
              option: selecOption,
            })
          }
        />
      </div>
    );
  };

  const displayFlavors = (type, options) => {
    const { isParent, optionType } = options[0];
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {!isParent && (
            <span className="capitalize font-bold">
              {optionType.split("_").join(" ")}
            </span>
          )}
          <small>{selectedOptions[type]}</small>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map(({ img, name }, index) => (
            <div
              onClick={() =>
                handleSelectOptions({
                  type,
                  option: name,
                })
              }
              key={"flavor " + index}
              className={`w-[3rem] ${
                selectedOptions[type] === name && "border-2 border-red-700"
              } aspect-square rounded-full cursor-pointer p-[2px]`}
            >
              <img src={img} alt="flavor" className="rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-[20rem] max-h-[95vh] overflow-y-scroll bg-white rounded flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-[1.2rem] font-bold py-2 border-b border-gray-400">
          {product.itemName}
        </h2>
        <div>
          {" "}
          <img
            src={product.imgUrl}
            alt="product"
            className="h-[4rem] mx-2 rounded float-right border"
          />
          <p className="text-[0.9rem]">{product.describe}</p>
        </div>
        {handleDisplayOptions()}
        <div className="flex justify-between">
          {productDetailTypeEnum.DETAIL !== type && (
            <div className="flex gap-2 items-center">
              <div
                className={`w-[2rem] aspect-square rounded-full ${
                  amount > 1 ? "bg-gray-800 cursor-pointer" : "bg-gray-300"
                } text-white flex justify-center items-center`}
                onClick={() => {
                  if (amount <= 1) return;
                  setAmount(amount - 1);
                }}
              >
                <FaMinus />
              </div>
              <span>{amount}</span>
              <div
                className={`w-[2rem] aspect-square rounded-full text-white  ${
                  amount < 10 ? "bg-gray-800 cursor-pointer" : "bg-gray-300"
                } flex justify-center items-center`}
                onClick={() => {
                  if (amount >= 10) return;
                  setAmount(amount + 1);
                }}
              >
                <FaPlus />
              </div>
            </div>
          )}
          <span>${(product.price * amount).toFixed(2)}</span>
        </div>
        {productDetailTypeEnum.DETAIL !== type && (
          <div className="flex gap-1">
            <button
              className="border h-[3rem] flex-1 border-red-700 text-red-700 rounded"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              className="border h-[3rem] flex-1 border-red-700 text-white bg-red-700 rounded uppercase"
              onClick={() => handleConfirmAction()}
            >
              {type}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { productDetailTypeEnum };
export default ProductDetailModal;
