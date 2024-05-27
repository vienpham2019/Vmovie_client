import Selection from "../../components/form/Selection";
import { useSelector } from "react-redux";
import { useGetProductDetailsQuery } from "./productApiSlice";

const ProductDetailModal = () => {
  const {
    modalParams: { _id },
  } = useSelector((state) => state.modal);
  const { data: { metadata: product } = {}, isLoading } =
    useGetProductDetailsQuery(_id);

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
                {v[0]?.img ? displayFlavors(v) : displaySelectOptions(v)}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const displaySelectOptions = (options) => {
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
            value: name,
            options: options.map((o) => o.name),
          }}
          border={"border border-gray-600"}
          handleOnChange={() => null}
        />
      </div>
    );
  };

  const displayFlavors = (options) => {
    const { isParent, optionType } = options[0];
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {!isParent && (
            <span className="capitalize font-bold">
              {optionType.split("_").join(" ")}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map(({ img }, index) => (
            <div
              key={"flavor " + index}
              className={`w-[3rem] aspect-square rounded-full cursor-pointer p-[2px]`}
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
          <span>${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
