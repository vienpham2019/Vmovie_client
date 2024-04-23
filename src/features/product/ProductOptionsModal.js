import UploadFile from "../../components/form/image/UploadFile";

const ProductOptionsModal = () => {
  return (
    <div className="flex flex-col gap-3 bg-[#2b2b31] p-[1rem]">
      <div className="input_group">
        <input
          type="text"
          className={`input border-gray-500 `}
          value=""
          onChange={(e) => console.log(e.target.value)}
        />
        <div className={`input_title `}>
          <span>
            Name <small className="text-red-400">*</small>
          </span>
        </div>
      </div>
      <div className="input_group">
        <UploadFile
          type={"single"}
          validate={""}
          value={""}
          name={"flavor img"}
          setOnChange={(value) => console.log(value)}
          db={"product options"}
        />
        <div className={`input_title `}>
          <span>Image</span>
        </div>
      </div>

      <button className="min-w-[15rem] border flex justify-center hover:bg-gray-500 border-gray-500 text-gray-300 rounded py-2 cursor-pointer">
        Add
      </button>
    </div>
  );
};

export default ProductOptionsModal;
