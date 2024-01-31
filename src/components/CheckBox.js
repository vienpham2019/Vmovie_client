const CheckBox = () => {
  return (
    <label
      className="relative flex items-center rounded cursor-pointer"
      htmlFor="customStyle"
    >
      <input
        type="checkbox"
        className="border bg-[#2b2b31] border-gray-500 before:content[''] peer relative h-[1.4rem] aspect-square cursor-pointer appearance-none rounded-lg transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity  checked:border-cyan-500"
        id="customStyle"
      />
      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 aspect-square"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
  );
};

export default CheckBox;
