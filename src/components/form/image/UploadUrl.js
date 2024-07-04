const UploadUrl = ({ validate, value, name, handleOnChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-end border border-gray-500 rounded flex-auto p-2 bg-[#2b2b31]">
      <img
        src={
          value ||
          "https://join.travelmanagers.com.au/wp-content/uploads/2017/09/default-placeholder-300x300.png"
        }
        alt="Upload url"
        className="h-[6rem] rounded"
      />
      <div className="input_group flex-1">
        <input
          type="text"
          className={`input ${validate} border-gray-100`}
          value={value}
          onChange={(e) => handleOnChange({ url: e.target.value }, name)}
        />
        <div className={`input_title ${validate}`}>
          <span>url</span>
        </div>
      </div>
    </div>
  );
};

export default UploadUrl;
